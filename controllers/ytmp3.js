// const fs = require("fs");
// const path = require("path");
// const ytdl = require("ytdl-core");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegPath = require("ffmpeg-static");

// // Make sure ffmpeg knows where to find binary
// ffmpeg.setFfmpegPath(ffmpegPath);

// async function downloadAudio(url, outputDir = "downloads") {
//   try {
//     // Ensure output directory exists
//     fs.mkdirSync(outputDir, { recursive: true });

//     // Get video info
//     const info = await ytdl.getInfo(url);
//     const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_");
//     const filepath = path.join(outputDir, `${title}.mp3`);

//     return new Promise((resolve, reject) => {
//       ffmpeg(ytdl(url, { quality: "highestaudio" }))
//         .audioBitrate(192)
//         .toFormat("mp3")
//         .save(filepath)
//         .on("end", () => resolve(filepath))
//         .on("error", (err) => reject(err));
//     });
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

// // If run directly like python script
// if (require.main === module) {
//   const url = process.argv[2];
//   downloadAudio(url)
//     .then((filepath) => {
//       console.log(filepath); // just like Python printed
//       process.exit(0);
//     })
//     .catch((err) => {
//       console.error("Error:", err.message);
//       process.exit(1);
//     });
// }

// module.exports = { downloadAudio };


const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

async function downloadAudio(url) {
  return new Promise((resolve, reject) => {
    const outputDir = path.join(__dirname, "../downloads");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const process = spawn("yt-dlp", [
      "-x",
      "--audio-format", "mp3",
      "-o", `${outputDir}/%(title)s.%(ext)s`,
      url
    ]);

    process.stderr.on("data", (data) => {
      console.error("yt-dlp error:", data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve("Audio downloaded successfully");
      } else {
        reject(new Error("yt-dlp failed"));
      }
    });
  });
}

module.exports = { downloadAudio };























// # import os
// # import yt_dlp
// # import sys
// # import io
// # sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


// # def download_audio(url, output_dir="downloads"):
// #     # make sure output folder exists
// #     os.makedirs(output_dir, exist_ok=True)

// #     # build filepath (video title will replace %(title)s)
// #     filepath = os.path.join(output_dir, "%(title)s.%(ext)s")

// #     ydl_opts = {
// #         "format": "bestaudio[ext=m4a]/bestaudio",
// #         "outtmpl": filepath,
// #         "postprocessors": [{
// #             "key": "FFmpegExtractAudio",
// #             "preferredcodec": "mp3",
// #             "preferredquality": "192",
// #         }],
// #         "ffmpeg_location": r"C:\ffmpeg\ffmpeg-7.1.1-essentials_build\bin"  # update path
// #     }

// #     with yt_dlp.YoutubeDL(ydl_opts) as ydl:
// #         info = ydl.extract_info(url, download=True)
// #         return ydl.prepare_filename(info).rsplit(".", 1)[0] + ".mp3"

// # if __name__ == "__main__":
// #     url = sys.argv[1]  # Node.js passes the URL as an argument
// #     filepath = download_audio(url)
// #     print(filepath)
// #   # Send back result to Node.js
