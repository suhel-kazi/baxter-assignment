import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        title: "Baxter Node.js Assignment",
        description: "CRUD APIs using in memory database",
        author: "Suhel Kazi"
    });
});

app.get("/api/users", (req, res) => {
    return res.json();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})