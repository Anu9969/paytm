const express = require("express")
const zod = require("zod")
const jwt = require('jsonwebtoken') 
const JWT_SECRET = require('../config')
const User = require("../db")
const authMiddleware = require("../middleware")

const userRouter = express.Router();

const signUpSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    fullName: zod.string()
})

userRouter.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const { success } = signUpSchema.safeParse(body)
        
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data"
            })
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            username: body.username
        })

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        // Create new user
        const newUser = await User.create(body);

        // Generate JWT token
        const token = jwt.sign({
            userId: newUser._id,
        }, JWT_SECRET)

        res.status(201).json({
            message: "User created successfully",
            token: token
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

const signInSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

userRouter.post('/signin', async (req, res) => {
    try {
        const body = req.body;
        const { success } = signInSchema.safeParse(body);

        if (!success) {
            return res.status(400).json({
                message: "Invalid input data"
            })
        }

        // Find user in database
        const user = await User.findOne({
            username: body.username
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Check password
        if (body.password === user.password) {
            // Generate JWT token
            const token = jwt.sign({
                userId: user._id,
            }, JWT_SECRET)

            return res.status(200).json({
                message: `Welcome back ${body.username}`,
                token: token
            })
        } else {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})


const updateBody = zod.object({
    fullName: zod.string,
    password: zod.string
})
userRouter.put('/' ,authMiddleware, async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Error while updating data"
        })
    }

    await User.updateOne(req.body,{
        id: req.userId

    })

    res.json({
        message: "Data Updated Successfully"
    })

    
})

userRouter.get("/bulk", async(req,res) => {
    const filter = req.quesry.filter || "";

    const users = await User.find({
        $or:[{
            fullName:{
                "$regex": filter
            }
        }
    ]
    })

    res.json({
        user: users.map(user => ({
            username:user.username,
            fullName:user.fullName,
            _id:user._id
        }))
    })
})

userRouter.get('/user/')
module.exports = userRouter