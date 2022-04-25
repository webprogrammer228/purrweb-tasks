import React, { useState, useEffect } from "react";
import styled from "styled-components";

type column = {
  data: { id: number; name: string }[];
  cards: {
    name?: string;
    cardId?: number;
    columnId?: number;
  }[];

  name: string | number | null;
  description: {
    name?: string;
    cardId?: number | undefined | null;
    columnId?: number | null | undefined;
  }[];

  comments: {
    name?: string;
    cardId?: number | undefined | null;
    columnId?: number | null | undefined;
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
        name?: string;
        cardId?: number;
        columnId?: number;
      }[]
    >
  >;

  setDescription: React.Dispatch<
    React.SetStateAction<
      {
        name?: string;
        cardId?: number | undefined | null;
        columnId?: number | null | undefined;
      }[]
    >
  >;

  setComments: React.Dispatch<
    React.SetStateAction<
      {
        name?: string;
        cardId?: number | undefined | null;
        columnId?: number | null | undefined;
        commentId?: number | null | undefined;
      }[]
    >
  >;
};

const Column: React.FC<column> = ({
  data,
  setData,
  name,
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

  // For card
  const [cardInitialValue, setCardInitialValue] = useState<{
    name: string;
    cardId: number;
    columnId?: number;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
  });

  // For description
  const [descriptionInitialValue, setDescriptionInitialValue] = useState<{
    name: string | undefined;
    cardId: number | null | undefined;
    columnId?: number | null | undefined;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
  });

  // For comments
  const [commentsInitialValue, setCommentsInitialValue] = useState<{
    name: string | undefined;
    cardId: number | null | undefined;
    columnId?: number | null | undefined;
    commentId?: number | null | undefined;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
    commentId: 0,
  });

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

  let cardsMas: { name?: string; cardId?: number; columnId?: number }[] = [];
  let descriptionMas: {
    name?: string;
    cardId?: number | null | undefined;
    columnId?: number | null | undefined;
  }[] = [];
  let commentsMas: {
    name?: string;
    cardId?: number | null | undefined;
    columnId?: number | null | undefined;
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
    let CardsMas: { name: string; cardId: number; columnId: number }[] = [];
    cardsFromStorage.forEach(
      (elem: { name: string; cardId: number; columnId: number }) => {
        CardsMas.push(elem);
      }
    );

    CardsMas.map((elem) =>
      elem.cardId === currentCardId ? (elem.name = card) : false
    );

    CardsMas.map((elem: { name: string; cardId: number; columnId: number }) =>
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

  const editDescriptionName = (
    e: React.SyntheticEvent,
    id: number | null | undefined,
    descriptionInitialState: {
      cardId: number | null | undefined;
      name: string | null | undefined;
      columnId?: number | null | undefined;
    }
  ) => {
    description.map((elem) =>
      elem.cardId === id ? Object.assign(elem, descriptionInitialState) : false
    );

    setDescription(description);

    localStorage.setItem("description", JSON.stringify(description));
    setDescription(JSON.parse(localStorage.getItem("description")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const editCommentName = (
    e: React.SyntheticEvent,
    id: number | null | undefined,
    commentsInitialValue: {
      cardId: number | null | undefined;
      name: string | null | undefined;
      columnId?: number | null | undefined;
    }
  ) => {
    comments.map((elem) =>
      elem.commentId === id ? Object.assign(elem, commentsInitialValue) : false
    );

    setComments(comments);

    localStorage.setItem("comments", JSON.stringify(comments));
    setComments(JSON.parse(localStorage.getItem("comments")!));

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

  const addCard = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    cards.length < 1
      ? cardsMas.push(cardInitialValue)
      : cardsMas.push(...cards, cardInitialValue);

    cardsMas.forEach(
      (
        elem: {
          name?: string | undefined;
          cardId?: number | undefined;
          columnId?: number | undefined;
        },
        index: number
      ) => (elem.cardId = index)
    );

    setCards(cardsMas);
    localStorage.setItem("cards", JSON.stringify(cardsMas));

    e.currentTarget.value = "";
  };

  const addDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    description.length === 0
      ? descriptionMas.push(descriptionInitialValue)
      : descriptionMas.push(...description, descriptionInitialValue);

    setDescription(descriptionMas);

    localStorage.setItem("description", JSON.stringify(descriptionMas));
    e.currentTarget.classList.add("hidden");
    e.currentTarget.value = "";
  };

  const addComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    comments.length === 0
      ? commentsMas.push(commentsInitialValue)
      : commentsMas.push(...comments, commentsInitialValue);

    commentsMas.forEach((elem, index: number) => (elem.commentId = index));
    setComments(commentsMas);

    localStorage.setItem("comments", JSON.stringify(commentsMas));
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
        ? elem.columnId-- && (elem.cardId = description.length + 1)
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

  const deleteCard = (id: number | null | undefined) => {
    const updatedCards = cards.filter((elem) =>
      elem.cardId !== id ? elem : false
    );

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    deleteDescription(id);
  };

  const deleteDescription = (id: number | null | undefined) => {
    const updatedDescription = description.filter((elem) =>
      elem.cardId !== id ? elem : false
    );

    setDescription(updatedDescription);
    localStorage.setItem("description", JSON.stringify(updatedDescription));
  };

  const deleteComment = (id: number | null | undefined) => {
    const updatedComments = comments.filter((elem) =>
      elem.commentId !== id ? elem : false
    );

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const showPopupOnEsc = () => {
    setShowPopup(false);
  };

  const showCardData = (
    e: React.SyntheticEvent<HTMLElement>,
    id?: number,
    cardId?: number
  ) => {
    setCard(e.currentTarget.innerText);
    id !== undefined && setCardColumnName(data[id].name);
    setCurrentCardId(cardId);
    setShowPopup(true);
    setCurrentColumnId(id);
  };

  return (
    <Board>
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
              <Header>{column.name}</Header>
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
              {/* Название тела карточки */}
              {cards !== null
                ? cards.map((cardName, index: number) =>
                    cardName.columnId === id ? (
                      <CardWrapper key={index}>
                        <CardName
                          onClick={(e) => showCardData(e, id, cardName.cardId)}
                        >
                          {cardName.name}
                        </CardName>
                        <CardDelete onClick={() => deleteCard(cardName.cardId)}>
                          X
                        </CardDelete>
                      </CardWrapper>
                    ) : (
                      ""
                    )
                  )
                : false}
              {/* Заголовок добавления карточки */}
              <AddCardHeader
                onClick={(e: React.SyntheticEvent) => {
                  let target = e.target;

                  if ((target as HTMLElement).tagName !== "H4") return;
                  editElem(target as HTMLElement);
                }}
              >
                + Добавить карточку
              </AddCardHeader>
              {/* Текст карточки */}
              <AddCardTextArea
                onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCardInitialValue({
                    name: e.currentTarget.value,
                    cardId: 0,
                    columnId: id,
                  })
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && e.currentTarget.value.trim() !== ""
                    ? addCard(e)
                    : false
                }
              />

              {/* Заголовок удаления колонки */}
              <RemoveColumn onClick={() => removeColumn(id)}>
                Удалить колонку
              </RemoveColumn>
            </Col>
          </React.Fragment>
        ))}
      </Form>

      {/* POPUP */}
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
              <CardDescriptionHeader>Описание карточки:</CardDescriptionHeader>

              {description.map((elem) =>
                elem.cardId === currentCardId ? (
                  <React.Fragment key={elem.cardId}>
                    <CardDescriptionName
                      key={elem.cardId}
                      onClick={(e: React.SyntheticEvent) => {
                        let target = e.target;

                        if ((target as HTMLElement).tagName !== "H3") return;
                        editElem(target as HTMLElement);
                      }}
                    >
                      {elem.name}
                    </CardDescriptionName>

                    <ColEdit
                      defaultValue={elem.name}
                      onFocus={(e) =>
                        setDescriptionInitialValue({
                          cardId: elem.cardId,
                          name:
                            e.currentTarget.value === ""
                              ? elem.name
                              : e.currentTarget.value,
                          columnId: currentColumnId,
                        })
                      }
                      onChange={(e) =>
                        setDescriptionInitialValue({
                          cardId: elem.cardId,
                          name:
                            e.currentTarget.value === ""
                              ? elem.name
                              : e.currentTarget.value,
                          columnId: currentColumnId,
                        })
                      }
                      onBlur={(e) =>
                        editDescriptionName(
                          e,
                          currentCardId,
                          descriptionInitialValue
                        )
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter"
                          ? editDescriptionName(
                              e,
                              currentCardId,
                              descriptionInitialValue
                            )
                          : false
                      }
                    />
                    <CardDeleteDescription
                      onClick={() => deleteDescription(currentCardId)}
                    >
                      Удалить описание
                    </CardDeleteDescription>
                  </React.Fragment>
                ) : (
                  false
                )
              )}

              <CardDescriptionTextarea
                placeholder="Введите описание карточки"
                onChange={(e) =>
                  e.currentTarget.value.trim() !== ""
                    ? setDescriptionInitialValue({
                        name: e.currentTarget.value,
                        cardId: currentCardId,
                        columnId: currentColumnId,
                      })
                    : false
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && e.currentTarget.value !== ""
                    ? addDescription(e)
                    : false
                }
              ></CardDescriptionTextarea>
              <CommentHeader>Комментарии:</CommentHeader>
              <CommetTextArea
                placeholder="Напишите комментарий..."
                onChange={(e) =>
                  e.currentTarget.value.trim() !== ""
                    ? setCommentsInitialValue({
                        name: e.currentTarget.value,
                        cardId: currentCardId,
                        columnId: currentColumnId,
                      })
                    : false
                }
                onKeyDown={(e) =>
                  e.key === "Enter" && e.currentTarget.value !== ""
                    ? addComment(e)
                    : false
                }
              ></CommetTextArea>
              {comments !== null &&
                comments.map((comment, index) =>
                  comment.cardId === currentCardId ? (
                    <CommentWrapper key={index}>
                      <Comment
                        onClick={(e: React.SyntheticEvent) => {
                          let target = e.target;

                          if ((target as HTMLElement).tagName !== "H3") return;
                          editElem(target as HTMLElement);
                        }}
                      >
                        {comment.name}
                        <CommentCross onClick={() => deleteComment(index)}>
                          X
                        </CommentCross>
                      </Comment>
                      <ColEdit
                        defaultValue={comment.name}
                        onFocus={(e) =>
                          setCommentsInitialValue({
                            cardId: currentCardId,
                            name:
                              e.currentTarget.value === ""
                                ? comment.name
                                : e.currentTarget.value,
                            columnId: currentCardId,
                          })
                        }
                        onChange={(e) =>
                          setCommentsInitialValue({
                            cardId: currentCardId,
                            name:
                              e.currentTarget.value === ""
                                ? comment.name
                                : e.currentTarget.value,
                            columnId: currentCardId,
                          })
                        }
                        onBlur={(e) =>
                          editCommentName(e, index, commentsInitialValue)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter"
                            ? editCommentName(e, index, commentsInitialValue)
                            : false
                        }
                      />
                    </CommentWrapper>
                  ) : (
                    false
                  )
                )}
              <CardPopupAuthor>Автор карточки: {name}</CardPopupAuthor>
            </CardPopupContent>
          </CardPopup>
        </CardPopupWrapper>
      ) : (
        false
      )}

      {/* END POPUP */}
      <AddNewCol>
        <Header
          onClick={(e: React.SyntheticEvent) => {
            let target = e.target;

            if ((target as HTMLElement).tagName !== "H3") return;
            editElem(target as HTMLElement);
          }}
        >
          + Добавить колонку
        </Header>
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
    </Board>
  );
};

export default Column;

const Board = styled.div`
  display: flex;
  margin: 0 20px;
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

const Header = styled.h3`
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

const RemoveColumn = styled.p`
  min-width: 100%;
  background: transparent;

  cursor: pointer;

  display: flex;
  justify-content: right;
  align-items: flex-end;

  flex: 1;
`;

const AddCardHeader = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.5s;

  &:hover {
    background: lightgray;
    color: black;
  }

  &.active {
    display: none;
  }

  &.active + textarea {
    display: block;
  }

  cursor: pointer;
`;

const AddCardTextArea = styled.textarea`
  width: 100%;
  display: none;

  margin-bottom: 25px;
`;

const CardName = styled.h5`
  display: flex;
  background: white;

  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;

  transition: all 0.5s;

  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }

  &:hover + h4 {
    display: block;
  }

  flex: 1;
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
const CardWrapper = styled.div`
  display: flex;
  position: relative;
`;
const CardDelete = styled.h4`
  position: absolute;
  padding: 10px;
  right: 0;

  cursor: pointer;
  display: none;

  &:hover {
    display: block;
  }
`;

const CardDescriptionHeader = styled.h3`
  margin-bottom: 10px;
`;
const CardDescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;

  font-size: 20px;

  &.hidden {
    display: none;
  }
`;
const CardDescriptionName = styled.h3`
  & ~ textarea {
    display: none;
  }

  &.active {
    display: none;
  }

  &.active ~ input {
    display: block;
  }
`;

const CardDeleteDescription = styled.button`
  width: 250px;

  border: 0;
  border-radius: 10px;

  background: lightblue;
  color: black;
  outline: 0;
  margin: 10px 0;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    background: darkblue;
    color: white;
  }
`;

const CommentHeader = styled.h3`
  & ~ textarea {
    display: block;
  }
`;
const CommetTextArea = styled.textarea`
  width: 90%;
  min-height: 50px;
  margin-top: 10px;

  padding: 15px;
  background: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  font-size: 18px;

  margin-bottom: 25px;
`;
const CommentWrapper = styled.div`
  width: 90%;
  min-height: 50px;
  margin-top: 10px;

  padding: 15px;
  background: white;
  border-radius: 10px;
  border: 1px solid lightgray;
`;
const Comment = styled.h3`
  &.active {
    display: none;
  }

  &.active ~ input {
    display: block;
  }
`;

const CommentCross = styled.p`
  position: relative;

  float: right;

  cursor: pointer;
`;
