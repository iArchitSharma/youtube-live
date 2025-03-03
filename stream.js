const puppeteer = require('puppeteer');

(async () => {
  // Launch Chromium in non-headless mode so it uses the virtual display
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  // Set viewport to match Xvfb resolution
  await page.setViewport({ width: 1280, height: 720 });
  // Replace with the URL you want to stream
  await page.goto('https://example.com');
  // Keep the browser open indefinitely (or until the action is cancelled)
  await new Promise(resolve => {});
})();
