import React from "react";
import { Title } from "../UI/form/Title";
import { Form } from "../UI/form/Form";
import { SubmitButton } from "../UI/form/SubmitButton";
import { FormWrapper } from "../UI/form/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputs, PurchasedSubscription } from "../types/type";
import { CardDescription } from "../UI/CardDescription";
import { PurchaseWrapper } from "../UI/checkout/PurchaseWrapper";
import { PurchaseHeaderWrapper } from "../UI/checkout/PurchaseHeaderWrapper";
import { PurchaseHeaderTitle } from "../UI/checkout/PurchaseHeaderTitle";
import { Line } from "../UI/checkout/Line";
import { PurchaseSubscriptionWrapper } from "../UI/checkout/SubscriptionWrapper";
import { v4 as uuidv4 } from "uuid";
import { PurchaseSubscriptionTitle } from "../UI/checkout/PurchaseSubscriptionTitle";
import { Wrapper } from "../UI/Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";

const Finish = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: {},
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    router.push("/subscriptions");
  };

  const subscription = useSelector<RootState, PurchasedSubscription>(
    (state) => state.users.currentSubscription
  );

  return (
    <FormWrapper>
      <Title>Start your subscription</Title>
      <CardDescription>
        We have sent you a payment receipt by e-mail and a link to download the
        plugin with a license key.
      </CardDescription>
      <PurchaseWrapper>
        <PurchaseHeaderWrapper>
          <PurchaseHeaderTitle>Package name</PurchaseHeaderTitle>
          <PurchaseHeaderTitle>Price</PurchaseHeaderTitle>
        </PurchaseHeaderWrapper>
        <Line />
        <PurchaseSubscriptionWrapper
          key={uuidv4()}
          padding="32px 72px 48px 32px"
        >
          <PurchaseSubscriptionTitle>
            {subscription.title}
          </PurchaseSubscriptionTitle>
          <Wrapper align="center" direction="row">
            <PurchaseSubscriptionTitle>
              ${subscription.price}
            </PurchaseSubscriptionTitle>
          </Wrapper>
        </PurchaseSubscriptionWrapper>
      </PurchaseWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SubmitButton type="submit" width="100%" marginBottom="390px">
          Go to my subscriptions
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default Finish;
