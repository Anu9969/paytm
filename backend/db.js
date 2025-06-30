const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://<anurag9969>:<12345>@cluster0.2yuadsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required :[true,"Password is required"]

    },
    fullName: {
        type:String,
        required:true,
        
    }
})


export const User = mongoose.model("User", userSchema)