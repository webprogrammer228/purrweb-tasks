import React, { useEffect } from "react";
import styled from "styled-components";
import { Logo } from "../icons/";
import dynamic from "next/dynamic";
import { getMe } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../../store/RegisterApi";
import { RootState } from "../../store";
import { user } from "../../types/type";
import { token } from "../../utils/utils";

const HeaderLayout = () => {
  const dispatch = useDispatch();
  const { data } = useGetMeQuery("");

  useEffect(() => {
    (token !== undefined || true) && dispatch(getMe(data!));
  }, [token]);

  const user = useSelector<RootState, user>((state) => state.users.users);

  const UserBlock = dynamic(() => import("../../components/UserBlock"));
  const MobileMenu = dynamic(() => import("../../components/MobileMenu"));
  return (
    <Header>
      <Logo
        height="42px"
        width="42px"
        color="#FFFFFF"
        secondaryColor="#FC5842"
      />
      {user.username && (
        <>
          <UserBlock name={user.username} />
          <MobileMenu name={user.username} />
        </>
      )}
    </Header>
  );
};

export default HeaderLayout;

export const Header = styled.header`
  width: 100%;
  height: 100px;
  margin: 0 0 65px;

  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 680px) {
    margin: 0 0 30px;
    padding: 0 15px;
  }
`;
