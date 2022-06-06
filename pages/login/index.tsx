import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormWrapper,
  Input,
  Message,
  SubmitBtn,
  Title,
  Warning,
} from "../../UI/form";

import { AuthInputs, LoginResponseType } from "../../types/type";
import { signIn } from "../../store/UserSlice";
import { useSignInMutation } from "../../store/RegisterApi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import StageComponent from "../../components/StageComponent";

const Login = () => {
  const [signInUser] = useSignInMutation();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();
  const onSubmit: SubmitHandler<AuthInputs> = async (data: AuthInputs) => {
    if (data) {
      await signInUser({ ...data })
        .unwrap()
        .then((response: LoginResponseType) => {
          dispatch(signIn({ ...response }));
          Cookies.set("token", response.token);
          router.push("/checkout");
        })
        .catch((e) => {
          setErr(e.data.message);
        });
    }
  };

  return (
    <FormWrapper>
      <StageComponent index={1} />
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

        <SubmitBtn width="200px" marginBottom="426px" label="Send password" />
      </Form>
      {err && <Message text={err} />}
    </FormWrapper>
  );
};

export default Login;
