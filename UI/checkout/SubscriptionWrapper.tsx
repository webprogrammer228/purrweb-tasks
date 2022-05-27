import styled from "styled-components";
import { SubscriptionWrapperType } from "../../types/type";

export const PurchaseSubscriptionWrapper = styled.div<SubscriptionWrapperType>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${(props) => props.padding || "32px 48px 48px 32px"};
`;