const express=require("express")
const cors = require('cors');
const apiRoutes = require("./routes/api-routes");
const connectDB = require("./configs/database");
const logMiddleware = require("./middlewares/log-middleware");
const erorMiddleware = require("./middlewares/eror-middleware");
const app= express();
connectDB();
require("dotenv").config();
const Port= +process.env.PORT||3000;
//third party middleware
const corsOptions ={
    origin:'*',    
}
//Third-Party-Middleware
app.use(cors(corsOptions));
//built-in middleware
app.use(express.json());
//Application-Middleware
app.use(logMiddleware)
app.use("/api",apiRoutes);

//ErorHandling-middleware
// app.use(erorMiddleware)
app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`)
})