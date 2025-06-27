import express from 'express'; //change type to module in package.json to use import export commands
import dotenv from"dotenv"; //helps accesing from .env file
import {connectDB} from './config/db.js'; 
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();


const app = express();

app.use(express.json());

app.use(cors());

app.post("/api/products", async(req, res)=>{
    const product = req.body;

    if(!product.name||!product.price||!product.quantity){
        return res.status(400).json({success:false, message:"please provide all the fields"});
    }

    const newproduct = new Product(product);


    try{
        await newproduct.save();
        res.status(201).json({success: true, data: newproduct});
    }catch(error){
        console.error("error in create project", error.message);
        res.status(400).json({success:false, message: "server error"});
    }
});

app.delete("/api/products/:id", async(req,res)=>{
    const {id}=req.params;
    console.log("id: ",id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"deleteddddd"});
    }catch(error){
        console.error("errror in deletion",error.message);
        res.status(404).json({success: false, message: "product not found"});
    }
});

app.get("/api/products", async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    }catch(error){
        console.error("errror in getting products",error.message);
        res.status(400).json({success:false, message: "server error"});
    }
});

// PATCH quantity after checkout
app.patch("/api/products/name/:name/quantity", async (req, res) => {
    const { name } = req.params;
    const { count } = req.body;
  
    try {
      const product = await Product.findOne({ name: name });
      if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
      if (product.quantity < count) {
        return res.status(400).json({ success: false, message: "Not enough quantity" });
      }
  
      product.quantity -= count;
      await product.save();
  
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error("Error updating quantity", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
  
  app.use(cors({
    origin: 'http://localhost:5173', // your frontend origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }));

console.log(process.env.MONGO_URI);

app.listen(5000, 'localhost', ()=>{
    connectDB();
    console.log('server started at http://localhost:5000 ');
})

//username : crazy_user  password : admin_only