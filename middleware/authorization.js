const express = require("express")
const jwt = require("jsonwebtoken");

const isLoggesIn = (req,res,next)=> {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err, decode)=> {
            if(err){
                console.log("🚫 Unauthorized access attempt:", err)
                res.status(401).json("Please login...!!!");
            }else{
                console.log("✅ User authenticated successfully:", decode)
                req.user = decode;
                next();
            }
        })
    }else{
        res.status(401).json("Please login...!!!");
    }
}

module.exports = isLoggesIn;