import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { commentDelete, commentEdit } from "../../store/addColumnsSlice";
import { Form } from "../Board/Board";
import { editElem, endEditColumn } from "../../utils";

type CommentEditt = {
  comment: string;
};

type CommentEditProps = {
  id: number;
  title: string;
  columnId: number;
  cardId: number;
};

const CommentEdit: React.FC<CommentEditProps> = ({
  id,
  title,
  columnId,
  cardId,
}) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm<CommentEditt>();
  const editCommentSubmit: SubmitHandler<CommentEditt> = (data) => {
    dispatch(commentEdit({ columnId, cardId, data, id }));
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(editCommentSubmit)}>
        <CommentWrapper>
          <Comment
            onClick={(e: React.SyntheticEvent) => {
              let target = e.target;

              if ((target as HTMLElement).tagName !== "H3") return;
              editElem(target as HTMLElement);
            }}
          >
            <>{title}</>
            <CommentCross
              onClick={() => dispatch(commentDelete({ id, cardId, columnId }))}
            >
              X
            </CommentCross>
          </Comment>
          <ColEdit
            defaultValue={title}
            {...register("comment")}
            onKeyDown={(e) => (e.key === "Enter" ? endEditColumn(e) : false)}
            onBlur={(e) => endEditColumn(e)}
          />
        </CommentWrapper>
      </Form>
    </>
  );
};

export default CommentEdit;

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

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;
