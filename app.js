const express=require("express")
const StudentManager=require('./StudentManager');
const app= express();
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}



const studentschema = {
  type: "object",
  properties: {
    name: {type: "string"},
    age: {
        type: "number",
        minimum:5,
        maximum:60,
    }
  },
  required: ["name","age"],
  additionalProperties: false
}
const validatestudent = ajv.compile(studentschema)
const studentManager= new StudentManager();
app.use(express.json());
const Port= process.env.PORT||3000

app.get("/",(req,res)=>{
    res.send("hello world")
})
app.get("/students/",async(req, res)=>{
    const query =req.query;
    const from = Number(query.from);
    const to = Number(query.to);
    if(from&&to){
        const filteredStudents= await studentManager.filterStudentsByAge(from, to);
        res.status(200).json(filteredStudents);

    }else{
        const studentlist= await studentManager.getAllStudents();
        res.json(studentlist);

    }
   
})
app.get("/students",async(req,res)=>{
    const studentlist= await studentManager.getAllStudents();
    res.json(studentlist);
})

app.get("/students/:id",async(req, res)=>{
    const student= await studentManager.getStudentById(req.params.id);
    // console.log(student)
    res.status(200).json(student);
})
app.post("/students/:id",async(req, res)=>{
    const updatedStudent=req.body;
     await studentManager.updateoneStudent(req.params.id, updatedStudent);
    res.status(200).json("success");
})
app.delete("/students/:id",async(req, res)=>{
    await studentManager.removeStudent(req.params.id);
    // console.log(student)
    res.status(200).json("sucsses");
})

app.post("/students",async(req,res)=>{
    const data=req.body;
    const valid= validatestudent(data)
    if(valid){
        await studentManager.addnewStudent(data);
        res.status(200).json("success");
        
    }else{
        console.log('invalid data')
        res.status(400).json("invalid data");
    }
   
    }
   
)

app.listen(Port,()=>{
    console.log("server is running on port 3000")
})