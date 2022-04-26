export type ColumnType = {
  id: number;
  title: string;

  cards: Array<CardType>;
};

export type CardType = {
  id: number;
  title: string;

  description: string;
  comments: Array<CommentType>;
};

export type CommentType = {
  id: number;
  title: string;
};

export type DescriptionType = {
  id: number;
  title: string;
};
