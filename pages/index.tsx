import type { NextPage } from "next";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";

const Home: NextPage = () => {
  return (
    <>
      <HeaderLayout>
        <Logo
          height="42px"
          width="42px"
          color="#FFFFFF"
          secondaryColor="#FC5842"
        />
      </HeaderLayout>
    </>
  );
};

export default Home;
