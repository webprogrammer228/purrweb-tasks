import React from "react";
import styled from "styled-components";

type Stage = {
  title: string;
  color?: string;
};

export const Stage: React.FC<Stage> = ({ title, color }) => {
  return (
    <StageWrapper>
      <StageTitle>{title}</StageTitle>
      <StageLine color={color} />
    </StageWrapper>
  );
};

const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
  margin-right: 16px;

  @media (max-width: 786px) {
    margin-bottom: 16px;
  }
`;

const StageTitle = styled.p`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;

  color: #ffffff;
  margin-bottom: 10px;
`;

const StageLine = styled.div`
  transition: all 0.5s;

  background: ${(props) => (props.color ? props.color : "#373737")};
  border-radius: 10px;
  width: 195px;
  height: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
