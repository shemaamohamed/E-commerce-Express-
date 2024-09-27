const erorMiddleware=(request, response, next)=>{
    console.log(error);
    res.status(500).send("something went wrong!")
}
module.exports=erorMiddleware