export type ColumnType = {
  name: string;
  id: number;

  cards: Array<CardType>;
};

export type CardType = {
  name: string;
  id: number;

  description: string;
  comments: Array<CommentType>;
};

export type CommentType = {
  name: string;
  id: number;
};

export type DescriptionType = {
  name: string;
  id: number;
};
