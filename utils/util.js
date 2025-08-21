const express =require("express")

const responseGenerator = (success, message, data) => {
    let obj = {}
    obj.success = success;
    obj.message = message || (success ? "Success" : "Failed");
    if(data){
        obj.data=data;
    }
    return obj;
}

module.exports = {responseGenerator}