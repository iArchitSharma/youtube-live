const puppeteer = require("puppeteer");
const { spawn } = require("child_process");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.wwe.com/"); // Replace with your webpage link

  const ffmpeg = spawn("ffmpeg", [
    "-f", "x11grab",
    "-r", "30",
    "-s", "1280x720",
    "-i", ":99.0",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-b:v", "3000k",
    "-maxrate", "3000k",
    "-bufsize", "6000k",
    "-pix_fmt", "yuv420p",
    "-g", "50",
    "-c:a", "aac",
    "-b:a", "128k",
    "-ar", "44100",
    "-f", "flv",
    `rtmp://a.rtmp.youtube.com/live2/${process.env.STREAM_KEY}`,
  ]);

  ffmpeg.stderr.on("data", (data) => console.error(data.toString()));
  ffmpeg.on("close", () => browser.close());
})();
