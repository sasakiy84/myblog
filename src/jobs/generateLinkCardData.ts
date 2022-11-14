import path, { extname, join } from "path";
import { mkdir, readdir, readFile, rm, writeFile } from "fs/promises";
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

const promises = linkCardData.map(async (data) => {
  const seoData = await fetchSEOData(data?.links || []);
  return {
    filename: data?.filename,
    seoData,
  };
});

const result = await Promise.allSettled(promises);

const METADATA_DIR_PATH = path.join("dist", "metadata");
await rm(METADATA_DIR_PATH, { recursive: true, force: true });
await mkdir(METADATA_DIR_PATH);

for (const data of result) {
  if (data.status === "rejected" || data.value.filename === undefined) continue;

  const basename = path.basename(
    data.value.filename,
    path.extname(data.value.filename)
  );
  await writeFile(
    path.join(METADATA_DIR_PATH, `${basename}.json`),
    JSON.stringify(data.value.seoData)
  );
  console.log(data.value.filename);
  console.log(data.value.seoData);
}

// console.log(
//   await fetchSEOData([
//     "https://github.com/puppeteer/puppeteer",
//     "https://qiita.com/n0bisuke/items/6ecfdcb4d1bbb4b6419c",
//     "https://stackoverflow.com/questions/52163547/node-js-puppeteer-how-to-set-navigation-timeout",
//   ])
// );
