import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../store";
import { Form } from "../../Board/Board";
import { commentAdd } from "../../../store/addColumnsSlice";
import { CurrentCard } from "../CardDetails";
import CommentEdit from "../CommentEdit/CommentEdit";

type CommentInput = {
  commentTitle: string;
};

type CommentEditt = {
  comment: string;
};

const Comments: React.FC = () => {
  const currentCard = useSelector<RootState, CurrentCard>(
    (state) => state.columns.currentCard
  );

  const dispatch = useDispatch();
  let { comments, cardId, columnId } = currentCard;

  const { register, handleSubmit, reset } = useForm<
    CommentInput & CommentEditt
  >();
  const commentSubmit: SubmitHandler<CommentInput> = (data) => {
    dispatch(commentAdd({ columnId, cardId, data }));
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(commentSubmit)}>
        <CommetTextArea
          {...register("commentTitle")}
          placeholder="Напишите комментарий..."
        ></CommetTextArea>
        <SubmitInput type={"submit"} />
      </Form>

      {comments.map((comment) => (
        <CommentEdit
          key={comment.id}
          id={comment.id}
          title={comment.title}
          cardId={cardId}
          columnId={columnId}
        />
      ))}
    </>
  );
};

export default Comments;

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

const SubmitInput = styled.input`
  width: 200px;
  padding: 15px 0;
  border: 0;
  border-radius: 10px;
  background: lightblue;

  margin-bottom: 10px;

  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    background: darkblue;
    color: white;
  }
`;
