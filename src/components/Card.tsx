import React, { useState } from "react";
import { card } from "../types/types";
import styled from "styled-components";

const Card: React.FC<card> = ({
  cards,
  id,
  setCurrentCardId,
  setCurrentColumnId,
  setShowPopup,
  setCardColumnName,
  setCards,
  deleteDescription,
  data,
  endEditColumn,
  cardsMas,
  editElem,
  removeColumn,
}) => {
  const showCardData = (
    e: React.SyntheticEvent<HTMLElement>,
    id: number | undefined,
    cardId: number | undefined
  ) => {
    setCard(e.currentTarget.innerText);
    id !== undefined && setCardColumnName(data[id].name);
    setCurrentCardId(cardId);
    setShowPopup(true);
    setCurrentColumnId(id);
  };

  const addCard = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    cards.length < 1
      ? cardsMas.push(cardInitialValue)
      : cardsMas.push(...cards, cardInitialValue);

    cardsMas.forEach(
      (
        elem: {
          name: string | undefined;
          cardId: number | undefined;
          columnId: number | undefined;
        },
        index: number
      ) => (elem.cardId = index)
    );

    setCards(cardsMas);
    localStorage.setItem("cards", JSON.stringify(cardsMas));

    e.currentTarget.value = "";
  };

  // For card
  const [cardInitialValue, setCardInitialValue] = useState<{
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
  });

  const deleteCard = (id: number | null | undefined) => {
    const updatedCards = cards.filter((elem) =>
      elem.cardId !== id ? elem : false
    );

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    deleteDescription(id);
  };

  const [card, setCard] = useState("");
  return (
    <>
      {cards !== null
        ? cards.map((cardName, index: number) =>
            cardName.columnId === id ? (
              <CardWrapper key={index}>
                <CardName onClick={(e) => showCardData(e, id, cardName.cardId)}>
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
    </>
  );
};

export default Card;

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

const RemoveColumn = styled.p`
  min-width: 100%;
  background: transparent;

  cursor: pointer;

  display: flex;
  justify-content: right;
  align-items: flex-end;

  flex: 1;
`;
