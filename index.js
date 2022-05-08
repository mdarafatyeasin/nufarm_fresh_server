const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();


// middleware
app.use(cors())
app.use(express.json())


// api
app.get('/', (req, res)=>{
    res.send('My inventory server is running')
});

app.listen(port,()=>{
    console.log('server is activated', port)
});