import { createSlice } from "@reduxjs/toolkit";
import { ColumnType, CommentType } from "../types/type";

type StateType = {
  columns: Array<ColumnType>;
  currentCard: {
    cardId: number;
    columnId: number;
    title: string;
    description: string;
    comments: CommentType[];
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
  currentCard: {
    cardId: 0,
    columnId: 0,
    title: "",
    description: "",
    comments: [{ id: 0, title: "" }],
  },
};

//плохое название для общего слайса
const addColumnSlice = createSlice({
  name: "Column",
  initialState,
  reducers: {
    //Columns
    addColumn(state, action) {
      let { title } = action.payload;

      state.columns.push({
        id: state.columns.length,
        title: title,
        cards: [],
      });
    },
    editColumn(state, action) {
      let { id, columnTitle } = action.payload;

      state.columns[id].title = columnTitle;
    },
    removeColumn(state, action) {
      let { id } = action.payload;

      state.columns = state.columns.filter((state) => state.id !== id);
      //чтобы не заниматься такой хуйней, нужно использовать uuid
      state.columns.forEach((state, index) => (state.id = index));
    },

    //Cards
    addCard(state, action) {
      let { id, cardTitle } = action.payload;

      state.columns[id].cards.push({
        id: state.columns[id].cards.length,
        description: "",
        title: cardTitle,
        comments: [],
      });
    },
    deleteCard(state, action) {
      let { columnId, cardId } = action.payload;

      state.columns[columnId].cards = state.columns[columnId].cards.filter(
        (state) => state.id !== cardId
      );
      state.columns[columnId].cards.forEach(
        (state, index) => (state.id = index)
      );
    },
    showData(state, action) {
      let { cardId, columnId, title, description, comments } = action.payload;

      state.currentCard = {
        cardId: cardId,
        columnId: columnId,
        title: title,
        description: description,
        comments: comments,
      };
    },
    editCard(state, action) {
      let { columnId, cardId, data } = action.payload;

      state.columns[columnId].cards[cardId].title = data.cardTitle;
      state.currentCard.title = data.cardTitle;
    },

    // Description
    addDescription(state, action) {
      let { cardId, columnId, descriptionCard } = action.payload;

      state.columns[columnId].cards[cardId].description = descriptionCard;
      state.currentCard.description = descriptionCard;
    },
    editDescription(state, action) {
      let { cardId, columnId, currentDescription } = action.payload;

      state.columns[columnId].cards[cardId].description = currentDescription;
      state.currentCard.description = currentDescription;
    },
    removeDescription(state, action) {
      let { cardId, columnId } = action.payload;

      state.columns[columnId].cards[cardId].description = "";
      state.currentCard.description = "";
    },
    // Comments
    commentAdd(state, action) {
      let { cardId, columnId, data } = action.payload;

      state.currentCard.comments.push({
        id: state.columns[columnId].cards[cardId].comments.length,
        title: data.commentTitle,
      });
      state.columns[columnId].cards[cardId].comments.push({
        id: state.columns[columnId].cards[cardId].comments.length,
        title: data.commentTitle,
      });
    },
    commentEdit(state, action) {
      let { cardId, columnId, data, id } = action.payload;

      state.columns[columnId].cards[cardId].comments[id].title = data.comment;
      state.currentCard.comments[id].title = data.comment;
    },
    commentDelete(state, action) {
      let { id, columnId, cardId } = action.payload;

      state.currentCard.comments = state.currentCard.comments.filter(
        (com) => com.id !== id
      );
      state.currentCard.comments.forEach((com, index) => (com.id = index));

      state.columns[columnId].cards[cardId].comments = state.columns[
        columnId
      ].cards[cardId].comments.filter((com) => com.id !== id);
      state.columns[columnId].cards[cardId].comments.forEach(
        (comment, index) => (comment.id = index)
      );
    },
  },
});

export const {
  addColumn,
  editColumn,
  removeColumn,
  addCard,
  deleteCard,
  showData,
  editCard,
  addDescription,
  editDescription,
  removeDescription,
  commentAdd,
  commentEdit,
  commentDelete,
} = addColumnSlice.actions;

export default addColumnSlice.reducer;
