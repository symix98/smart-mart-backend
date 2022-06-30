require('dotenv').config();

const productsData = require('./data/product');

const connectDB = require('./config/db');

const Product = require('./models/products');

connectDB();

const importData = async () => {
    try{
        await Product.deleteMany({});
        await Product.insertMany(productsData);
        console.log("Data import success");
        process.exit(1);
    }
    catch (error){
        console.error("Error with data import");
        process.exit(1);
    }
}
importData();