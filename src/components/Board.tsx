import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import Comments from "./Comment";
import Description from "./Description";

type Name = {
  name: string | number | null;
  data: { id: number; name: string }[];
  cards: {
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }[];
  description: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
  }[];
  comments: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }[];

  setData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
  setCards: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined;
        columnId: number | undefined;
      }[]
    >
  >;
  setDescription: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined | null;
        columnId: number | null | undefined;
      }[]
    >
  >;

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
};

const Board: React.FC<Name> = ({
  name,
  data,
  setData,
  cards,
  setCards,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  //For column
  const [initialState, setInitialState] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [addValue, setAddValue] = useState(String(""));

  // Hide popup on esc
  useEffect(() => {
    const keyDownHandler = (e: { key: string; preventDefault: () => void }) => {
      if (e.key === "Escape") {
        e.preventDefault();

        showPopupOnEsc();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [showPopup, setShowPopup] = useState(Boolean(false));

  let cardsMas: {
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }[] = [];
  let descriptionMas: {
    name: string | undefined;
    cardId: number | null | undefined;
    columnId: number | null | undefined;
  }[] = [];
  let commentsMas: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }[] = [];

  const [card, setCard] = useState("");
  const [cardColumnName, setCardColumnName] = useState("");

  const [currentCardId, setCurrentCardId] = useState<null | number | undefined>(
    0
  );
  const [currentColumnId, setCurrentColumnId] = useState<
    null | number | undefined
  >(0);

  const cardsFromStorage = JSON.parse(localStorage.getItem("cards")!);
  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;

  const editElem = (h3: HTMLElement) => {
    if (selectedItem) {
      selectedItem.classList.remove("active");
      nextElem.classList.remove("active");
    }
    selectedItem = h3;
    nextElem = h3 as HTMLInputElement;
    let focusedInput = nextElem.nextElementSibling as HTMLInputElement;

    selectedItem.classList.add("active");
    focusedInput?.focus();
  };

  const endEditColumn = (e: React.SyntheticEvent) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const endEditCard = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let CardsMas: {
      name: string | undefined;
      cardId: number | undefined;
      columnId: number | undefined;
    }[] = [];
    cardsFromStorage.forEach(
      (elem: {
        name: string | undefined;
        cardId: number | undefined;
        columnId: number | undefined;
      }) => {
        CardsMas.push(elem);
      }
    );

    CardsMas.map((elem) =>
      elem.cardId === currentCardId ? (elem.name = card) : false
    );

    CardsMas.map(
      (elem: {
        name: string | undefined;
        cardId: number | undefined;
        columnId: number | undefined;
      }) =>
        elem.cardId === currentCardId ? Object.assign(elem, cardsMas) : false
    );

    setCards(CardsMas);
    localStorage.setItem("cards", JSON.stringify(CardsMas));

    e.currentTarget.previousElementSibling?.classList.remove("active");
    e.currentTarget.value = "";
  };

  const editColumnName = (
    e: React.SyntheticEvent,
    id: number,
    initialState: { id: number; name: string }
  ) => {
    data.map((elem) =>
      elem.id === id ? Object.assign(elem, initialState) : false
    );

    setData(data);

    localStorage.setItem("columns", JSON.stringify(data));
    setData(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const addNewColumn = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let lastElem: number | false = 0;
    data.forEach(
      (elem) => (lastElem = elem.id === data.length - 1 ? elem.id : false)
    );
    let newColumn = { id: lastElem + 1, name: addValue };

    let updatedMas = [];
    updatedMas.push(...data, newColumn);

    setData(updatedMas);
    localStorage.setItem("columns", JSON.stringify(updatedMas));
    setData(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.value = "";
  };

  const removeColumn = (id: number) => {
    const updatedColumns = data.filter((elem) =>
      elem.id !== id ? elem : false
    );

    const updatedCards = cards.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    const updatedDescription = description.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    const updatedComments = comments.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    updatedColumns.map((elem, index) =>
      elem.id !== index ? (elem.id = index) : false
    );

    updatedCards.map((elem) =>
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    updatedDescription.map((elem) =>
      elem.columnId !== null &&
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    updatedComments.map((elem) =>
      elem.columnId !== null &&
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    setData(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    setDescription(updatedDescription);

    localStorage.setItem("description", JSON.stringify(updatedDescription));

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const deleteDescription = (id: number | null | undefined) => {
    const updatedDescription = description.filter((elem) =>
      elem.cardId !== id ? elem : false
    );

    setDescription(updatedDescription);
    localStorage.setItem("description", JSON.stringify(updatedDescription));
  };

  const showPopupOnEsc = () => {
    setShowPopup(false);
  };

  console.log("1")
  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <BoardBlock>
          <Form>
            {data?.map((column: { name: string }, id: number) => (
              <React.Fragment key={id}>
                <Col
                  onClick={(e: React.SyntheticEvent) => {
                    let target = e.target;

                    if ((target as HTMLElement).tagName !== "H3") return;
                    editElem(target as HTMLElement);
                  }}
                >
                  <HeaderCol>{column.name}</HeaderCol>
                  <ColEdit
                    key={column.name}
                    defaultValue={column.name}
                    onFocus={(e) =>
                      setInitialState({
                        id: id,
                        name:
                          e.currentTarget.value === ""
                            ? column.name
                            : e.currentTarget.value,
                      })
                    }
                    onChange={(e) =>
                      setInitialState({
                        id: id,
                        name:
                          e.currentTarget.value === ""
                            ? column.name
                            : e.currentTarget.value,
                      })
                    }
                    onBlur={(e) => editColumnName(e, id, initialState)}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? editColumnName(e, id, initialState)
                        : false
                    }
                  />

                  {/* Карточка */}

                  <Card
                    cards={cards}
                    setCards={setCards}
                    id={id}
                    data={data}
                    setCurrentCardId={setCurrentCardId}
                    setShowPopup={setShowPopup}
                    setCurrentColumnId={setCurrentColumnId}
                    setCardColumnName={setCardColumnName}
                    deleteDescription={deleteDescription}
                    cardsMas={cardsMas}
                    editElem={editElem}
                    endEditColumn={endEditColumn}
                    removeColumn={removeColumn}
                  />
                </Col>
              </React.Fragment>
            ))}
          </Form>
          {/*POPUP*/}
          {showPopup ? (
            <CardPopupWrapper>
              <CardPopup>
                <PopupCross onClick={() => setShowPopup(false)}>X</PopupCross>
                <CardPopupContent>
                  <CardNamePopup
                    onClick={(e: React.SyntheticEvent) => {
                      let target = e.target;

                      if ((target as HTMLElement).tagName !== "H3") return;
                      editElem(target as HTMLElement);
                    }}
                  >
                    {card}
                  </CardNamePopup>
                  <ColEdit
                    defaultValue={card}
                    onBlur={(e: React.SyntheticEvent<HTMLInputElement>) =>
                      endEditCard(e)
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCard(e.currentTarget.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && e.currentTarget.value !== ""
                        ? endEditCard(e)
                        : false
                    }
                  />
                  <ColumnDetailsPopup>
                    <CardColumnPopupSpan>в колонке</CardColumnPopupSpan>{" "}
                    <CardColumnPopup>{cardColumnName}</CardColumnPopup>
                  </ColumnDetailsPopup>
                  <CardDescriptionHeader>
                    Описание карточки:
                  </CardDescriptionHeader>

                  <Description
                    description={description}
                    setDescription={setDescription}
                    currentCardId={currentCardId}
                    currentColumnId={currentColumnId}
                    descriptionMas={descriptionMas}
                    editElem={editElem}
                    deleteDescription={deleteDescription}
                  />

                  <CommentHeader>Комментарии:</CommentHeader>
                  <Comments
                    comments={comments}
                    setComments={setComments}
                    currentCardId={currentCardId}
                    currentColumnId={currentColumnId}
                    commentsMas={commentsMas}
                    editElem={editElem}
                  />

                  <CardPopupAuthor>Автор карточки: {name}</CardPopupAuthor>
                </CardPopupContent>
              </CardPopup>
            </CardPopupWrapper>
          ) : (
            false
          )}
          {/* END POPUP */}
          <AddNewCol>
            <HeaderCol
              onClick={(e: React.SyntheticEvent) => {
                let target = e.target;

                if ((target as HTMLElement).tagName !== "H3") return;
                editElem(target as HTMLElement);
              }}
            >
              + Добавить колонку
            </HeaderCol>
            <ColEdit
              defaultValue={""}
              placeholder="Введите название колонки"
              onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddValue(e.currentTarget.value)
              }
              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.currentTarget.value
              }
              onKeyDown={(e) =>
                e.key === "Enter" && e.currentTarget.value !== ""
                  ? addNewColumn(e)
                  : false
              }
            />
          </AddNewCol>
          {/*<Column
          data={data}
          setData={setData}
          name={name}
          cards={cards}
          setCards={setCards}
          description={description}
          setDescription={setDescription}
          comments={comments}
          setComments={setComments}
        />*/}
        </BoardBlock>
      </Content>
    </>
  );
};

export default Board;

const BoardBlock = styled.div`
  display: flex;
  margin: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background: lightblue;
  font-size: 20px;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
`;

const Col = styled.div`
  width: 272px;
  min-height: 75px;
  background-color: #ebecf0;
  padding: 10px;

  margin-right: 30px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const HeaderCol = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;

  &.active {
    display: none;
  }

  &.active + input {
    display: block;
  }

  cursor: pointer;
`;

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;

const AddNewCol = styled.div`
  min-width: 264px;
  height: 42px;

  margin-right: 20px;
  padding: 10px;

  background-color: rgba(235, 236, 240, 0.3);
  color: black;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.5s;
  border-radius: 10px;

  &:hover {
    background-color: rgba(89, 89, 89, 0.5);
  }
`;

const CardPopupWrapper = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  min-height: 100%;
  display: flex;

  top: 0;
  left: 0;

  margin-bottom: 30px;
  z-index: 20;
`;

const CardPopup = styled.div`
  min-width: 650px;
  width: 50%;
  min-height: 70%;
  height: auto;

  margin: 48px auto 80px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border-radius: 20px;
  background: white;
`;

const PopupCross = styled.p`
  position: relative;
  top: 20px;
  right: 20px;
  float: right;

  cursor: pointer;
`;

const CardPopupContent = styled.div`
  margin: 20px;
`;

const CardNamePopup = styled.h3`
  margin-bottom: 10px;

  &.active {
    display: none;
  }

  &.active + input {
    display: block;
  }
`;

const ColumnDetailsPopup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const CardColumnPopupSpan = styled.span`
  font-size: 14px;
  text-decoration: none;
  margin-right: 10px;
`;
const CardColumnPopup = styled.p`
  border-bottom: 1px solid black;
`;
const CardPopupAuthor = styled.h2`
  margin-top: 40px;
  padding-bottom: 20px;
`;

const CardDescriptionHeader = styled.h3`
  margin-bottom: 10px;
`;

const CommentHeader = styled.h3`
  & ~ textarea {
    display: block;
  }
`;
