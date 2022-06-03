import React from "react";
import { Form, FormWrapper, SubmitBtn, Title } from "../../UI/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInputs, PurchasedSubscription } from "../../types/type";
import { CardDescription } from "../../UI/CardDescription";
import {
  Line,
  PurchaseHeaderTitle,
  PurchaseHeaderWrapper,
  PurchaseSubscriptionTitle,
  PurchaseSubscriptionWrapper,
  PurchaseWrapper,
} from "../../UI/checkout";
import { v4 as uuidv4 } from "uuid";
import { Wrapper } from "../../UI/Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/router";

const Finish = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: {},
  } = useForm<AuthInputs>();
  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
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
        <SubmitBtn
          width="100%"
          marginBottom="390px"
          label="Go to my subscriptions"
        />
      </Form>
    </FormWrapper>
  );
};

export default Finish;
