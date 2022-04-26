import React from 'react';
import styled from 'styled-components';
import Comments from './Comment';
import Description from './Description';

const CardDetails = () => {
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

  return (
      //POPUP
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

      </>
      {/* END POPUP */}
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