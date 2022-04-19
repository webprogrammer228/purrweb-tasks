import React from "react";
import styled from "styled-components";
import Column from "./Column";

type Name = {
  name: string | number;
  data: { id: number; name: string }[];
};

const Board: React.FC<Name> = ({ name, data }) => {
  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <Column data={data} />
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
