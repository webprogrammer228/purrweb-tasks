import React from "react";
import { SubscriptionsType } from "../types/type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { URL } from "../config";
import { Wrapper } from "../UI/Wrapper";
import { SettingsTitle } from "../UI/SettingsTitle";
import { SubmitButton } from "../UI/form/SubmitButton";
import Subscription from "../components/Subscription";

const Subscriptions = ({ ...props }: SubscriptionsType) => {
  const datas = Object.values(props);
  // const getDataFromResponse = () => {
  //   for (let i = 0; i < datas.length; i++) {
  //     return datas[i].map((data) => data);
  //   }
  // };

  return (
    <>
      {/*{getDataFromResponse()?.map((el) => (*/}
      {/*  <h1>{el.id}</h1>*/}
      {/*))}*/}
      <Wrapper direction="row" align="left" justifyContent="space-between">
        <SettingsTitle>My subscriptions</SettingsTitle>
        <SubmitButton width="152px">Upgrade</SubmitButton>
      </Wrapper>
      <Subscription info={props} />
      {/*{getDataFromResponse()?.map((data) => (*/}
      {/*  <Subscription data={data} />*/}
      {/*))}*/}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const res = await axios
    .get(`${URL}subscribe/self`, {
      headers: { Authorization: `Bearer ${req.cookies.token}` },
    })
    .then((res: AxiosResponse<SubscriptionsType, string>) => res.data)
    .catch((e: AxiosError) => e.message);

  return { props: { res } };
};

export default Subscriptions;
