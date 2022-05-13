import React from "react";
import styled from "styled-components";
import { Check } from "./Check";
import { v4 as uuidv4 } from "uuid";
import { editElem } from "../../utils/utils";

const cardsInfo = [
  {
    price: 77,
    title: "Single site license",
    description:
      "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    benefits: [
      "Single site license",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
  {
    price: 117,
    title: "3 Site license",
    description:
      "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    benefits: [
      "All features for 3 sites",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
  {
    price: 167,
    title: "10 Site license",
    description:
      "Get the advanced WordPress plugin that optimizes content with GSC keywords at one low annual price",
    benefits: [
      "All features for 10 sites",
      "Special introductory pricing",
      "Unlimited Pages and Keywords",
      "Billed annually",
    ],
  },
];

const setActiveCard = (e: React.SyntheticEvent<HTMLDivElement>) => {
  let target = e.currentTarget;
  if (target.tagName !== "DIV") return;
  editElem(target);
};

const Card: React.FC = () => {
  return (
    <CardWrapper>
      {cardsInfo.map((cardInfo, id) => (
        <CardBody key={uuidv4()} onClick={(e) => setActiveCard(e)}>
          <CardBodyHeader>
            <CardPrice>${cardInfo.price}</CardPrice>
            <CardTitle>{cardInfo.title}</CardTitle>
            <CardDescription>{cardInfo.description}</CardDescription>
          </CardBodyHeader>
          <CardList>
            {cardInfo.benefits.map((benefit) => (
              <CardListItem key={uuidv4()}>
                <Check height="26px" width="26px" color="white" />
                {benefit}
              </CardListItem>
            ))}
          </CardList>
          <CardButton>Get Gscore</CardButton>
        </CardBody>
      ))}
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
`;

const CardBody = styled.div`
  background: #272727;

  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;

  min-height: 612px;
  max-width: 412px;

  padding: 42px 48px;
  margin: 27.5px 0 27.5px 33px;

  cursor: pointer;

  @media (max-width: 1280px) {
    padding: 21px 24px;
    width: 350px;
    min-height: 550px;
  }
`;

const CardBodyHeader = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const CardPrice = styled.h1`
  font-family: "DM Sans", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 66px;

  color: #ffffff;
  margin-bottom: 4px;

  @media (max-width: 1280px) {
    font-size: 50px;
    line-height: 62px;
  }
`;

const CardTitle = styled.h4`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;

  color: #ffffff;
  margin-bottom: 8px;

  @media (max-width: 1280px) {
    font-size: 22px;
    line-height: 24px;
  }
`;

const CardDescription = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  text-align: center;

  color: #c7c7c7;
  margin-bottom: 40px;

  @media (max-width: 1280px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const CardList = styled.ul`
  margin-top: 38px;
  list-style-type: none;
`;

const CardListItem = styled.li`
  color: #ffffff;

  display: flex;
  align-items: center;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 32px;
  }

  @media (max-width: 1280px) {
    font-size: 16px;
    line-height: 18px;
  }
`;

const CardButton = styled.button`
  min-width: 308px;
  height: 72px;

  background: #ffffff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  border: 0;
  border-radius: 6px;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;

  text-align: center;

  color: #181818;
  cursor: pointer;
`;
