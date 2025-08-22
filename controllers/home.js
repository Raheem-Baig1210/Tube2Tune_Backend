const express=require('express');
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const { spawn } = require("child_process");
const {responseGenerator} = require("../utils/util")


const hello = (req,res) => {
    let resp = responseGenerator(true, "Hello !!! How are you?");
    res.status(200).json(resp);
}

const homepage= async(req,res) => {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "YouTube URL required" });
      }
    
      const pythonScript = path.join(__dirname, "../controllers/ytmp3.py");
      const pythonProcess = spawn("python", [pythonScript, url]);
    
      let output = "";
    
      pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
      });
    
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Python error: ${data}`);
      });
    
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          res.json({ success: true, filepath: output.trim() });
        } else {
          res.status(500).json({ error: "Conversion failed" });
        }
      });
    
  }

module.exports = {homepage,hello};