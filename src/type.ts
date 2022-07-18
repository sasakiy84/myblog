import dayjs from "dayjs";

export type articleFrontMatter = {
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

export const isArticleFroontMatter = (arg: any): arg is articleFrontMatter => {
  if (!("title" in arg)) return false;
  if (!("description" in arg)) return false;

  if (!("updatedAt" in arg)) return false;
  if (!dayjs(arg.updatedAt, "YYYY-MM-DD", true).isValid()) return false;
  if (!("createdAt" in arg)) return false;
  if (!dayjs(arg.createdAt, "YYYY-MM-DD", true).isValid()) return false;

  return true;
};

export type articleMetaRow = {
  baseFileName: string;
} & articleFrontMatter;

export type articlesMetaRows = articleMetaRow[];

export type getAllMetaRowsResponse = {
  articles: articlesMetaRows;
};
