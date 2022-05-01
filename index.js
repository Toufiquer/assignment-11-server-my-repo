const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3500;
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

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
        const database = client.db("assignment-11").collection("Second-Users");
        // Test
        const data = { name: "name of the ", section: "section" };
        const result = await database.insertOne(data);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
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
