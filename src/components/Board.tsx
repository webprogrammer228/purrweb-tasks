import React from "react";
import styled from "styled-components";

import Column from "./Column";

type Name = {
  name: string | number | null;
  columns: { id: number; name: string }[];
  cards: {
    name: string | undefined;
    cardId: number | undefined;
    columnId: number | undefined;
  }[];
  description: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
  }[];
  comments: {
    name: string | undefined;
    cardId: number | undefined | null;
    columnId: number | null | undefined;
    commentId?: number | null | undefined;
  }[];

  setColumns: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
  setCards: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined;
        columnId: number | undefined;
      }[]
    >
  >;
  setDescription: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined | null;
        columnId: number | null | undefined;
      }[]
    >
  >;

  setComments: React.Dispatch<
    React.SetStateAction<
      {
        name: string | undefined;
        cardId: number | undefined | null;
        columnId: number | null | undefined;
        commentId?: number | null | undefined;
      }[]
    >
  >;
};

const Board: React.FC<Name> = ({
  name,
  columns,
  setColumns,
  cards,
  setCards,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  console.log("1");
  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <BoardBlock>
          <Form>
            {columns?.map((column: { name: string }, id: number) => (
              <Column
                key={id}
                column={column}
                setColumns={setColumns}
                cards={cards}
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
