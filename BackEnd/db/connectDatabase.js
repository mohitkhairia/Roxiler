
const mongoose  = require('mongoose');


async function connect(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/roxiler');
        console.log('Connected');
    }
    catch(err){
        console.log(err)
    }
}


module.exports = connect;