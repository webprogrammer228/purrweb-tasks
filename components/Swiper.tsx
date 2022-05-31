import React from "react";
import { Navigation } from "swiper";
import {
  MySubscription,
  SubscriptionTitleType,
  SubscriptionWrapperPropsType,
  SubscriptionWrapperType,
  SwiperNavigationType,
} from "../types/type";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { Wrapper } from "../UI/Wrapper";
import { PaginationArrow } from "../UI/subscription/PaginationArrow";
import { ViewSubscriptionButton } from "./Subscription";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type SwiperProps = {
  allSubscriptions: MySubscription[][];
  activeIndexSlide: number;
  setActiveIndexSlide: (value: number) => void;
  allData: MySubscription[];
  activeIndexCard: number;
  setActiveIndexCard: (value: number) => void;
};

export const SwiperComponent: React.FC<SwiperProps> = ({
  activeIndexSlide,
  setActiveIndexSlide,
  allData,
  activeIndexCard,
  setActiveIndexCard,
  allSubscriptions,
}) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={28}
      slidesPerView={2}
      direction={"horizontal"}
      navigation={{ nextEl: ".next-el", prevEl: ".prev-el" }}
      onSlideChange={(slide) => {
        setActiveIndexSlide(slide.realIndex);
      }}
      breakpoints={{
        1300: {
          slidesPerView: 3,
        },
        960: {
          slidesPerView: 2,
        },
        300: {
          slidesPerView: 1,
        },
      }}
    >
      {allData &&
        allData.map((subscription: MySubscription, id: number) => (
          <SwiperSlide key={uuidv4()}>
            <SubscriptionWrapper index={activeIndexCard} activeIndex={id}>
              <SubscriptionHeader
                padding="0 32px 32px 0"
                border="1px solid #969696"
              >
                <SubscriptionTitle
                  color="#ffffff"
                  lineHeight="28px"
                  fontSize="22px"
                  fontWeight="700"
                >
                  Gscore
                </SubscriptionTitle>
                <SubscriptionTitle
                  color="#05C168"
                  lineHeight="28px"
                  fontSize="22px"
                  fontWeight="700"
                >
                  {subscription.status[0].toUpperCase() +
                    subscription.status.toLowerCase().slice(1)}
                </SubscriptionTitle>
              </SubscriptionHeader>
              <SubscriptionHeader padding="32px 49px 12px 0">
                <SubscriptionTitle
                  color="#ffffff"
                  lineHeight="26px"
                  fontSize="24px"
                  fontWeight="500"
                >
                  {subscription.product.name}
                </SubscriptionTitle>
                {subscription.product.prices.map((allPrices) => (
                  <SubscriptionTitle
                    color="#ffffff"
                    lineHeight="26px"
                    fontSize="24px"
                    fontWeight="500"
                    key={uuidv4()}
                  >
                    ${allPrices.price}
                  </SubscriptionTitle>
                ))}
              </SubscriptionHeader>
              <SubscriptionTitle
                fontSize="16px"
                lineHeight="18px"
                fontWeight="500"
                color="#969696"
                marginBottom="32px"
                validDate="true"
              >
                valid until{" "}
                {DateTime.fromSeconds(
                  Number(`${subscription.currentPeriodEnd}`)
                ).toLocaleString()}
              </SubscriptionTitle>
              <React.Fragment>
                <ViewSubscriptionButton
                  height="50"
                  width="120"
                  color="#FC5842"
                  background="#ffffff"
                  onClick={() => setActiveIndexCard(id)}
                >
                  View
                </ViewSubscriptionButton>
              </React.Fragment>
            </SubscriptionWrapper>
          </SwiperSlide>
        ))}

      <Wrapper direction="row" align="left" marginBottom="32px">
        <Button marginRight="12px" className="prev-el">
          <PaginationArrow rotate="180deg" />
        </Button>
        <Pagination>{activeIndexSlide + 1}</Pagination>
        <Pagination>/</Pagination>
        <Pagination>{allSubscriptions[0].length}</Pagination>
        <Button className="next-el">
          <PaginationArrow rotate="0deg" />
        </Button>
      </Wrapper>
    </Swiper>
  );
};

const SubscriptionWrapper = styled.div<SubscriptionWrapperPropsType>`
  background: #393939;
  display: flex;
  flex-direction: column;

  box-shadow: 0 24px 65px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 48px 32px;
  margin-bottom: 24px;

  max-width: 620px;
  max-height: 334px;
  opacity: ${(props) => (props.index !== props.activeIndex ? ".6" : "1")};

  @media (max-width: 550px) {
    padding: 32px 24px;
  }
`;

const SubscriptionHeader = styled.div<SubscriptionWrapperType>`
  display: flex;
  padding: ${(props) => props.padding};
  justify-content: space-between;
  border-bottom: ${(props) => (props.border ? "1px solid #969696" : "none")};
  flex-wrap: wrap;

  @media (max-width: 550px) {
    &:first-child {
      padding: 0 0 24px 0;
    }

    &:nth-child(2) {
      padding: 24px 29px 4px 0;
    }
  }
`;

const SubscriptionTitle = styled.span<SubscriptionTitleType>`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  margin-bottom: ${(props) => props.marginBottom};

  color: ${(props) => props.color};
  padding: ${(props) => (props.padding ? props.padding : "")};

  @media (max-width: 540px) {
    font-weight: 600;
    font-size: ${(props) => (props.validDate ? "16px" : "20px")};
    line-height: ${(props) => (props.validDate ? "18px" : "22px")};
  }
`;

const Button = styled.button<SwiperNavigationType>`
  width: 44px;
  height: 44px;
  border: 1px solid #969696;
  border-radius: 12px;
  margin-right: ${(props) => props.marginRight};
  transform: matrix(-1, 0, 0, 1, 0, 0);

  background: transparent;

  & > svg > path {
    stroke: white;
  }

  &:disabled {
    border: 1px solid #393939;

    & > svg > path {
      stroke: #393939;
    }
  }

  cursor: pointer;
`;

const Pagination = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;

  color: #ffffff;
  margin-right: 12px;
  align-self: center;
`;
