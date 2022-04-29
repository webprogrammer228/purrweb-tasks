import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { editCard } from "../store/addColumnsSlice";
import { editElem } from "./Board";
//import showData from "../store/addColumnsSlice";
//import Comments from './Comment';
import Description from "./Description";
type Cards = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  columnTitle: string;
  name: string | null;
};

export type CurrentCard = {
  cardId: number;
  columnId: number;
  title: string;
  description: string;
};

const CardDetails: React.FC<Cards> = ({ setShowPopup, columnTitle, name }) => {
  const currentCard = useSelector<RootState, CurrentCard>(
    (state) => state.columns.currentCard
  );

  const dispatch = useDispatch();
  function redactCard(e: React.SyntheticEvent<HTMLInputElement>) {
    dispatch(editCard({ currentCard, cardName }));
    endEditCard(e);
  }

  const [cardName, setCardName] = useState(String(""));

  const endEditCard = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  return (
    <>
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
              {currentCard.title}
            </CardNamePopup>
            <ColEdit
              defaultValue={currentCard.title}
              onBlur={(e: React.SyntheticEvent<HTMLInputElement>) =>
                redactCard(e)
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCardName(e.currentTarget.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && e.currentTarget.value !== ""
                  ? redactCard(e)
                  : false
              }
            />

            <ColumnDetailsPopup>
              <CardColumnPopupSpan>в колонке </CardColumnPopupSpan>
              <CardColumnPopup>{columnTitle}</CardColumnPopup>
            </ColumnDetailsPopup>
            <CardDescriptionHeader>Описание карточки:</CardDescriptionHeader>

            <Description />

            <CommentHeader>Комментарии:</CommentHeader>
            {/*<Comments
                comments={comments}
                setComments={setComments}
                currentCardId={currentCardId}
                currentColumnId={currentColumnId}
                commentsMas={commentsMas}
                editElem={editElem}
              />*/}

            <CardPopupAuthor>Автор карточки: {name} </CardPopupAuthor>
          </CardPopupContent>
        </CardPopup>
      </CardPopupWrapper>
    </>
  );
};

export default CardDetails;

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

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;
