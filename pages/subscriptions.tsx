import React from "react";
import {SubscriptionsType} from "../types/type";
import axios from "axios";
import {configLogin, URL} from "../config";
import {GetServerSideProps} from "next";
// import { useGetSubscriptionsQuery } from "../store/RegisterApi";

const Subscriptions = ({ ...props }: SubscriptionsType) => {
  // const { data } = useGetSubscriptionsQuery("");
  console.log(props);
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios
    .get(`${URL}subscribe/self`, { headers: configLogin })
    .then((res) => res.data)
    .catch((e) => e.message);

  return { props: { res } };
};

export default Subscriptions;
