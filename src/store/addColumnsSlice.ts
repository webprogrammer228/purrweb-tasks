import { createSlice } from "@reduxjs/toolkit";
import { ColumnType } from "../types/type";

type StateType = {
  columns: Array<ColumnType>;
  currentCard: {
    cardId: number;
    columnId: number;
    title: string;
    description: string;
  };
};

export const initialState: StateType = {
  columns: [
    {
      id: 0,
      title: "TODO",
      cards: [],
    },
    {
      id: 1,
      title: "In Progress",
      cards: [],
    },
    {
      id: 2,
      title: "Testing",
      cards: [],
    },
    {
      id: 3,
      title: "Done",
      cards: [],
    },
  ],
  currentCard: { cardId: 0, columnId: 0, title: "", description: "" },
};

const addColumnSlice = createSlice({
  name: "Column",
  initialState,
  reducers: {
    //Columns
    addColumn(state, action) {
      state.columns.push({
        id: state.columns.length,
        title: action.payload.columnTitle,
        cards: [],
      });
    },
    editColumn(state, action) {
      state.columns[action.payload.id].title =
        action.payload.editedTitleColumn.title;
    },
    removeColumn(state, action) {
      state.columns = state.columns.filter(
        (state) => state.id !== action.payload.id
      );
      state.columns.forEach((state, index) => (state.id = index));
    },

    //Cards
    addCard(state, action) {
      state.columns[action.payload.id].cards.push({
        id: state.columns[action.payload.id].cards.length,
        description: "",
        title: action.payload.cardTitle,
        comments: [],
      });
    },
    deleteCard(state, action) {
      state.columns[action.payload.columnId].cards = state.columns[
        action.payload.columnId
      ].cards.filter((state) => state.id !== action.payload.cardId);
      state.columns[action.payload.columnId].cards.forEach(
        (state, index) => (state.id = index)
      );
    },
    addData(state, action) {
      state.currentCard = {
        cardId: action.payload.cardId,
        columnId: action.payload.columnId,
        title: action.payload.title,
        description: action.payload.description,
      };
    },
    editCard(state, action) {
      state.columns[action.payload.currentCard.columnId].cards[
        action.payload.currentCard.cardId
      ].title = action.payload.cardName;
      state.currentCard.title = action.payload.cardName;
    },
    addDescription(state, action) {
      state.columns[action.payload.currentCard.columnId].cards[
        action.payload.currentCard.cardId
      ].description = action.payload.descriptionCard;
      state.currentCard.description = action.payload.descriptionCard;
    },
    editDescription(state, action) {
      state.columns[action.payload.currentCard.columnId].cards[
        action.payload.currentCard.cardId
      ].description = action.payload.currentDescription;
      state.currentCard.description = action.payload.currentDescription;
    },
    removeDescription(state, action) {
      state.columns[action.payload.currentCard.columnId].cards[
        action.payload.currentCard.cardId
      ].description = "";
      state.currentCard.description = "";
    },
  },
});

export const {
  addColumn,
  editColumn,
  removeColumn,
  addCard,
  deleteCard,
  addData,
  editCard,
  addDescription,
  editDescription,
  removeDescription,
} = addColumnSlice.actions;

export default addColumnSlice.reducer;
