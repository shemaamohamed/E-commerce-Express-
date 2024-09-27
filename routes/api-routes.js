const express=require("express")
const router=express.Router();
const productsRoutes=require('./product-routes');
const authRoutes=require('./auth-routes');
router.use("/product",productsRoutes);
router.use("/users",authRoutes)
module.exports = router;