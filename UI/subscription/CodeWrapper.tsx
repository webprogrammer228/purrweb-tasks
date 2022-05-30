import styled from "styled-components";
import { device } from "../../media/media";

export const CodeWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 153px;

  position: relative;
  background: #272727;
  border-radius: 12px;

  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 72px;
  }

  padding: 32px 111px 31px 32px;

  ${device.xl`
    flex-direction: column;
    height: auto;
    padding: 32px 34px;
  `}

  ${device.sm`
    padding: 20px;
  `}
`;
