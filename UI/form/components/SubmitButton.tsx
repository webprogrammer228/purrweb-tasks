import styled from "styled-components";
import {SubmitButtonType} from "../../../types/type";

//везде, где используется эта кнопка, тэг открывается и закрывается
//этого можно избежать, если сделать компонент
const SubmitBtn = ({
  width,
  label,
  marginBottom,
  smConfig,
}: {
  width: string;
  label?: string;
  marginBottom?: string;
  smConfig?: boolean;
}) => {
  return (
    <SubmitButton
      width={width}
      type="submit"
      marginBottom={marginBottom}
      smConfig={smConfig}
    >
      {label}
    </SubmitButton>
  );
};
export { SubmitBtn };

const SubmitButton = styled.button<SubmitButtonType>`
  width: ${(props) => props.width};
  height: 58px;

  background: #fc5842;
  box-shadow: 0px 10px 28px rgba(252, 88, 66, 0.2);
  border-radius: 4px;
  border: 0;

  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;

  text-align: center;

  color: #ffffff;
  margin-bottom: ${(props) => props.marginBottom};

  cursor: pointer;

  @media (max-width: 540px) {
    width: ${(props) => props.smConfig && "auto"};
    height: ${(props) => props.smConfig && "0"};
    background: ${(props) => props.smConfig && "transparent"};
    color: ${(props) => props.smConfig && "#fc5842"};
    margin-top: ${(props) => props.smConfig && "12px;"};
  }
`;
