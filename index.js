const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 3500;
const app = express();

// Connect to react-app | middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Node server is working");
});

app.listen(port, () => {
    console.log("Listening", port);
});
