const express=require("express")
const ProductManager=require('./ProductManager');
const app= express();
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}



const productschema = {
  type: "object",
  properties: {
    name: {type: "string"},
    price: {
        type: "number",
        minimum:100,
        maximum:10000,
    },
    description:{
        type:"string"
    },
    category:{
        type:"string"
    },
    brand:{
        type:"string"
    }
  },
  required: ["name","price","category","brand"],
  additionalProperties: false
}
const validateproduct = ajv.compile(productschema)
const productManager= new ProductManager();
//Builtin-Middleware
app.use(express.json());
const Port= process.env.PORT||3000;
//Application-Middleware
app.use((request,response,next)=>{
    console.log(`${new Date().toString()}-${request.method}-${request.url}`);
    next();
}
)


app.get("/",(req,res)=>{
    res.send("hello world")
})
app.get("/products/",async(req, res)=>{
    const query =req.query;
    const from = Number(query.from);
    const to = Number(query.to);
    if(from&&to){
        const filteredProducts= await productManager.filterProductsByAge(from, to);
        res.status(200).json(filteredProducts);

    }else{
        const productlist= await productManager.getAllProducts();
        res.json(productlist);

    }
   
})
app.get("/products",async(req,res)=>{
    const productlist= await productManager.getAllProducts();
    res.json(productlist);
})

app.get("/products/:id",async(req, res)=>{
    const product= await productManager.getProductById(req.params.id);
    // console.log(product)
    res.status(200).json(product);
})
app.post("/products/:id",async(req, res)=>{
    const updatedProduct=req.body;
     await productManager.updateoneProduct(req.params.id, updatedProduct);
    res.status(200).json("success");
})
app.delete("/products/:id",async(req, res)=>{
    await productManager.removeProduct(req.params.id);
    // console.log(product)
    res.status(200).json("sucsses");
})

app.post("/products",async(req,res)=>{
    const data=req.body;
    const valid= validateproduct(data)
    if(valid){
        await productManager.addnewProduct(data);
        res.status(200).json("success");
        
    }else{
        console.log('invalid data')
        res.status(400).json({
            message:validateproduct.errors.map((error)=>{
                return{
                    ...(!!error.instancePath && {
                        field:error.instancePath
                    }),
                    message:error.message,
                    details:error.params
                }
            })
            
        });
    }
   
    }
   
)
//ErorHandling-eror

app.listen(Port,()=>{
    console.log("server is running on port 3000")
})