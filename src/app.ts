import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

interface User {
    id: string;
    userName: string;
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
        return res.status(404)
            .json({
                message: 'No user present as of now'
            });
    };
    return res.json(Object.values(users));
});

app.post("/api/users", (req, res) => {
    const { userName, age, hobbies } = req.body;
    if (!userName || !age || !hobbies) {
        return res.status(400)
            .json({
                message: 'Missing required user properties: userName, age, hobbies'
            });
    };

    const id = uuidv4();
    const newUser: User = { id, userName, age, hobbies};
    users[id] = newUser;
    return res.status(200)
        .json({
            message: "User added successfully",
            data: newUser
        });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})