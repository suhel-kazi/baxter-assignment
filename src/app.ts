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

const USERS: Record<string, User> = {};

app.get("/", (req, res) => {
    return res.json({
        title: "Baxter Node.js Assignment",
        description: "CRUD APIs using in memory database",
        author: "Suhel Kazi"
    });
});

app.get("/api/users", (req, res) => {
    if (!USERS || !Object.keys(USERS).length) {
        return res.status(404)
            .json({
                message: "No user present as of now"
            });
    };
    return res.json(Object.values(USERS));
});

app.get("/api/users/:userId", (req, res) => {
    const { userId } = req.params;
    console.log(USERS, userId)
    const user = USERS[userId];
    if (!user) {
        return res.status(404)
            .json({
                message: "User not found"
            });
    };
    return res.status(200)
        .json({
            message: "User found successfully",
            data: user
        });
});

app.post("/api/users", (req, res) => {
    const { userName, age, hobbies } = req.body;
    if (!userName || !age || !hobbies) {
        return res.status(400)
            .json({
                message: "Missing required user properties: userName, age, hobbies"
            });
    };

    const id = uuidv4();
    const newUser: User = { id, userName, age, hobbies};
    USERS[id] = newUser;
    return res.status(200)
        .json({
            message: "User added successfully",
            data: newUser
        });
});

app.put("/api/users/:userId", (req, res) => {
    const { userName, age, hobbies } = req.body;
    const userId = req.params.userId;
    const user = USERS[userId];
    if(!user) {
        return res.status(404)
            .json({
                message: "User not found"
            });
    };
    USERS[userId] = { ...user, userName, age, hobbies };
    const updatedUser = USERS[userId];
    return res.status(200)
        .json({
            message: "User updated successfully",
            data: updatedUser
        });
});

app.delete("/api/users/:userId", (req, res) => {
    const { userId } = req.params;
    const user = USERS[userId];
    if(!user) {
        return res.status(404)
            .json({
                message: "User not found"
            });
    };
    delete USERS[userId];
    return res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})