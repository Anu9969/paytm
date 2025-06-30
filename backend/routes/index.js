const express = require('express');
const userRouter = require('./user.route')

const mainRouter = express.Router();

express.Router.get('/user', (req,res) =>{

})

mainRouter.get('/user', userRouter)

module.exports = mainRouter;