const express = require("express")
const {responseGenerator, comparePassword,generateTokens} = require("../utils/util");
const User_Mdl = require("../model/users");


const register = async (req,res)=>{
    try {
        const data =req.body;
        const user = new User_Mdl(data);
        await user.save();
        res.status(201).json({success: true, message:"User Registered successfully...!!!",data: user})
    } catch (err) {
        console.log(err);
        res.status(404).json({success:false, message: "please enter again...!!!"})
    }
}

const login = async (req,res) => {
    try{
        const {email, password} =req.body;
        const user = await User_Mdl.findOne({email}).lean();
        if(user){
            const isMatch = await comparePassword(password,user.password);
            if(isMatch){
                const tokens = generateTokens({id: user.if,email, name: user.name})
                res.status(200).json({
                    message: "Login Successfull",
                    success: true,
                    data: {
                        name: user.name,
                        id: user.id,
                        tokens
                    }
                })
            }
        }
        else{
            res.status(401).json({success:false, message: "Invalid email or password ....!!!"})
        }
    }
    catch(err){
        console.log(err);
        let resp = responseGenerator({success: false, message: "Invalid credentials"});
        return res.status(500).json(resp)
    }
}

module.exports={
    login,
    register
}