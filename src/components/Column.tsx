import React, { useState } from "react";
import styled from "styled-components";

type column = {
  data: { id: number; name: string }[];
};

const Column: React.FC<column> = ({ data }) => {
  const [initialState, setInitialState] = useState({ id: 0, name: "" });

  let dataFromStorage = JSON.parse(localStorage.getItem("columns")!);

  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;

  const editElem = (h3: HTMLElement) => {
    if (selectedItem) {
      selectedItem.classList.remove("active");
      nextElem.nextElementSibling?.classList.remove("active");
    }
    selectedItem = h3;
    nextElem = h3 as HTMLInputElement;
    let focusedInput = nextElem.nextElementSibling as HTMLInputElement;

    selectedItem.classList.add("active");
    focusedInput?.focus();
  };

  const editColumnName = (
    e: React.SyntheticEvent,
    id: number,
    initialState: { id: number; name: string }
  ) => {
    data.map((elem) =>
      elem.id === id ? Object.assign(elem, initialState) : false
    );

    localStorage.setItem("columns", JSON.stringify(data));
    e.currentTarget.previousElementSibling?.classList.remove("active");

    //localStorage.getItem("columns");

    //console.log("Данные из стора - ", dataFromStorage);
    //console.log("Дефолтные данные -", data);
    //console.log("initialState ", initialState);
    //console.log("Новые данные ", localStorage.getItem("columns"));
  };

  //console.log("Данные из стора - ", dataFromStorage);
  //console.log("Дефолтные данные -", data);
  //console.log("initialState ", initialState);
  //console.log("Новые данные ", localStorage.getItem("columns"));

  return (
    <Board>
      <Form action="#">
        {dataFromStorage.map((column: { name: string }, id: number) => (
          <React.Fragment key={id}>
            <Col
              onClick={(e: React.SyntheticEvent) => {
                let target = e.target;

                if ((target as HTMLElement).tagName !== "H3") return;
                editElem(target as HTMLElement);
              }}
            >
              <Header>{column.name}</Header>

              <ColEdit
                key={column.name}
                defaultValue={column.name}
                //onFocus={(e) =>
                //  setInitialState({ id: id, name: e.currentTarget.value })
                //}
                onChange={(e) =>
                  setInitialState({ id: id, name: e.currentTarget.value })
                }
                onBlur={(e) => editColumnName(e, id, initialState)}
              />
            </Col>
          </React.Fragment>
        ))}
      </Form>
    </Board>
  );
};

export default Column;

const Board = styled.div`
  display: flex;
  margin: 0 20px;
`;

const Form = styled.form`
  display: flex;
`;

const Col = styled.div`
  width: 272px;
  height: 75px;
  background-color: #ebecf0;
  padding: 10px;

  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }
`;

const Header = styled.h3`
  font-weight: bold;

  &.active {
    display: none;
  }

  &.active + input {
    display: block;
  }
`;

const ColEdit = styled.input`
  width: 100%;
  height: auto;

  display: none;
`;
