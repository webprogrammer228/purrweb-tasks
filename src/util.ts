//const editColumnName = (
//  e: React.SyntheticEvent,
//  id: number,
//  initialState: { id: number; title: string }
//) => {
//  columns.map((elem) =>
//    elem.id === id ? Object.assign(elem, initialState) : false
//  );

//  setColumns(columns);

//  localStorage.setItem("columns", JSON.stringify(columns));
//  setColumns(JSON.parse(localStorage.getItem("columns")!));

//  e.currentTarget.previousElementSibling?.classList.remove("active");
//};

//const endEditColumn = (e: React.SyntheticEvent) => {
//  e.currentTarget.previousElementSibling?.classList.remove("active");
//};

//const removeColumn = (id: number) => {
//  const updatedColumns = columns.filter((elem) =>
//    elem.id !== id ? elem : false
//  );

//  //const updatedCards = cards.filter((elem) =>
//  //  elem.columnId !== id ? elem : false
//  //);

//  //const updatedDescription = description.filter((elem) =>
//  //  elem.columnId !== id ? elem : false
//  //);

//  //const updatedComments = comments.filter((elem) =>
//  //  elem.columnId !== id ? elem : false
//  //);

//  updatedColumns.map((elem, index) =>
//    elem.id !== index ? (elem.id = index) : false
//  );

//  //updatedCards.map((elem) =>
//  //  elem.columnId !== id &&
//  //  elem.columnId !== undefined &&
//  //  elem.columnId !== 0 &&
//  //  elem.columnId >= id
//  //    ? elem.columnId--
//  //    : false
//  //);

//  //updatedDescription.map((elem) =>
//  //  elem.columnId !== null &&
//  //  elem.columnId !== id &&
//  //  elem.columnId !== undefined &&
//  //  elem.columnId !== 0 &&
//  //  elem.columnId >= id
//  //    ? elem.columnId--
//  //    : false
//  //);

//  //updatedComments.map((elem) =>
//  //  elem.columnId !== null &&
//  //  elem.columnId !== id &&
//  //  elem.columnId !== undefined &&
//  //  elem.columnId !== 0 &&
//  //  elem.columnId >= id
//  //    ? elem.columnId--
//  //    : false
//  //);

//  setColumns(updatedColumns);
//  localStorage.setItem("columns", JSON.stringify(updatedColumns));

//  //setCards(updatedCards);
//  //localStorage.setItem("cards", JSON.stringify(updatedCards));

//  //setDescription(updatedDescription);

//  //localStorage.setItem("description", JSON.stringify(updatedDescription));

//  //setComments(updatedComments);
//  //localStorage.setItem("comments", JSON.stringify(updatedComments));
//};

//const addCard = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//  cards.push(cardInitialValue);
//  setCards(cards);

//  localStorage.setItem("columns", JSON.stringify(columns));

//  e.currentTarget.value = "";
//};
export const util = () => {
  console.log(util);
};
