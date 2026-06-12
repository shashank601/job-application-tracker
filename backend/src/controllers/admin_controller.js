
import User from "../models/user_model.js";
import mongoose from "mongoose";



export const get_user = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }
        
        const user = await User.findById(userId).select("-password -__v");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const delete_user = async (req, res) => {
    try {
        const userId = req.params.id;

        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user id" });
        }

        if (req.user.id === userId) {
            return res.status(400).json({ success: false, message: "Admin cannot delete self" });
        }
        
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
