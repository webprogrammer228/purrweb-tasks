import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CheckboxesType,
  MySubscription,
  SubscriptionsType,
  ViewSubscriptionButtonType,
} from "../types/type";

import { Wrapper } from "UI/Wrapper";

import Code from "./Code";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../UI/form/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextUnderForm } from "../UI/subscription/TextUnderForm";
import { SubmitButton } from "../UI/form/SubmitButton";
import { useActivateCodeMutation } from "../store/RegisterApi";
import { useDispatch, useSelector } from "react-redux";
import { codeActivate, getAllSubscription } from "../store/UserSlice";
import { RootState } from "../store";

import { SwiperComponent } from "./Swiper";

type Props = {
  info: SubscriptionsType;
};

const Subscription: React.FC<Props> = ({ ...info }) => {
  const allSubscriptions: MySubscription[][] = Object.values(info).map(
    (elem) => elem.res
  );
  const [activeIndexSlide, setActiveIndexSlide] = useState(0);
  const [activeIndexCard, setActiveIndexCard] = useState(0);

  const [activateCode] = useActivateCodeMutation();
  const dispatch = useDispatch();
  const allData = useSelector<RootState, MySubscription[]>(
    (state) => state.users.allSubscriptions
  );

  useEffect(() => {
    dispatch(getAllSubscription({ allSubscriptions }));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm<CheckboxesType>();
  const onSubmit: SubmitHandler<CheckboxesType> = async (data) => {
    let code = data.code[0] || data.code;
    // ответ когда как почему-то приходит или массивом или объектом, почему - непонятно.

    await activateCode({ code })
      .unwrap()
      .then((response) => {
        dispatch(codeActivate({ ...response }));
      })
      .catch((e) => alert(e.message));
    reset();
  };

  return (
    <>
      <SwiperComponent
        activeIndexSlide={activeIndexSlide}
        setActiveIndexSlide={setActiveIndexSlide}
        allData={allData}
        activeIndexCard={activeIndexCard}
        setActiveIndexCard={setActiveIndexCard}
        allSubscriptions={allSubscriptions}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        {allData &&
          allData.map(
            (subscription: MySubscription, id: number) =>
              activeIndexCard === id &&
              subscription.codes.map((code) => (
                <Code key={uuidv4()} code={code} reg={register} />
              ))
          )}
        <Wrapper
          align="left"
          direction="row"
          justifyContent="space-between"
          changeDirection={true}
        >
          <TextUnderForm>Select the domains you want to keep</TextUnderForm>
          <SubmitButton width="148px">Confirm</SubmitButton>
        </Wrapper>
      </Form>
    </>
  );
};

export default React.memo(Subscription);

export const ViewSubscriptionButton = styled.button<ViewSubscriptionButtonType>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 20px 0;
  border: 0;
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};

  background: ${(props) => props.background};

  box-shadow: 0 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;

  display: block;

  cursor: pointer;

  z-index: 100;

  @media (max-width: 1200px) {
    margin-left: 0 !important;

    position: ${(props) => props.isCode && "absolute"};
    top: 20px;
    right: 40px;
    margin-top: 0 !important;
  }

  @media (max-width: 768px) {
    right: 20px;
  }

  @media (max-width: 1400px) {
    margin: ${(props) => props.mediumMargin};
  }
`;
