import puppeteer, { Browser, Page } from "puppeteer";

let _browser: Browser | null = null;

export async function getBrowser() {
  if (_browser) {
    return _browser;
  }

  _browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  return _browser;
}
