import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUser, getUserbyEmail } from "./database/models/userFunctions.js";
const saltRounds = 10;
const JWT_SECRET = "dhsahdbfhj12332"

export const signup = async (data,res) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userObj = { ...data, password: hashedPassword };
    const newUser = await insertUser(userObj);
    if (newUser) {
      res.status(200).json({ status: "success",message: "User registered successfully!" })
    }
    else{
      res.status(400).json({ status: "error", message: "Email already exists" })
    }
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ status: "error", message: "Signup failed." });
  }
};

export const login = async (data,res) => {
  try {
    const { email, password } = data;
    const user = await getUserbyEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }
    const isverified = await bcrypt.compare(password, user.password);
    if (!isverified) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "2 days" }
    );
    const userId=user._id
    res.status(200).json({ status: "success",message: "Logged in successfully!",token,userId})
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ status: "error", message: "Login failed." });
  }
};
