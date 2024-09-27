const logMiddleware=(request, response, next)=>{
   
        console.log(`${new Date().toString()}-${request.method}-${request.url} `);
        next();
}
module.exports=logMiddleware