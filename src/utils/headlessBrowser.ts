import puppeteer from "puppeteer-core";
import { executablePath } from "puppeteer";

export const fetchSEOData = async (
  targetURL: string
): Promise<{
  title: string;
  ogpURL: string;
  description: string;
}> => {
  console.log("launch browser");
  const browser = await puppeteer.launch({
    executablePath: executablePath(),
    headless: true,
    args: [
      "--no-sandbox",
      "--single-process",
      "--no-first-run",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-zygote",
      "--disable-gpu",
    ],
  });
  console.log("launched browser");

  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    if (
      interceptedRequest.url().endsWith(".png") ||
      interceptedRequest.url().endsWith(".jpg") ||
      interceptedRequest.url().endsWith(".webp") ||
      interceptedRequest.url().endsWith(".css")
    )
      interceptedRequest.abort();
    else interceptedRequest.continue();
  });

  console.log("go to page");
  await page.goto(targetURL);
  console.log("went to page");
  const title = await page.title();
  const descriptionHandle = await page.$("meta[property='og:description']");
  const description =
    (await page.evaluate((descriptionElement) => {
      return descriptionElement?.getAttribute("content");
    }, descriptionHandle)) || "";
  const ogpURLHandle = await page.$("meta[property='og:image']");
  const ogpURL =
    (await page.evaluate((ogpElement) => {
      return ogpElement?.getAttribute("content") || "";
    }, ogpURLHandle)) || "";

  await browser.close();

  return {
    title,
    ogpURL,
    description,
  };
};
