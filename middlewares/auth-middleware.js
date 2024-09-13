const authMiddleware=(request, response, next)=>{
    const apikey=request.headers['x-api-key'];
    if(apikey && apikey==='m1e'){
        next();
    }else{
        response.status(401).send("unauthorized")
    }
}
module.exports=authMiddleware