const connect = require("./db/connectDatabase");
const Product = require("./db/product.model");

const AddData = async()=>{
    try{

        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = await response.json();
        
        Product.insertMany(data);
    }
    catch(err){
        console.log(err)
    }
}

connect().then(()=>{
    AddData()
});