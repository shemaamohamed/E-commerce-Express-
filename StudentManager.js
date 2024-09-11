//Encupsolation
const fs = require("fs").promises;
const path = require('path')
const dataFilepath= path.join(__dirname,'students.json')
class StudentManager{
    constructor(){
        this.students=[];
    }
    //add
   async addStudent(student){
        this.students.push({...student,id:Date.now()});
        await this.saveStudents();
    }
    //remove
    //create
    async saveStudents(){
        try{
            const studentJson= JSON.stringify(this.students, null, 2);
            await fs.writeFile(dataFilepath, studentJson);
            console.log("Students saved successfully.");

        }catch(err){
            console.error("Error saving students:", err);
        }
        //from app to file
    }
    //read
    async  loadStudents(){
        try{
            const data= await fs.readFile(dataFilepath, "utf-8");
            this.students= JSON.parse(data);
        }catch(err){
            this.students= [];
            console.log("No students file found, starting with an empty list.");

        }finally{
            console.log("Load operation completed.");

        }
        
    }
    async getAllStudents(){
        await this.loadStudents();
        return this.students;
    }
    async getStudentById(id){
        await this.loadStudents();
        return this.students.find(student=>student.id===id);
    }
    //update
    //update
    //delete
   
}
module.exports =StudentManager;