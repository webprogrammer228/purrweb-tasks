import React from "react";
import styled from "styled-components";
import Column from "./Column";

type Name = {
  name: string | number | null;
  data: { id: number; name: string }[];
  cards: {
    name?: string;
    cardId?: number;
    columnId?: number;
  }[];
  description: {
    name?: string;
    cardId?: number | undefined | null;
    columnId?: number | null | undefined;
  }[];
  comments: {
    name?: string;
    cardId?: number | undefined | null;
    columnId?: number | null | undefined;
    commentId?: number | null | undefined;
  }[];

  setData: React.Dispatch<
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
        name?: string;
        cardId?: number;
        columnId?: number;
      }[]
    >
  >;
  setDescription: React.Dispatch<
    React.SetStateAction<
      {
        name?: string;
        cardId?: number | undefined | null;
        columnId?: number | null | undefined;
      }[]
    >
  >;

  setComments: React.Dispatch<
    React.SetStateAction<
      {
        name?: string;
        cardId?: number | undefined | null;
        columnId?: number | null | undefined;
        commentId?: number | null | undefined;
      }[]
    >
  >;
};

const Board: React.FC<Name> = ({
  name,
  data,
  setData,
  cards,
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
        <Column
          data={data}
          setData={setData}
          name={name}
          cards={cards}
          setCards={setCards}
          description={description}
          setDescription={setDescription}
          comments={comments}
          setComments={setComments}
        />
      </Content>
    </>
  );
};

export default Board;

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
