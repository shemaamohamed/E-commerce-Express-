const Product = require('../models/product-model')
const createProduct = async (req, res) => {
    try {
        console.log(req.body.brand)
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const readAllproducts =async (req,res) =>{
    try{
       const products= await Product.find();
       res.status(200).json(products);

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

    }
const readOneProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateProduct= async(req,res)=>{
    try {
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id ,req.body );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json("Product is updated ");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}
const deleteOneProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product is  deleted' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createProduct,
    readAllproducts,
    readOneProductById,
    updateProduct,
    deleteOneProductById
}