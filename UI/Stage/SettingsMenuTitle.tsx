import styled from "styled-components";

type SettingsMenuTitleType = {
  activeTitle: boolean;
};

export const SettingsMenuTitle = styled.p<SettingsMenuTitleType>`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;

  color: ${(props) => (props.activeTitle ? "#FC5842" : "#393939")};
  border-bottom: ${(props) =>
    props.activeTitle ? "1px solid #FC5842" : "1px solid #393939"};
  margin-right: 24px;

  cursor: pointer;
  padding: 0 24px 12px;
`;
