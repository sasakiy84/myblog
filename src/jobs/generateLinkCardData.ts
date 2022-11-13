import { extname, join } from "path";
import { readdir, readFile } from "fs/promises";
import { extractLinkCardData, parseMdToMdast } from "../utils/markdown";
import { fetchSEOData } from "../utils/headlessBrowser";

const articles = await readdir("articles");
const fetchLinkPromimse = articles
  .filter((filename) => {
    return extname(filename) === ".md";
  })
  .map(async (filename): Promise<{ filename: string; links: string[] }> => {
    const content = await readFile(join("articles", filename));
    const root = parseMdToMdast(content.toString());
    const links = extractLinkCardData(root);
    return {
      filename,
      links,
    };
  });

const linkCardData = (await Promise.allSettled(fetchLinkPromimse))
  .map((result) => {
    return result.status === "fulfilled" ? result.value : undefined;
  })
  .filter((d) => d);

// console.log(linkCardData);
console.log(await fetchSEOData("https://github.com/puppeteer/puppeteer"));
