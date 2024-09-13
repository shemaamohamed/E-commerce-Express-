//Encupsolation
const { v4: uuidv4 } = require('uuid');

const fs = require("fs").promises;
const path = require('path')

const dataFilepath= path.join(__dirname,'products.json')
class ProductManager{
    constructor(){
        this.products=[];
    }
    //addproduct
   async addnewProduct(product){
        await this.loadProducts();
        // if(!product.name) throw new Error("Name is required");
        //from file to app
        this.products.push({...product,id:uuidv4()});
        await this.saveProducts();
    }
    //removeproduct
    async removeProduct(id){
        await this.loadProducts();
        // this.products= this.products.filter(product=>product.id!==id);
        const index= this.products.findIndex(product=>product.id.toString()===id.toString());
        if(index>-1) {
            this.products.splice(index,1);
            await this.saveProducts();

        }
        
    }
    async removeAllProducts(){
        this.products=[];
        await this.saveProducts();
    }
    //updateproduct
    //create
    async saveProducts(){
        try{
            const productJson= JSON.stringify(this.products, null, 2);
            await fs.writeFile(dataFilepath, productJson);
            console.log("products saved successfully.");

        }catch(err){
            console.error("Error saving products:", err);
        }
        //from app to file
    }
    //read
    async  loadProducts(){
        try{
            const data= await fs.readFile(dataFilepath, "utf-8");
            this.products= JSON.parse(data);
        }catch(err){
            this.products= [];
            console.log("No products file found, starting with an empty list.");

        }finally{
            console.log("Load operation completed.");

        }
        
    }
    //updateproduct

    async updateoneProduct(id, updatedproduct){
        await this.loadProducts();
        const index= this.products.findIndex(product=>product.id.toString()===id.toString());
        if(index!==-1){
            const product= this.products[index];
            this.products[index]={...product,...updatedproduct};
            await this.saveProducts();
            return true;
        }
        return false;
    }
    async updateProductNewData(id, updatedproduct){
        await this.loadProducts();
        const index= this.products.findIndex(product=>product.id===id);
        if(index!==-1){
            const product= this.products[index];
            this.products[index]={id,...updatedproduct};
            await this.saveProducts();
            return true;
        }
        return false;
    }

    async getAllProducts(){
        await this.loadProducts();
        return this.products;
    }
    async getProductById(id){
        await this.loadProducts();
        const productobj=this.products.find(product=>product.id.toString() === id.toString());
        if(productobj){
            return productobj;
        }
        
    }
   async filterProductsByAge(startage,endage){
        await this.loadProducts();
        const filteredProducts= this.products.filter(product=>product.age>=startage && product.age<=endage);
        if(filteredProducts.length>0){
            return filteredProducts;
        }
    }
   
}
module.exports =ProductManager;