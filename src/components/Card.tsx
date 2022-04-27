import React from "react";
import styled from "styled-components";
import { CardType, ColumnType, CommentType } from "../types/type";

type CardProps = {
  name: string | null;
  description: string;
  comments: CommentType[];
  cards: CardType[];
  columns: ColumnType[];

  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;

  id: number;
  title: string;
};

const Card: React.FC<CardProps> = ({
  name,
  title,
  columns,
  comments,
  setComments,
  description,
  setDescription,
  cards,
  setCards,
  id,
}) => {
  const deleteCard = (id: number) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);

    //localStorage.setItem("columns", JSON.stringify(columns));
  };

  return (
    <>
      <CardWrapper>
        <CardName
        //onClick={(e) => showCardData(e, id, cardName.cardId)}
        >
          {title}
        </CardName>
        <CardDelete onClick={() => deleteCard(id)}>X</CardDelete>
      </CardWrapper>
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
