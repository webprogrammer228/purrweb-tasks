import React from "react";
import { Title } from "../../UI/form/Title";
import { Form } from "../../UI/form/Form";
import { SubmitButton } from "../../UI/form/SubmitButton";
import { FormWrapper } from "../../UI/form/FormWrapper";
import { SubmitHandler, useForm } from "react-hook-form";
import { PurchasedSubscription, SubscribeType } from "../../types/type";
import { PurchaseWrapper } from "../../UI/checkout/PurchaseWrapper";
import { PurchaseHeaderWrapper } from "../../UI/checkout/PurchaseHeaderWrapper";
import { PurchaseHeaderTitle } from "../../UI/checkout/PurchaseHeaderTitle";
import { Line } from "../../UI/checkout/Line";
import { PurchaseSubscriptionWrapper } from "../../UI/checkout/SubscriptionWrapper";
import { PurchaseSubscriptionTitle } from "../../UI/checkout/PurchaseSubscriptionTitle";
import { Basket } from "../../UI/checkout/Basket";
import { Wrapper } from "../../UI/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { TotalTitle } from "../../UI/checkout/TotalTitle";
import { TotalWrapper } from "../../UI/checkout/TotalWrapper";
import { buySubscription } from "../../store/UserSlice";
import { useRouter } from "next/router";
import { useBuySubscriptionMutation } from "../../store/RegisterApi";
import StageComponent from "../../components/StageComponent";

const Checkout = () => {
  const subscription = useSelector<RootState, PurchasedSubscription>(
    (state) => state.users.currentSubscription
  );
  const { priceId } = subscription;
  const dispatch = useDispatch();
  const [buySub] = useBuySubscriptionMutation();

  const router = useRouter();
  const {
    handleSubmit,
    formState: {},
  } = useForm<SubscribeType>();
  const onSubmit: SubmitHandler<SubscribeType> = async (data) => {
    await buySub({ priceId })
      .unwrap()
      .then((response: SubscribeType) => {
        dispatch(buySubscription({ ...response }));
        router.push("/finish");
      })
      .catch((e) => {
        alert(e);
      });
  };
  //Stages должен быть в отдельном компоненте и переиспользоваться. Если бы было не три, а десять таких табов?!
  //дополнительные пропсы нужно туда прокидывать вроде индекса, и по этому индексу задавать цвет
  return (
    <FormWrapper>
      <StageComponent index={2} />
      <Title>Checkout</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PurchaseWrapper>
          <PurchaseHeaderWrapper>
            <PurchaseHeaderTitle>Package name</PurchaseHeaderTitle>
            <PurchaseHeaderTitle>Price</PurchaseHeaderTitle>
          </PurchaseHeaderWrapper>
          <Line />
          <PurchaseSubscriptionWrapper
            key={uuidv4()}
            padding="32px 48px 48px 32px"
          >
            <PurchaseSubscriptionTitle>
              {subscription.title}
            </PurchaseSubscriptionTitle>
            <Wrapper align="center" direction="row">
              <PurchaseSubscriptionTitle>
                ${subscription.price}
              </PurchaseSubscriptionTitle>
              <Basket width="24px" height="24px" color="#969696" />
            </Wrapper>
          </PurchaseSubscriptionWrapper>
        </PurchaseWrapper>
        <TotalWrapper>
          <TotalTitle>Total:</TotalTitle>

          <TotalTitle>${subscription.price}</TotalTitle>
        </TotalWrapper>
        <SubmitButton width="200px" type="submit" marginBottom="290px">
          Purchase
        </SubmitButton>
      </Form>
    </FormWrapper>
  );
};

export default Checkout;
