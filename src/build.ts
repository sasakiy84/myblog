import { readdir } from "fs/promises";
import { createWriteStream } from "fs";
import { basename, extname, join } from "path";

const publicFiles = await readdir("public/articles");
const mdfiles = publicFiles
  .filter((filename) => {
    return extname(filename) === ".md";
  })
  .map((filename) => {
    return basename(filename, extname(filename));
  });

console.log(mdfiles);

const writeStream = createWriteStream(join("public", "contents.json"));
writeStream.write(JSON.stringify({ articles: mdfiles }));
