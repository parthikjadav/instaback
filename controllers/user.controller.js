import { createToken } from "../auth/index.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userController = {
  addUser: async (req, res) => {
    try {
        const { name, email,password,address,phone,role} = req.body;
        if (!name || !email || !password || !address || !phone) {
          return res.status(400).json({ message: "Please provide all fields" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          address,
          phone,
          role: role || "user",
        });
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
  getUser: async (req, res) => {
   try {
     const {id} = req.params;
     const user = await User.findById(id);
     res.status(200).json(user);
   } catch (error) {
     res.status(500).json({ message: error.message })
   }
  },
  getAllUser: async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
        const {id} = req.params;
        
        const user = await User.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true,
        });
        
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const {email, password} = req.body;
      if(!email || !password) return res.status(400).json({message: "Please provide email and password"});
      const user = await User.findOne({email});

      if(!user) return res.status(400).json({message: "User not found"});

      const isPasswordCorrect = await bcrypt.compare(password,user.password);

      if(!isPasswordCorrect) return res.status(400).json({message: "Invalid password"});

      const token = createToken(user);

      res.status(200).cookie("token", token, {httpOnly: true}).json({user,token});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({message: "User logged out"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },  
};

export default userController;
