export type comments = {
  comments: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }[];

  setComments: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined | null;
        columnId: number | null | undefined;
        commentId?: number | null | undefined;
      }[]
    >
  >;

  commentsMas: {
    name: string | undefined;
    cardId: number | null | undefined;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }[];

  currentCardId: number | null | undefined;
  currentColumnId: number | null | undefined;

  editElem: (h3: HTMLElement) => void;
};

export type column = {
  data: { id: number; name: string }[];
  name: string | number | null;

  setData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
};

export type card = {
  cards: {
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }[];
  id: number;

  data: {
    id: number;
    name: string;
  }[];

  setCards: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined;
        columnId: number | undefined;
      }[]
    >
  >;

  setCurrentCardId: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;

  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentColumnId: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  setCardColumnName: React.Dispatch<React.SetStateAction<string>>;

  deleteDescription: (id: number | null | undefined) => void;
  endEditColumn: (e: React.SyntheticEvent) => void;
  cardsMas: {
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }[];
  editElem: (h3: HTMLElement) => void;
  removeColumn: (id: number) => void;
};

export type description = {
  description: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
  }[];

  setDescription: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined | null;
        columnId: number | null | undefined;
      }[]
    >
  >;
  descriptionMas: {
    name: string | undefined;
    cardId: number | null | undefined;
    columnId: number | null | undefined;
  }[];

  currentCardId: number | null | undefined;
  currentColumnId: number | null | undefined;
  editElem: (h3: HTMLElement) => void;
  deleteDescription: (id: number | null | undefined) => void;
};
