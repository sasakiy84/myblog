import { mkdir, readdir, readFile, rm } from "fs/promises";
import { createWriteStream } from "fs";
import { basename, extname, join } from "path";
import { copyFileByLine } from "./utils/file";

import { parse } from "yaml";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { articleMetaRow, isArticleFroontMatter } from "./type";
import dayjs from "dayjs";

const PUBLIC_ARTICLE_DIR = join("public", "articles");

const publicFiles = await readdir("articles");
console.log({ publicFiles });
const mdfilesPromise = publicFiles
  .filter((filename) => {
    return extname(filename) === ".md";
  })
  .map(async (filename): Promise<articleMetaRow> => {
    const baseFileName = basename(filename, extname(filename));
    const content = await readFile(join("articles", filename));
    const processor = unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, [{ type: "yaml", marker: "-", anywhere: false }])
      .use(remarkExtractFrontmatter, {
        yaml: parse,
        name: "frontMatter",
      });

    const {
      data: { frontMatter },
    } = await processor.process(content);
    if (!isArticleFroontMatter(frontMatter)) {
      // TODO show more info
      throw Error("title and description field required");
    }

    const { title, description, updatedAt, createdAt, tags } = frontMatter;

    return {
      baseFileName,
      title,
      description,
      updatedAt,
      createdAt,
      tags,
    };
  });

const mdfilesMetaRows = await Promise.all(mdfilesPromise);
const sortedMdfilesMetaRow = mdfilesMetaRows.sort(
  ({ createdAt: createdAtA }, { createdAt: createdAtB }) => {
    return dayjs(createdAtA).isBefore(dayjs(createdAtB)) ? 1 : -1;
  }
);

await rm(PUBLIC_ARTICLE_DIR, { recursive: true, force: true });
await mkdir(PUBLIC_ARTICLE_DIR);

const copyFilesPromise = sortedMdfilesMetaRow.map(async ({ baseFileName }) => {
  return copyFileByLine(
    join("articles", `${baseFileName}.md`),
    join(PUBLIC_ARTICLE_DIR, `${baseFileName}.md`)
  );
});

await Promise.all(copyFilesPromise);

const writeStream = createWriteStream(join("public", "contents.json"));
writeStream.write(JSON.stringify({ articles: sortedMdfilesMetaRow }));
