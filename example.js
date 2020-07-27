const puppeteer = require("puppeteer");
require("dotenv").config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

(async (USERNAME, PASSWORD) => {

  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto("https://truthbet.com/login?redirect=/g/live/baccarat/22", { waitUntil: "networkidle2" });

  await page.evaluate((USERNAME, PASSWORD) => {
    document.querySelector('[name="username"]').value = USERNAME;
    document.querySelector('[name="password"]').value = PASSWORD;
    document.querySelector('[name="remember_username"]').checked = true;
  }, USERNAME, PASSWORD);

  // login
  await page.evaluate(() => {
    document.querySelector("form").submit();
  });

  // await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 10000 });
  // await page.waitForSelector('#manage-trips', { visible: true, timeout: 0 });

  // access baccarat room 2
  // await page.goto("https://truthbet.com/g/live/baccarat/22", {
  //   waitUntil: "networkidle2",
  // });
  // await browser.close();
})(USERNAME, PASSWORD);
