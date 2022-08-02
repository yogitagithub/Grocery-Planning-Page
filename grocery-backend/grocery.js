const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const mongoDB = require('mongodb');
const port = 3003;

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { MongoClient, ServerApiVersion, MongoRuntimeError } = require('mongodb');

const password = encodeURIComponent('Y0git@mongodb');

const uri = `mongodb+srv://yv161993:${password}@cluster0.xfzig.mongodb.net/Training?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const mainOutput = {
    "result": "Success"
}

app.get('/', (req, res) => {
    res.send('API Called')
})

app.post('/grocery/add', async (req, res) => {
    
    console.log(req.body)
    const data = req.body;
    const collection = client.db("Training").collection("groceries");
    const result = await collection.insertOne(data);
    console.log(result)
    res.send(mainOutput)
})

app.get('/grocery/getAll', async (req, res) => {

    const collection = client.db("Training").collection("groceries");
    const output = await collection.find({}).toArray()
    console.log(output)
    res.send(output)
})

app.delete("/grocery/deleteGroceryItem/:id", async (req, res) => {

    console.log(req.params.id)
    const collection = client.db("Training").collection("groceries");
    const input = await collection.deleteOne(
        {
            _id: new mongoDB.ObjectId(req.params.id)
        }
    );
    console.log(input)
    res.send(mainOutput)
})

app.put("/grocery/updatePurchaseStatus/:id", async (req, res) => {

    console.log(req.params.id)
    const collection = client.db("Training").collection("groceries");
    const value = await collection.updateOne(
        {
            _id: new mongoDB.ObjectId(req.params.id)
        },
        {
            $set:   {
                       isPurchased: true
                    }
        }
    );
    console.log(value)
    res.send(mainOutput)
})

async function run() {



}

app.listen(port, async() => {
    run().catch(console.dir);

    console.log(`APP is running on ${port}`)

    client.connect(async err => {
        console.log(err);
        console.log("DB Connected")

    });
})
