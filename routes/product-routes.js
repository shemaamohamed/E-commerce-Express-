const express=require('express');
const productController = require('../controller/product-controller');

const router = express.Router();
router.get("",productController.readAllproducts);
router.post("",productController.createProduct);
router.get("/:id", productController.readOneProductById);
router.put("/:id",productController.updateProduct)
router.delete("/:id",productController.deleteOneProductById);
module.exports = router;