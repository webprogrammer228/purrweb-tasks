import React, { useState } from "react";
import styled from "styled-components";
import { CardType, ColumnType, CommentType } from "../types/type";
import Column from "./Column";

export type TypeProps = {
  name: string | null;
  columns: ColumnType[];
  cards: CardType[];
  description: string;
  comments: CommentType[];

  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
};

const Board: React.FC<TypeProps> = ({
  name,
  columns,
  setColumns,
  setCards,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  const [addValue, setAddValue] = useState(String(""));
  const addNewColumn = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let lastElem: number | false = 0;
    columns.forEach(
      (elem) => (lastElem = elem.id === columns.length - 1 ? elem.id : false)
    );
    let newColumn = { id: lastElem + 1, title: addValue, cards: [] };

    let updatedMas: ColumnType[] = [];
    updatedMas.push(...columns, newColumn);

    setColumns(updatedMas);
    localStorage.setItem("columns", JSON.stringify(updatedMas));
    setColumns(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.value = "";
  };
  const endEditColumn = (e: React.SyntheticEvent) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;
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

  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <BoardBlock>
          <Form>
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.cards}
                name={name}
                columns={columns}
                setColumns={setColumns}
                setCards={setCards}
                description={description}
                setDescription={setDescription}
                comments={comments}
                setComments={setComments}
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
              defaultValue={""}
              placeholder="Введите название колонки"
              onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddValue(e.currentTarget.value)
              }
              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.currentTarget.value
              }
              onKeyDown={(e) =>
                e.key === "Enter" && e.currentTarget.value !== ""
                  ? addNewColumn(e)
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
