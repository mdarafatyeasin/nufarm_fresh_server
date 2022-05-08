const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors())
app.use(express.json())

// api

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.951ms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const productCollection = client.db("nuFarmFresh").collection("product");

        // api for all data load
        app.get('/product', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })

        // api for single data load by single id
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query)
            res.send(product)
        })

    }
    finally {

    }
}

run().catch(console.dir)






// basic api
app.get('/', (req, res) => {
    res.send('My inventory server is running')
});

app.listen(port, () => {
    console.log('server is activated', port)
});