import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormWrapper } from "../../UI/form/FormWrapper";
import { Title } from "../../UI/form/Title";
import { Input } from "../../UI/form/Input";
import { SubmitButton } from "../../UI/form/SubmitButton";
import { Form } from "../../UI/form/Form";
import { Warning } from "../../UI/form/Warning";
import { AuthInputs, LoginResponseType } from "../../types/type";
import { signIn } from "../../store/UserSlice";
import { useSignInMutation } from "../../store/RegisterApi";
import { useDispatch } from "react-redux";
import {Message, MessageBlock} from "../../UI/form/MessageBlock";
import { MessageTitle } from "../../UI/form/MessageTitle";
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

        <SubmitButton width="200px" type="submit" marginBottom="426px">
          Send password
        </SubmitButton>
      </Form>
      {err && <Message text={err}/>}
    </FormWrapper>
  );
};

export default Login;
