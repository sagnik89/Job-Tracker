import { User } from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userSignup = async (req, res) => {
    const userData = req.body

    try {
        const existingUser = await User.findOne({ email: userData.email })
        
        if (existingUser) {
            return res.status(409).json({error: "User already exists"})
        }

        const newUser = await User.create(userData)

        res.status(201).json({
          message: "User created successfully",
          user: {
            name: newUser.name,
            email: newUser.email,
          },
        });
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const userLogin = async (req, res) => {
    const userData = req.body

    try {
        const existingUser = await User.findOne({ email: userData.email });

        if (!existingUser) {
          return res.status(409).json({ error: "User doesn't exist" });
        }

        // check for the password
        const loggedIn = await bcrypt.compare(userData.password, existingUser.password)

        if (!loggedIn) {
            return res.status(409).json({error: "Invalid credentials"})
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )

        res.status(200).json({
          message: "User login successful",
          token,
          user: {
            name: existingUser.name,
            email: existingUser.email,
          },
        });

    } catch (err) {
        res.json({error: err.message})
    }
}