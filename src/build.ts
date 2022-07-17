import { mkdir, readdir, readFile, rm } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { basename, extname, join } from "path";

import { parse } from "yaml";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { createInterface } from "readline";

const PUBLIC_ARTICLE_DIR = join("public", "articles");

type articleFrontmatter = {
  title: string;
  description: string;
};

const isArticleFrontmatter = (arg: any): arg is articleFrontmatter => {
  if (!("title" in arg)) return false;
  if (!("description" in arg)) return false;
  return true;
};

const copyFileByLine = async (
  srcFilePath: string,
  newFilePath: string,
  inputLineTransformer: (inputLine: string, previousLine?: string) => string = (
    inputLine,
    _prevLine
  ) => inputLine
): Promise<void> => {
  const readStream = createReadStream(srcFilePath);
  const writeStream = createWriteStream(newFilePath);
  const readLine = createInterface({
    input: readStream,
    output: writeStream,
  });

  let previousLine = "";
  readLine.on("line", (lineString) => {
    const transformedInputLine = inputLineTransformer(lineString, previousLine);
    writeStream.write(`${transformedInputLine}\n`);

    previousLine = lineString;
  });

  return new Promise((resolve) => {
    readLine.on("close", () => resolve());
  });
};

const publicFiles = await readdir("articles");
console.log({ publicFiles });
const mdfilesPromise = publicFiles
  .filter((filename) => {
    return extname(filename) === ".md";
  })
  .map(
    async (
      filename
    ): Promise<{
      baseFileName: string;
      title: string;
      description: string;
    }> => {
      const baseFileName = basename(filename, extname(filename));
      const content = await readFile(join("articles", filename));
      const processor = unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter, [
          { type: "yaml", marker: "-", anywhere: false },
        ])
        .use(remarkExtractFrontmatter, {
          yaml: parse,
          name: "frontMatter",
        });

      const {
        data: { frontMatter },
      } = await processor.process(content);
      if (!isArticleFrontmatter(frontMatter)) {
        throw Error("title and description field required");
      }

      const { title, description } = frontMatter;

      return {
        baseFileName,
        title,
        description,
      };
    }
  );

const mdfilesMetaData = await Promise.all(mdfilesPromise);

await rm(PUBLIC_ARTICLE_DIR, { recursive: true, force: true });
await mkdir(PUBLIC_ARTICLE_DIR);

const copyFilesPromise = mdfilesMetaData.map(async ({ baseFileName }) => {
  return copyFileByLine(
    join("articles", `${baseFileName}.md`),
    join(PUBLIC_ARTICLE_DIR, `${baseFileName}.md`)
  );
});

await Promise.all(copyFilesPromise);

const writeStream = createWriteStream(join("public", "contents.json"));
writeStream.write(JSON.stringify({ articles: mdfilesMetaData }));
