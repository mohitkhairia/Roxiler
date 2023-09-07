const express = require('express');
const connect = require('./db/connectDatabase');
const { route } = require('./Routes/transactions.route');
const cors = require('cors')
const app = express();

app.use(cors());
app.use('/', route)







connect().then( () =>{
    app.listen(3001, ()=>{
        console.log('Server started on http://localhost:3001')
    })
})