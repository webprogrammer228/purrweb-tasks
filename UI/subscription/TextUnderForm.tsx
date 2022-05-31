import styled from "styled-components";

export const TextUnderForm = styled.span`
  font-family: "Thicccboi", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;

  color: #ffffff;

  @media (max-width: 540px) {
    margin-bottom: 10px;

    & + button {
      margin-bottom: 24px;
    }
  }
`;
