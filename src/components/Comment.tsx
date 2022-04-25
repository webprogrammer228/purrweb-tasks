import React, { useState } from "react";
import { comments } from "../types/types";
import styled from "styled-components";

const Comments: React.FC<comments> = ({
  comments,
  setComments,
  currentCardId,
  currentColumnId,
  commentsMas,
  editElem,
}) => {
  // For comments
  const [commentsInitialValue, setCommentsInitialValue] = useState<{
    name: string | undefined;
    cardId: number | null | undefined;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
    commentId: 0,
  });

  const addComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    comments.length === 0
      ? commentsMas.push(commentsInitialValue)
      : commentsMas.push(...comments, commentsInitialValue);

    commentsMas.forEach((elem, index: number) => (elem.commentId = index));
    setComments(commentsMas);

    localStorage.setItem("comments", JSON.stringify(commentsMas));
    e.currentTarget.value = "";
  };

  const deleteComment = (id: number | null | undefined) => {
    const updatedComments = comments.filter((elem) =>
      elem.commentId !== id ? elem : false
    );

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const editCommentName = (
    e: React.SyntheticEvent,
    id: number | null | undefined,
    commentsInitialValue: {
      name: string | undefined;
      cardId: number | undefined | null;
      columnId: number | null | undefined;
      commentId?: number | null | undefined;
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

  return (
    <>
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
                    columnId: currentColumnId,
                  })
                }
                onChange={(e) =>
                  setCommentsInitialValue({
                    cardId: currentCardId,
                    name:
                      e.currentTarget.value === ""
                        ? comment.name
                        : e.currentTarget.value,
                    columnId: currentColumnId,
                  })
                }
                onBlur={(e) => editCommentName(e, index, commentsInitialValue)}
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
