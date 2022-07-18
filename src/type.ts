export type articleMetaRow = {
  baseFileName: string;
  title: string;
  description: string;
};

export const isArticleMetaRow = (arg: any): arg is articleMetaRow => {
  if (!("title" in arg)) return false;
  if (!("description" in arg)) return false;
  if (!("baseFileName" in arg)) return false;
  return true;
};

export type articlesMetaRows = articleMetaRow[];

export type getAllMetaRowsResponse = {
  articles: articlesMetaRows;
};
