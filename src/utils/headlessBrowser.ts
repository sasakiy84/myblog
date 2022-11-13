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
  });
  console.log("launched browser");

  const page = await browser.newPage();

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
