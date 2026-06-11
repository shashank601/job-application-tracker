import User from "../models/user_model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
        
    const new_user = await User.create({ name, email, password });
    
    const token = jwt.sign({ id: new_user._id, role: new_user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: new_user._id,
        name: new_user.name,
        email: new_user.email
      }
    });
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
