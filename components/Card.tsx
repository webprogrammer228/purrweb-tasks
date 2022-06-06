import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardDescription } from "../UI/CardDescription";
import { Check } from "../UI";
import { addSubscription } from "../store/UserSlice";
import { token } from "../utils/utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

type CardsProps = {
  cardInfo: {
    price: number;
    title: string;
    description: string;
    benefits: string[];
  };
  id: number;
};

const Card: React.FC<CardsProps> = ({ cardInfo }, id) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <CardBody
      key={uuidv4()}
      onMouseEnter={() => {
        setActiveCard(id);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setActiveCard(id);
        setIsHovered(false);
      }}
    >
      <CardBodyHeader>
        <CardPrice>${cardInfo.price}</CardPrice>
        <CardTitle>{cardInfo.title}</CardTitle>
        <CardDescription>{cardInfo.description}</CardDescription>
      </CardBodyHeader>
      <CardList>
        {cardInfo.benefits.map((benefit) => (
          <CardListItem key={uuidv4()}>
            <Check
              secondaryColor={
                id === activeCard && isHovered ? "#fc5842" : "#272727"
              }
            />
            {benefit}
          </CardListItem>
        ))}
      </CardList>
      <CardButton
        onClick={() => {
          dispatch(addSubscription({ ...cardInfo, id }));
          token ? router.push("/checkout") : router.push("/registration");
        }}
      >
        Get Gscore
      </CardButton>
    </CardBody>
  );
};

export default Card;

const CardBody = styled.div`
  background: #272727;

  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  border-radius: 12px;

  height: 602px;
  max-width: 412px;

  padding: 42px 48px;
  margin: 27.5px 0 27.5px 33px;

  transition: ease-in 0.6s;

  cursor: pointer;

  @media (max-width: 1280px) {
    padding: 21px 24px;
    max-width: 370px;
    height: 560px;
  }

  @media (max-width: 768px) {
    margin: 0 0 27.5px 0;
  }

  @media (max-width: 550px) {
    padding: 20px;
    height: 510px;
  }

  &:hover {
    background: #fc5842;
    margin-top: -30px;

    @media (max-width: 768px) {
      margin-top: 0;
    }

    & > div {
      border-bottom: 1px solid #ffffff;
    }

    p {
      color: #ffffff;
    }

    button {
      color: #fc5842;
    }
  }
`;

const CardBodyHeader = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;

  text-align: center;
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

  @media (max-width: 550px) {
    font-size: 40px;
    line-height: 52px;
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

const CardList = styled.ul`
  margin-top: 38px;
  list-style-type: none;

  @media (max-width: 550px) {
    margin-top: 23px;
  }
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

  @media (max-width: 768px) {
    height: 62px;
    min-width: 100%;
  }
`;
