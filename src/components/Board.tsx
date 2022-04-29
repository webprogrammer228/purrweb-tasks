import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ColumnType } from "../types/type";
import Column from "./Column";

import { addColumn } from "../store/addColumnsSlice";

export const endEditColumn = (e: React.SyntheticEvent) => {
  e.currentTarget.previousElementSibling?.classList.remove("active");
};

type BoardProps = {
  name: string | null;
  columns: ColumnType[];
};

let selectedItem: HTMLElement;
let nextElem: HTMLInputElement;
export const editElem = (h3: HTMLElement) => {
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

const Board: React.FC<BoardProps> = ({ name, columns }) => {
  const dispatch = useDispatch();

  const [columnTitle, setColumnTitle] = useState(String(""));

  const colAdd = () => dispatch(addColumn({ columnTitle }));

  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <BoardBlock>
          <Form onSubmit={(e) => e.preventDefault()}>
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.cards}
                name={name}
              />
            ))}
          </Form>
          <AddNewCol>
            <HeaderCol
              onClick={(e: React.SyntheticEvent) => {
                let target = e.target;

                if ((target as HTMLElement).tagName !== "H3") return;
                editElem(target as HTMLElement);
              }}
            >
              + Добавить колонку
            </HeaderCol>
            <ColEdit
              value={columnTitle}
              placeholder="Введите название колонки"
              onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setColumnTitle(e.currentTarget.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && e.currentTarget.value !== ""
                  ? colAdd() && setColumnTitle("")
                  : false
              }
            />
          </AddNewCol>
        </BoardBlock>
      </Content>
    </>
  );
};

export default Board;

const BoardBlock = styled.div`
  display: flex;
  margin: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background: lightblue;
  font-size: 20px;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
`;

const AddNewCol = styled.div`
  min-width: 264px;
  height: 42px;

  margin-right: 20px;
  padding: 10px;

  background-color: rgba(235, 236, 240, 0.3);
  color: black;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.5s;
  border-radius: 10px;

  &:hover {
    background-color: rgba(89, 89, 89, 0.5);
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
