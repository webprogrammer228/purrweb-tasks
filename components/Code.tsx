import React, { useState } from "react";
import { CodeWrapper } from "../UI/subscription/CodeWrapper";
import { CheckBox } from "../UI/subscription/Checkbox";
import { Wrapper } from "../UI/Wrapper";
import { CodeTitle } from "../UI/subscription/CodeTitle";
import { CodeInput } from "../UI/subscription/CodeInput";
import { CopyIcon } from "../UI/subscription/CopyIcon";
import { CodeStatus } from "../UI/subscription/CodeStatus";

const Code: React.FC = () => {
  const [activeCheckbox, setActiveCheckbox] = useState(false);

  // console.log("codes", codes);
  return (
    <CodeWrapper>
      <CheckBox
        type="checkbox"
        onClick={() => setActiveCheckbox(!activeCheckbox)}
        isActive={activeCheckbox}
      ></CheckBox>
      <Wrapper direction="column" align="left" marginRight="28px">
        <CodeTitle>License code</CodeTitle>
        <CodeInput
          // value="d1e5f389-1825-40bd-b543-7a3d855cfc13"
          type="url"
          width="296px"
          padding="0 70px 0 24px"
        />
        <CopyIcon color="white" width="32px" height="32px" />
      </Wrapper>
      <Wrapper direction="column" align="left" width="620px" marginRight="56px">
        <CodeTitle>Domain</CodeTitle>
        <CodeInput type="url" padding="0 24px 0 24px" />
      </Wrapper>
      <Wrapper direction="column" align="left">
        <CodeTitle>Status</CodeTitle>
        <CodeStatus>Active</CodeStatus>
      </Wrapper>
    </CodeWrapper>
  );
};

export default Code;
