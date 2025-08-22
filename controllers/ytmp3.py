import os
import yt_dlp
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def download_audio(url, output_dir="downloads"):
    # make sure output folder exists
    os.makedirs(output_dir, exist_ok=True)

    # build filepath (video title will replace %(title)s)
    filepath = os.path.join(output_dir, "%(title)s.%(ext)s")

    ydl_opts = {
        "format": "bestaudio[ext=m4a]/bestaudio",
        "outtmpl": filepath,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }],
        "ffmpeg_location": r"C:\ffmpeg\ffmpeg-7.1.1-essentials_build\bin"  # update path
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        return ydl.prepare_filename(info).rsplit(".", 1)[0] + ".mp3"

if __name__ == "__main__":
    url = sys.argv[1]  # Node.js passes the URL as an argument
    filepath = download_audio(url)
    print(filepath)
  # Send back result to Node.js
