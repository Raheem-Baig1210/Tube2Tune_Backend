const express = require("express");
const path = require("path");
const fs = require("fs");

const app=express();

app.use(express.json());
const port=5050;

app.use(require("./routes/routes"));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})