import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HeaderLayout } from "../UI/header";
import { Logo } from "../UI/header/Logo/Logo";
import { Stage } from "../UI/stage";
import { FooterLayout } from "../UI/footer";
import { TopBlock } from "../UI/footer/TopBlock";
import { BottomBlock } from "../UI/footer/BottomBlock";
import { Stages } from "../UI/form/Stages";
import { Main } from "../UI/form/Main";
import { Title } from "../UI/form/Title";
import { Input } from "../UI/form/Input";
import { SubmitButton } from "../UI/form/SubmitButton";
import { Form } from "../UI/form/Form";
import { Warning } from "../UI/form/Warning";
import { LoginInputs } from "../types/type";
import { signIn } from "../store/UserSlice";
import { useSignInMutation } from "../store/RegisterApi";
import { useDispatch } from "react-redux";

const Login = () => {
  const [signInUser] = useSignInMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    if (data) {
      await signInUser({ ...data })
        .unwrap()
        .catch((e) => {
          console.log(e);
        })
        .then((response: LoginInputs) => {
          dispatch(signIn({ ...response }));
        });
    }
  };
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
      <Main>
        <Stages>
          <Stage title="Create Account" color="#FC5842" />
          <Stage title="Log In" color="#FC5842" />
          <Stage title="Checkout" />
        </Stages>
        <Title>Log In</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "Email is requried.",
              pattern: {
                value: /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Email"
          />
          {errors?.email && <Warning>{errors.email.message}</Warning>}

          <Input
            {...register("password", {
              required: "This is required.",
              minLength: 6,
            })}
            placeholder="Password"
            type={"password"}
          />
          {errors.password && errors.password.type === "required" && (
            <Warning>Password is not be empty</Warning>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Warning>Minimal length your password is 6 symbols</Warning>
          )}

          <SubmitButton type="submit">Send password</SubmitButton>
        </Form>
      </Main>
      <FooterLayout>
        <TopBlock />
        <BottomBlock />
      </FooterLayout>
    </>
  );
};

export default Login;
