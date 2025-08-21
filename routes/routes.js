const express = require('express');
const { spawn } = require("child_process");
const path = require("path");
const home = require('../controllers/home');
const router = express.Router();


router.get("/hello",home.hello)
router.post("/convert",(req, res) => {
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
})

module.exports = router;