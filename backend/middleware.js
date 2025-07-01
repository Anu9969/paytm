const express = require('express')
const jwt = require('jsonwebtoken')


const authMiddleWare = (req, res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
 //token bearer word se start hoga and uske baad asli token hoga isliye [1]
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token ,  JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({});
        }
    } catch (error) {
        return res.status(403).json({});
    }
}

module.exports = {authMiddleWare}