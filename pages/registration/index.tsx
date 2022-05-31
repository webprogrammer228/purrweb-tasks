import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

// UI
import { Stage } from "../../UI/Stage";
import Link from "next/link";
import { Stages } from "../../UI/form/Stages";
import { Title } from "../../UI/form/Title";
import { Form } from "../../UI/form/Form";
import { Input } from "../../UI/form/Input";
import { Warning } from "../../UI/form/Warning";
import { SubmitButton } from "../../UI/form/SubmitButton";
import { FormWrapper } from "../../UI/form/FormWrapper";
import { MessageBlock } from "../../UI/form/MessageBlock";
import { MessageTitle } from "../../UI/form/MessageTitle";

// types
import { AuthInputs } from "../../types/type";

// functions
import { useRouter } from "next/router";
import { useSignUpMutation } from "../../store/RegisterApi";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/UserSlice";
import Cookies from "js-cookie";

const Registration = () => {
  const [signUpUser] = useSignUpMutation();
  const [errs, setErrs] = useState("");
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();
  const onSubmit: SubmitHandler<AuthInputs> = async (data: AuthInputs) => {
    if (data) {
      await signUpUser({ ...data })
        .unwrap()
        .then((response: AuthInputs) => {
          setErrs("");
          dispatch(signUp({ ...response }));
          Cookies.set("token", response.token);
          router.push("/login");
        })
        .catch((e) => {
          e.data && setErrs(e.data.message);
        });
    }
  };

  return (
    <FormWrapper>
      <Stages>
        <Stage title="Create Account" color="#FC5842" />
        <Stage title="Log In" />
        <Stage title="Checkout" />
      </Stages>
      <Title>Create account</Title>
      <Hint>
        You need to enter your name and email. We will send you a temporary
        password by email
      </Hint>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          width="100%"
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && <Warning>Username is not be empty</Warning>}

        <Input
          width="100%"
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
          width="100%"
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

        <SubmitButton width="200px" type="submit" marginBottom="48px">
          Send password
        </SubmitButton>
      </Form>
      {errs && (
        <MessageBlock>
          <MessageTitle>{errs}</MessageTitle>
        </MessageBlock>
      )}

      <UnderButtonText>
        <HaveAnAccount>Have an account? </HaveAnAccount>
        <Link href="/login">Go to the next step</Link>
      </UnderButtonText>
    </FormWrapper>
  );
};

export default Registration;

const Hint = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #ffffff;
  margin-bottom: 32px;
`;

const UnderButtonText = styled.div`
  display: flex;
  margin-bottom: 228px;

  & > a {
    font-family: "Thicccboi", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;

    color: #fc5842;
  }
`;

const HaveAnAccount = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #ffffff;
  margin-right: 8px;
`;
