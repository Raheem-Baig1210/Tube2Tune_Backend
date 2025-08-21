const express=require('express');
const {responseGenerator} = require("../utils/util")

const homepage= async(req,res) => {
    try{
        const {url} = req.body;
        if(!link){
            let resp = responseGenerator(false, "Link is required");
            return res.status(400).json(resp);
        }
        else{

        }
    }catch(err){
        console.log(err)
        let resp=responseGenerator(false);
        res.status(404).json(resp);
    }
}