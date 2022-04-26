import React, { useState } from "react";
import styled from "styled-components";
import { CommentType } from "../types/type";
import { TypeProps } from "./Board";

type ColumnProps = {
  id: number;
  title: string;
};

const Column: React.FC<TypeProps & ColumnProps> = ({
  id,
  title,
  name,
  cards,
  setCards,
  columns,
  setColumns,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;

  const [initialState, setInitialState] = useState<CommentType>({
    id: 0,
    title: "",
  });

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

  const editColumnName = (
    e: React.SyntheticEvent,
    id: number,
    initialState: { id: number; title: string }
  ) => {
    columns.map((elem) =>
      elem.id === id ? Object.assign(elem, initialState) : false
    );

    setColumns(columns);

    localStorage.setItem("columns", JSON.stringify(columns));
    setColumns(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  console.log(title);

  return (
    <ColumnBody>
      <Col
        onClick={(e: React.SyntheticEvent) => {
          let target = e.target;

          if ((target as HTMLElement).tagName !== "H3") return;
          editElem(target as HTMLElement);
        }}
      >
        <HeaderCol>{title}</HeaderCol>
        <ColEdit
          defaultValue={title}
          onFocus={(e) =>
            setInitialState({
              id: id,
              title:
                e.currentTarget.value === "" ? title : e.currentTarget.value,
            })
          }
          onChange={(e) =>
            setInitialState({
              id: id,
              title:
                e.currentTarget.value === "" ? title : e.currentTarget.value,
            })
          }
          onBlur={(e) => editColumnName(e, id, initialState)}
          onKeyDown={(e) =>
            e.key === "Enter" ? editColumnName(e, id, initialState) : false
          }
        />
      </Col>
    </ColumnBody>
  );
};

export default Column;

const ColumnBody = styled.div``;

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

const HeaderCol = styled.h3`
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
