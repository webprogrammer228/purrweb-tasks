import React from "react";
import { SubscriptionsType } from "../../types/type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { URL } from "../../config";
import { GetServerSideProps } from "next";

const Subscriptions = ({ ...res }: SubscriptionsType[]) => {
  //Object.values(res).map((r) => {
  //  for (let i = 0; i < r.length; i++) {
  //    {
  //      console.log(r[i].id);
  //    }
  //  }
  //});

  const obj = Object.values(res);

  const getDataFromResponse = () => {
    for (let i = 0; i < obj.length; i++) {
      return obj[i].map((elem) => elem);
    }
  };

  console.log();

  return (
    <>
      {getDataFromResponse()?.map((el) => (
        <React.Fragment key={el.id}>
          <h1 style={{ color: "red" }}>{el.id}</h1>
        </React.Fragment>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const ress = await axios
    .get(`${URL}/subscribe/self`, {
      headers: { Authorization: `Bearer ${req.cookies.token}` },
    })
    .then((res: AxiosResponse<SubscriptionsType, string>) => res.data)
    .catch((e: AxiosError) => e.message);

  return { props: { ress } };
};

export default Subscriptions;
