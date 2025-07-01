import { number } from 'zod'

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://<anurag9969>:<12345>@cluster0.2yuadsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = new mongoose.Schema({
    username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            minlength: 3,
            trim: true

    },
    password: {
        type: String,
        required :[true,"Password is required"]

    },
    fullName: {
        type: String,
            required: true,
            trim: true,
            minlength: 3,
            lowercase: true,
            index: true
        
    }
})

const BankSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    balance:{
        type: number
    }
},{timestamps:true})


export const User = mongoose.model("User", userSchema)

export const Bank = mongoose.model("Bank", BankSchema)