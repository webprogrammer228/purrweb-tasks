import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface GreetingProps {
  closeWindow: () => void;
}

const GreetingPopup: React.FC<GreetingProps> = ({ closeWindow }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length > 0) {
      window.localStorage.setItem("name", value);
    }
  }, [value]);

  return (
    <Modal>
      <ModalContent>
        <ModalInput
          {...value}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите имя"
        />
        <ModalButton onClick={() => (value.length > 0 ? closeWindow() : false)}>
          Продолжить
        </ModalButton>
      </ModalContent>
    </Modal>
  );
};

export default GreetingPopup;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid black;
  margin: 0 auto;
  position: fixed;

  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  min-height: 300px;
  min-width: 600px;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ModalInput = styled.input`
  padding: 15px;
  outline: 0;
  font-size: 20px;
  margin-bottom: 30px;

  &:focus {
    border: ${({ value }) => (value ? "1px solid red" : "1px solid black")};
  }
`;

const ModalButton = styled.button`
  min-width: 150px;
  width: 200px;
  align-self: center;
  padding: 20px;
  border: 0;
  border-radius: 30px;
  font-size: 20px;
  transition: all 0.5s;
  background: dark;

  &:hover {
    background: gray;
  }
`;
