import styled from "styled-components";
import React from "react";
import {MessageTitle} from "./MessageTitle";

//смысл папки UI в том, что сюда нужно не стили со всего проекта вынести, а компоненты
//например, MessageBlock в проекте не существует без MessageTitle
//поэтому нужно было сделать компонент примерно такой:
export const Message = ({ text }: { text: string }) => {
  return (
    <MessageBlock>
      <MessageTitle>{text}</MessageTitle>
    </MessageBlock>
  );
};

//и уже его использовать везде, где тебе нужно
const MessageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;

  background: darkred;
  position: fixed;
  top: 0;
  left: 0;
`;
