const express=require('express');
const router = express.Router();
const ProductManager=require('./ProductManager');
const productManager= new ProductManager();
const authMiddleware= require('./middlewares/auth-middleware');
const Ajv = require("ajv");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
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


router.get("/",(req,res)=>{
    res.send("hello world")
})
router.get("/",async(req, res)=>{
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
router.get("",async(req,res)=>{
    const productlist= await productManager.getAllProducts();
    res.json(productlist);
})

router.get("/:id",async(req, res)=>{
    const product= await productManager.getProductById(req.params.id);
    // console.log(product)
    res.status(200).json(product);
})
router.post("/:id",authMiddleware,async(req, res)=>{
    const updatedProduct=req.body;
     await productManager.updateoneProduct(req.params.id, updatedProduct);
    res.status(200).json("success");
})
router.delete("/:id",authMiddleware,async(req, res)=>{
    await productManager.removeProduct(req.params.id);
    // console.log(product)
    res.status(200).json("sucsses");
})

router.post("",authMiddleware,async(req,res)=>{
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
module.exports = router;