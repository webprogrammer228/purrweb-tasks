import React, { useState, useEffect } from "react";
import { column } from "../types/types";
import styled from "styled-components";
import Card from "./Card";
import CardDetails from "./CardDetails";

const Column: React.FC<column> = ({
  column,
  data,
  id,
  setData,
  cards,
  setCards,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  //For column
  const [initialState, setInitialState] = useState<{
    id: number;
    name: string;
  }>({ id: 0, name: "" });
  const [addValue, setAddValue] = useState(String(""));

  // Hide popup on esc
  useEffect(() => {
    const keyDownHandler = (e: { key: string; preventDefault: () => void }) => {
      if (e.key === "Escape") {
        e.preventDefault();

        showPopupOnEsc();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [showPopup, setShowPopup] = useState(Boolean(false));



  const showPopupOnEsc = () => {
    setShowPopup(false);
  };

  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;

  const editElem = (h3: HTMLElement) => {
    if (selectedItem) {
      selectedItem.classList.remove("active");
      nextElem.classList.remove("active");
    }
    selectedItem = h3;
    nextElem = h3 as HTMLInputElement;
    let focusedInput = nextElem.nextElementSibling as HTMLInputElement;

    selectedItem.classList.add("active");
    focusedInput?.focus();
  };

  const endEditColumn = (e: React.SyntheticEvent) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const editColumnName = (
    e: React.SyntheticEvent,
    id: number,
    initialState: { id: number; name: string }
  ) => {
    data.map((elem) =>
      elem.id === id ? Object.assign(elem, initialState) : false
    );

    setData(data);

    localStorage.setItem("columns", JSON.stringify(data));
    setData(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const addNewColumn = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let lastElem: number | false = 0;
    data.forEach(
      (elem) => (lastElem = elem.id === data.length - 1 ? elem.id : false)
    );
    let newColumn = { id: lastElem + 1, name: addValue };

    let updatedMas = [];
    updatedMas.push(...data, newColumn);

    setData(updatedMas);
    localStorage.setItem("columns", JSON.stringify(updatedMas));
    setData(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.value = "";
  };

  const removeColumn = (id: number) => {
    const updatedColumns = data.filter((elem) =>
      elem.id !== id ? elem : false
    );

    const updatedCards = cards.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    const updatedDescription = description.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    const updatedComments = comments.filter((elem) =>
      elem.columnId !== id ? elem : false
    );

    updatedColumns.map((elem, index) =>
      elem.id !== index ? (elem.id = index) : false
    );

    updatedCards.map((elem) =>
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    updatedDescription.map((elem) =>
      elem.columnId !== null &&
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    updatedComments.map((elem) =>
      elem.columnId !== null &&
      elem.columnId !== id &&
      elem.columnId !== undefined &&
      elem.columnId !== 0 &&
      elem.columnId >= id
        ? elem.columnId--
        : false
    );

    setData(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    setDescription(updatedDescription);

    localStorage.setItem("description", JSON.stringify(updatedDescription));

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const deleteDescription = (id: number | null | undefined) => {
    const updatedDescription = description.filter((elem) =>
      elem.cardId !== id ? elem : false
    );

    setDescription(updatedDescription);
    localStorage.setItem("description", JSON.stringify(updatedDescription));
  };

  return (
    <>
      <Col
        onClick={(e: React.SyntheticEvent) => {
          let target = e.target;

          if ((target as HTMLElement).tagName !== "H3") return;
          editElem(target as HTMLElement);
        }}
      >
        <HeaderCol>{column.name}</HeaderCol>
        <ColEdit
          key={column.name}
          defaultValue={column.name}
          onFocus={(e) =>
            setInitialState({
              id: id,
              name:
                e.currentTarget.value === ""
                  ? column.name
                  : e.currentTarget.value,
            })
          }
          onChange={(e) =>
            setInitialState({
              id: id,
              name:
                e.currentTarget.value === ""
                  ? column.name
                  : e.currentTarget.value,
            })
          }
          onBlur={(e) => editColumnName(e, id, initialState)}
          onKeyDown={(e) =>
            e.key === "Enter" ? editColumnName(e, id, initialState) : false
          }
        />

        {/* Карточка */}

        <Card
          cards={cards}
          setCards={setCards}
          id={id}
          data={data}
          setCurrentCardId={setCurrentCardId}
          setShowPopup={setShowPopup}
          setCurrentColumnId={setCurrentColumnId}
          setCardColumnName={setCardColumnName}
          deleteDescription={deleteDescription}
          cardsMas={cardsMas}
          editElem={editElem}
          endEditColumn={endEditColumn}
          removeColumn={removeColumn}
        />
      </Col>

      {showPopup ? <CardDetails /> : false}

      <AddNewCol>
        <HeaderCol
          onClick={(e: React.SyntheticEvent) => {
            let target = e.target;

            if ((target as HTMLElement).tagName !== "H3") return;
            editElem(target as HTMLElement);
          }}
        >
          + Добавить колонку
        </HeaderCol>
        <ColEdit
          defaultValue={""}
          placeholder="Введите название колонки"
          onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddValue(e.currentTarget.value)
          }
          onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.currentTarget.value
          }
          onKeyDown={(e) =>
            e.key === "Enter" && e.currentTarget.value !== ""
              ? addNewColumn(e)
              : false
          }
        />
      </AddNewCol>
    </>
  );
};

export default Column;

const Col = styled.div`
  width: 272px;
  min-height: 75px;
  background-color: #ebecf0;
  padding: 10px;

  margin-right: 30px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const HeaderCol = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;

  &.active {
    display: none;
  }

  &.active + input {
    display: block;
  }

  cursor: pointer;
`;

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;

const AddNewCol = styled.div`
  min-width: 264px;
  height: 42px;

  margin-right: 20px;
  padding: 10px;

  background-color: rgba(235, 236, 240, 0.3);
  color: black;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.5s;
  border-radius: 10px;

  &:hover {
    background-color: rgba(89, 89, 89, 0.5);
  }
`;
