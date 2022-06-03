import React from "react";
import styled from "styled-components";
import { cardsInfo } from "../constants/constants";
import Card from "./Card";

const Cards: React.FC = () => {
  return (
    <CardWrapper>
      {cardsInfo.map((cardInfo, id) => (
        <Card key={id} cardInfo={cardInfo} id={id} />
      ))}
    </CardWrapper>
  );
};

export default Cards;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
`;
