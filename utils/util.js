// const { default: bcrypt } = require("bcryptjs");
const express =require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const responseGenerator = (success, message, data) => {
    let obj = {}
    obj.success = success;
    obj.message = message || (success ? "Success" : "Failed");
    if(data){
        obj.data=data;
    }
    return obj;
}

const hashpassword = (plainPassword) => {
    return bcrypt.hash(plainPassword,2)
}
const comparePassword = (plainPassword,hashpassword)=>{
    return bcrypt.compare(plainPassword,hashpassword)
}
const generateTokens = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY,{expiresIn:"1d"})
} 


module.exports = {
    responseGenerator,
    hashpassword,
    comparePassword,
    generateTokens
}