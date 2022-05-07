const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3500;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Connect to react-app | middleware
app.use(cors());
app.use(express.json());

// id: module66
// pass: asd66ASD
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.je7gu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function runDB() {
    try {
        await client.connect();
        console.log("mongodb connected");
        const database = client.db("Assignment11").collection("AllFruits");
        // Add New Product
        app.post("/addProduct", async (req, res) => {
            const productData = req.body;
            database.insertOne(productData.userData);
            res.send("Your Product is Successfully saved.");
        });

        // Get All Product
        app.get("/products", async (req, res) => {
            const query = {};
            const cursor = database.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Delete User
        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await database.deleteOne(query);
            res.send(result);
        });
    } finally {
        // await client.close();
    }
}

runDB().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Node server is working");
});

app.listen(port, () => {
    console.log("Listening", port);
});
