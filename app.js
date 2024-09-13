const express=require("express")
const cors = require('cors');
const productsRoutes=require('./product-routes');
const app= express();
require("dotenv").config();




//third party middleware
const corsOptions ={
    origin:'*', //control the accepted domains to access our end point
    
}
//Third-Party-Middleware
app.use(cors(corsOptions));
//built-in middleware
app.use(express.json());
const Port= +process.env.PORT||3000;
//Application-Middleware
app.use((request,response,next)=>{
    console.log(`${new Date().toString()}-${request.method}-${request.url}`);
    next();
}
)

app.use("/products",productsRoutes);


app.get("/",(req,res)=>{
    res.send("hello world")
})

//ErorHandling-middleware
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).send("something went wrong!")
})

app.listen(Port,()=>{
    console.log("server is running on port 3000")
})