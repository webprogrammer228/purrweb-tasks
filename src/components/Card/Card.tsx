import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showData, deleteCard } from "../../store/addColumnsSlice";
import { CommentType } from "../../types/type";
import { endEditColumn } from "../../utils";

type CardProps = {
  cardId: number;
  columnId: number;
  title: string;
  description: string;
  comments: Array<CommentType>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const Card: React.FC<CardProps> = ({
  title,
  cardId,
  columnId,
  setShowPopup,
  description,
  comments,
}) => {
  const dispatch = useDispatch();
  const removeCard = () => dispatch(deleteCard({ cardId, columnId }));

  const addDataToCurrentCard = () =>
    dispatch(showData({ cardId, columnId, title, description, comments }));

  return (
    <>
      <CardWrapper>
        <CardName onClick={(e) => addDataToCurrentCard() && setShowPopup(true)}>
          {title}
        </CardName>
        <CardDelete onClick={(e) => removeCard() && endEditColumn(e)}>
          X
        </CardDelete>
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
