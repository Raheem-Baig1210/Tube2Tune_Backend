const express =require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const { customAlphabet } = require("nanoid");

const {responseGenerator} = require("../utils/util");

const convert =async(req,res) => {
    try{
    const {url} = req.body;
    if(!ytdl.validateURL(url)){
        let resp = responseGenerator(false, "Invalid Youtube URL");
        return res.status(400).json(resp);  
    }
    const info = await ytdl.getInfo(url);
    const tilteRaw =info.videoDetails.title || "audio";
    const duration = Number(info.videoDetails.lengthSeconds || 0)

    // Make a safe filename
    const safeTitle = titleRaw.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").slice(0, 80);
    const id = nanoid();
    const filename = `${safeTitle}-${id}.mp3`;
    const filepath = path.join(DOWNLOADS_DIR, filename);

    // Stream the highest-quality audio straight into ffmpeg -> mp3 file
    const audioStream = ytdl(url, { quality: "highestaudio", filter: "audioonly" });

    ffmpeg(audioStream)
      .setFfmpegPath(ffmpegPath)
      .audioCodec("libmp3lame")
      .audioBitrate(128)
      .format("mp3")
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        if (!res.headersSent) {
          return res.status(500).json({ error: "Conversion failed" });
        }
      })
      .on("end", () => {
        const downloadUrl = `/downloads/${encodeURIComponent(filename)}`;
        if (!res.headersSent) {
          res.json({
            title: titleRaw,
            duration,
            filename,
            downloadUrl,
          });
        }
      })
      .save(filepath);
    }
    catch(err){
        console.log(err);
        let resp =responseGenerator(false,"Error from the convert middleware");
        res.status(500).json(resp);
    }
}





module.exports = {convert};