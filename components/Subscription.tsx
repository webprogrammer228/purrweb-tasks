import React from "react";
import styled from "styled-components";
import {
  AllMySubscriptions,
  SubscriptionTitleType,
  SubscriptionType,
  SubscriptionWrapperType,
  SwiperNavigationType,
  ViewSubscriptionButtonType,
} from "../types/type";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper";
import { Wrapper } from "UI/Wrapper";
import { PaginationArrow } from "../UI/subscription/PaginationArrow";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

const Subscription: React.FC<SubscriptionType> = ({ ...info }) => {
  const datas = Object.values(info).map((elem) => elem.res);

  console.log(datas);
  return (
    <>
      <Swiper
        modules={[A11y, Navigation]}
        spaceBetween={28}
        slidesPerView={2.2}
        direction={"horizontal"}
        navigation={{ nextEl: ".next-el", prevEl: ".prev-el" }}
      >
        {datas.map((allSubscriptions: AllMySubscriptions[]) => (
          <Wrapper align="left" direction="row" key={uuidv4()}>
            {allSubscriptions.map((subscription) => (
              <SwiperSlide>
                <SubscriptionWrapper>
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
                      {subscription.status}
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
                  >
                    valid until{" "}
                    {DateTime.fromSeconds(
                      Number(`${subscription.currentPeriodEnd}`)
                    ).toLocaleString()}
                  </SubscriptionTitle>
                  <ViewSubscriptionButton
                    height="50"
                    width="120"
                    color="#FC5842"
                    background="#ffffff"
                  >
                    View
                  </ViewSubscriptionButton>
                </SubscriptionWrapper>
              </SwiperSlide>
            ))}
          </Wrapper>
        ))}

        <Wrapper direction="row" align="left" marginBottom="32px">
          <Button marginRight="12px" className="prev-el">
            <PaginationArrow rotate="180deg" />
          </Button>
          <Pagination className="swiper-pagination">{}</Pagination>
          <Pagination>/{datas[0].length}</Pagination>
          <Button className="next-el">
            <PaginationArrow rotate="0deg" />
          </Button>
        </Wrapper>
      </Swiper>
    </>
  );
};

export default Subscription;

const SubscriptionWrapper = styled.div`
  background: #393939;
  display: flex;
  flex-direction: column;

  box-shadow: 0 24px 65px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 48px 32px;
  margin-bottom: 24px;

  max-width: 620px;
  max-height: 334px;
`;

const SubscriptionHeader = styled.div<SubscriptionWrapperType>`
  display: flex;
  padding: ${(props) => props.padding};
  justify-content: space-between;
  border-bottom: ${(props) => (props.border ? "1px solid #969696" : "none")};
  flex-wrap: wrap;
`;

const SubscriptionTitle = styled.span<SubscriptionTitleType>`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};

  color: ${(props) => props.color};
  padding: ${(props) => (props.padding ? props.padding : "")};
`;

const ViewSubscriptionButton = styled.button<ViewSubscriptionButtonType>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 20px 42px;
  border: 0;
  color: ${(props) => props.color};

  background: ${(props) => props.background};

  box-shadow: 0 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;

  display: block;
  margin: 32px 0 48px 0;

  cursor: pointer;
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
