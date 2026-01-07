import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await User.create({ 
      userName, 
      email, 
      password: hashedPassword 
    });

    
    const token = generateToken(user._id);

    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = generateToken(user._id);
  
  res.json({ 
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email
    }
  });
};