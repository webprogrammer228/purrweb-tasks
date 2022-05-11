import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { editCard } from "../../store/addColumnsSlice";
import { CommentType } from "../../types/type";
import { Form, Warning } from "../Board/Board";
import { editElem } from "../../utils";
import { ColumnSubmit } from "../Column/Column";
import Comments from "./Comment/Comment";
import Description from "./Description/Description";
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
  comments: Array<CommentType>;
};

const CardDetails: React.FC<Cards> = ({ setShowPopup, columnTitle, name }) => {
  const currentCard = useSelector<RootState, CurrentCard>(
    (state) => state.columns.currentCard
  );

  let { cardId, columnId } = currentCard;

  const dispatch = useDispatch();

  const endEditCard = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const formRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnSubmit>();
  const onSubmit: SubmitHandler<ColumnSubmit> = (data) => {
    dispatch(editCard({ cardId, columnId, data }));
    formRef.current?.classList.remove("active");
    formRef.current?.children[0].classList.remove("active");
    reset();
  };

  return (
    <>
      <CardPopupWrapper>
        <CardPopup>
          <PopupCross onClick={() => setShowPopup(false)}>X</PopupCross>
          <CardPopupContent>
            <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
                {...register("cardTitle", { required: true })}
                defaultValue={currentCard.title}
                onBlur={(e: React.SyntheticEvent<HTMLInputElement>) =>
                  endEditCard(e)
                }
              />
              {errors.cardTitle && <Warning>This field is required</Warning>}
            </Form>
            <ColumnDetailsPopup>
              <CardColumnPopupSpan>в колонке </CardColumnPopupSpan>
              <CardColumnPopup>{columnTitle}</CardColumnPopup>
            </ColumnDetailsPopup>
            <CardDescriptionHeader>Описание карточки:</CardDescriptionHeader>

            <Description />

            <CommentHeader>Комментарии:</CommentHeader>
            <Comments />

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
