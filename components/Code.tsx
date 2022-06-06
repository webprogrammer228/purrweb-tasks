import React, { useState } from "react";
import {
  CheckBox,
  CodeInput,
  CodeStatus,
  CodeTitle,
  CodeWrapper,
  Label,
} from "../UI/subscription";
import { Wrapper } from "../UI/Wrapper";
import { CopyIcon } from "../UI/icons/CopyIcon";
import { ViewSubscriptionButton } from "./Subscription";
import { UseFormRegister } from "react-hook-form";
import { CheckboxesType } from "../types/type";

type SubscriptionProps = {
  code: {
    id: number;
    code: string;
    origin: null;
    status: string;
    subscribeId: number;
    userId: number;
  };
  reg: UseFormRegister<CheckboxesType>;
};

const Code: React.FC<SubscriptionProps> = ({ code, reg }) => {
  const [activeCheckbox, setActiveCheckbox] = useState(true);

  return (
    <CodeWrapper>
      <Label defaultValue={code.code}>
        <CheckBox
          {...reg("code", { required: "true" })}
          type="checkbox"
          isActive={activeCheckbox}
          defaultChecked={!activeCheckbox}
          onChange={() => setActiveCheckbox(!activeCheckbox)}
          defaultValue={code.code}
        />
        <CodeStatus color={code.status}>
          {code.status[0].toUpperCase() + code.status.toLowerCase().slice(1)}
        </CodeStatus>
      </Label>

      <Wrapper
        direction="column"
        align="left"
        marginRight="28px"
        order="2"
        marginMedium="24px 0 24px 0"
      >
        <CodeTitle>License code</CodeTitle>
        <CodeInput
          defaultValue={code.code}
          type="text"
          width="296px"
          padding="0 70px 0 24px"
        />
        <CopyIcon
          color="white"
          width="32px"
          height="32px"
          onClick={() => navigator.clipboard.writeText(code.code)}
        />
      </Wrapper>
      <Wrapper direction="column" align="left" style={{ flex: "1" }} order="3">
        <CodeTitle>Domain</CodeTitle>
        <CodeInput
          type="url"
          padding="0 24px 0 24px"
          width="100%"
          defaultValue={code.origin ? code.origin : ""}
        />
      </Wrapper>
      {code.status === "INACTIVE" && (
        <ViewSubscriptionButton
          height="58"
          width="111"
          background="#ffffff"
          color="#FC5842"
          margin="30px 0 0 20px"
          mediumMargin="30px 0 0 20px"
          isCode={true}
        >
          Activate
        </ViewSubscriptionButton>
      )}
      <Wrapper
        direction="column"
        align="left"
        marginLeft="56px"
        marginMedium="26px"
        order="1"
        visible={true}
      >
        <CodeTitle>Status</CodeTitle>
        <CodeStatus color={code.status}>
          {code.status[0].toUpperCase() + code.status.toLowerCase().slice(1)}
        </CodeStatus>
      </Wrapper>
    </CodeWrapper>
  );
};

export default React.memo(Code);
