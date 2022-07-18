import dayjs from "dayjs";

export type articleFrontMatter = {
  title: string;
  description: string;
  updatedAt: YearMonthDay;
  createdAt: YearMonthDay;
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

type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Year = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`;
type Month = `0${oneToNine}` | `1${0 | 1 | 2}`;
type Day = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`;
export type YearMonthDay = `${Year}-${Month}-${Day}`;
