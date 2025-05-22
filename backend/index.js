import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connection_db } from "./database.js";
import { login, signup } from "./auth.js";
import { addone, deleteone, fetchall } from "./transactions.js";
import { verifyToken } from "./authmiddleware.js";


const app = express();
const port = 3000;
connection_db();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  signup(req.body, res);
});

app.post("/login", (req, res) => {
  login(req.body, res);
});

app.post("/transactions/fetchall", verifyToken, (req, res) => {
  fetchall(req.user.id, res);
});

app.post("/transactions/addone", verifyToken, (req, res) => {
  addone(req.body, req.user.id, res);
});

app.post("/transactions/deleteone", verifyToken, (req, res) => {
  deleteone(req.body, req.user.id, res);
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Example app listening on port ${port}`);
  }
});
