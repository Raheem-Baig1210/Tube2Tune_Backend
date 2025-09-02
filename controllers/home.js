const express=require('express');
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const { downloadAudio } = require("../controllers/ytmp3");
const { spawn } = require("child_process");
const {responseGenerator} = require("../utils/util")


const hello = (req,res) => {
    let resp = responseGenerator(true, "Hello !!! How are you?");
    res.status(200).json(resp);
}

const homepage = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "YouTube URL required" });
  }

  try {
    const filepath = await downloadAudio(url);
    res.json({ success: true, filepath });
  } catch (err) {
    console.error("Conversion error:", err.message);
    res.status(500).json({ error: "Conversion failed", details: err.message });
  }
};

module.exports = {homepage,hello};