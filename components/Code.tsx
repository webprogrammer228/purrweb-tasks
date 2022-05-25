import React, { useState } from "react";
import { CodeWrapper } from "../UI/subscription/CodeWrapper";
import { CheckBox } from "../UI/subscription/Checkbox";
import { Wrapper } from "../UI/Wrapper";
import { CodeTitle } from "../UI/subscription/CodeTitle";
import { CodeInput } from "../UI/subscription/CodeInput";
import { CopyIcon } from "../UI/subscription/CopyIcon";
import { CodeStatus } from "../UI/subscription/CodeStatus";
import { CheckboxesType, SubscriptionProps } from "../types/type";
import { ViewSubscriptionButton } from "./Subscription";
import { useForm } from "react-hook-form";

let mas: number[] = [];
// const checkActiveCheckboxes = (code: {
//   id: number;
//   code: string;
//   origin: null;
//   status: string;
//   subscribeId: number;
//   userId: number;
// }) => {
//   if (mas.includes(code.id)) {
//     mas.filter((id) => id !== code.id);
//   } else {
//     mas.push(code.id);
//   }
// };

const Code: React.FC<SubscriptionProps> = ({ code }) => {
  const [activeCheckbox, setActiveCheckbox] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckboxesType>();

  // console.log(mas);
  return (
    <CodeWrapper>
      <CheckBox
        type="checkbox"
        onClick={() => {
          setActiveCheckbox(!activeCheckbox);
        }}
        isActive={activeCheckbox}
        // checkActiveCheckboxes(code);
        {...register("id")}
      ></CheckBox>
      <Wrapper direction="column" align="left" marginRight="28px">
        <CodeTitle>License code</CodeTitle>
        <CodeInput
          defaultValue={code.code}
          type="text"
          width="296px"
          padding="0 70px 0 24px"
        />
        <CopyIcon color="white" width="32px" height="32px" />
      </Wrapper>
      <Wrapper direction="column" align="left" width="620px" marginRight="56px">
        <CodeTitle>Domain</CodeTitle>
        <CodeInput type="url" padding="0 24px 0 24px" />
      </Wrapper>
      {code.status === "INACTIVE" && (
        <Wrapper align="left" direction="column">
          <ViewSubscriptionButton
            height="58"
            width="111"
            background="#ffffff"
            color="#FC5842"
          >
            Activate
          </ViewSubscriptionButton>
        </Wrapper>
      )}
      <Wrapper direction="column" align="left" marginLeft="56px">
        <CodeTitle>Status</CodeTitle>
        <CodeStatus color={code.status}>{code.status}</CodeStatus>
      </Wrapper>
    </CodeWrapper>
  );
};

export default React.memo(Code);
