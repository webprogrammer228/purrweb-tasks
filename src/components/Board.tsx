import React from "react";
import styled from "styled-components";
import {
  CardType,
  ColumnType,
  CommentType,
  DescriptionType,
} from "../types/type";
import Column from "./Column";

export type TypeProps = {
  name: string | number | null;
  columns: ColumnType[];
  cards: CardType[];
  description: DescriptionType[];
  comments: CommentType[];

  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  setDescription: React.Dispatch<React.SetStateAction<ColumnType[]>>;
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
