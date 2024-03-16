import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
};

const users: Record<string, User> = {};

app.get("/", (req, res) => {
    return res.json({
        title: "Baxter Node.js Assignment",
        description: "CRUD APIs using in memory database",
        author: "Suhel Kazi"
    });
});

app.get("/api/users", (req, res) => {
    console.log(users);
    if (!users || !Object.keys(users).length) {
        return res.status(404).json({ message: 'No user present as of now' });
    };
    return res.json(Object.values(users));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})