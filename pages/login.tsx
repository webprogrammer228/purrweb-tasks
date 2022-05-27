import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Stage } from "../UI/stage";
import { Stages } from "../UI/form/Stages";
import { FormWrapper } from "../UI/form/FormWrapper";
import { Title } from "../UI/form/Title";
import { Input } from "../UI/form/Input";
import { SubmitButton } from "../UI/form/SubmitButton";
import { Form } from "../UI/form/Form";
import { Warning } from "../UI/form/Warning";
import { LoginInputs, LoginResponseType } from "../types/type";
import { signIn } from "../store/UserSlice";
import { useSignInMutation } from "../store/RegisterApi";
import { useDispatch } from "react-redux";
import { MessageBlock } from "../UI/form/MessageBlock";
import { MessageTitle } from "../UI/form/MessageTitle";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  const [signInUser] = useSignInMutation();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    if (data) {
      await signInUser({ ...data })
        .unwrap()
        .then((response: LoginResponseType) => {
          dispatch(signIn({ ...response }));
          Cookies.set("token", response.token);
          Cookies.set("username", response.user.username);
          router.push("/checkout");
        })
        .catch((e) => {
          setErr(e.data.message);
        });
    }
  };
  return (
    <FormWrapper>
      <Stages>
        <Stage title="Create Account" color="#FC5842" />
        <Stage title="Log In" color="#FC5842" />
        <Stage title="Checkout" />
      </Stages>
      <Title>Log In</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            required: "This field is required.",
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

        <SubmitButton width="200px" type="submit" marginBottom="426px">
          Send password
        </SubmitButton>
      </Form>
      {err && (
        <MessageBlock>
          <MessageTitle>{err}</MessageTitle>
        </MessageBlock>
      )}
    </FormWrapper>
  );
};

export default Login;
