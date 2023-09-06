const express = require('express');
const connect = require('./db/connectDatabase');
const { route } = require('./Routes/transactions.route');

const app = express();

app.use('/', route)








connect().then( () =>{
    app.listen(3000, ()=>{
        console.log('Server started on http://localhost:3000')
    })
})