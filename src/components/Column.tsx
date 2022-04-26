import React, { useState } from "react";
import styled from "styled-components";
import { CardType, CommentType } from "../types/type";
import { TypeProps } from "./Board";
import Card from "./Card";

type ColumnProps = {
  id: number;
  title: string;
};

const Column: React.FC<TypeProps & ColumnProps> = ({
  id,
  title,
  name,
  cards,
  setCards,
  columns,
  setColumns,
  description,
  setDescription,
  comments,
  setComments,
}) => {
  let selectedItem: HTMLElement;
  let nextElem: HTMLInputElement;

  const [initialState, setInitialState] = useState<CommentType>({
    id: 0,
    title: "",
  });

  const [cardInitialValue, setCardInitialValue] = useState<CardType>({
    id: 0,
    title: "",
    description: "",
    comments: [],
  });

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

  const editColumnName = (
    e: React.SyntheticEvent,
    id: number,
    initialState: { id: number; title: string }
  ) => {
    columns.map((elem) =>
      elem.id === id ? Object.assign(elem, initialState) : false
    );

    setColumns(columns);

    localStorage.setItem("columns", JSON.stringify(columns));
    setColumns(JSON.parse(localStorage.getItem("columns")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const endEditColumn = (e: React.SyntheticEvent) => {
    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const removeColumn = (id: number) => {
    const updatedColumns = columns.filter((elem) =>
      elem.id !== id ? elem : false
    );

    //const updatedCards = cards.filter((elem) =>
    //  elem.columnId !== id ? elem : false
    //);

    //const updatedDescription = description.filter((elem) =>
    //  elem.columnId !== id ? elem : false
    //);

    //const updatedComments = comments.filter((elem) =>
    //  elem.columnId !== id ? elem : false
    //);

    updatedColumns.map((elem, index) =>
      elem.id !== index ? (elem.id = index) : false
    );

    //updatedCards.map((elem) =>
    //  elem.columnId !== id &&
    //  elem.columnId !== undefined &&
    //  elem.columnId !== 0 &&
    //  elem.columnId >= id
    //    ? elem.columnId--
    //    : false
    //);

    //updatedDescription.map((elem) =>
    //  elem.columnId !== null &&
    //  elem.columnId !== id &&
    //  elem.columnId !== undefined &&
    //  elem.columnId !== 0 &&
    //  elem.columnId >= id
    //    ? elem.columnId--
    //    : false
    //);

    //updatedComments.map((elem) =>
    //  elem.columnId !== null &&
    //  elem.columnId !== id &&
    //  elem.columnId !== undefined &&
    //  elem.columnId !== 0 &&
    //  elem.columnId >= id
    //    ? elem.columnId--
    //    : false
    //);

    setColumns(updatedColumns);
    localStorage.setItem("columns", JSON.stringify(updatedColumns));

    //setCards(updatedCards);
    //localStorage.setItem("cards", JSON.stringify(updatedCards));

    //setDescription(updatedDescription);

    //localStorage.setItem("description", JSON.stringify(updatedDescription));

    //setComments(updatedComments);
    //localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const addCard = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    cards.push(cardInitialValue);
    setCards(cards);

    localStorage.setItem("columns", JSON.stringify(columns));

    e.currentTarget.value = "";
  };

  return (
    <ColumnBody>
      <Col
        onClick={(e: React.SyntheticEvent) => {
          let target = e.target;

          if ((target as HTMLElement).tagName !== "H3") return;
          editElem(target as HTMLElement);
        }}
      >
        <HeaderCol>{title}</HeaderCol>
        <ColEdit
          defaultValue={title}
          onFocus={(e) =>
            setInitialState({
              id: id,
              title:
                e.currentTarget.value === "" ? title : e.currentTarget.value,
            })
          }
          onChange={(e) =>
            setInitialState({
              id: id,
              title:
                e.currentTarget.value === "" ? title : e.currentTarget.value,
            })
          }
          onBlur={(e) => editColumnName(e, id, initialState)}
          onKeyDown={(e) =>
            e.key === "Enter" ? editColumnName(e, id, initialState) : false
          }
        />

        {cards.map((card) => (
          <Card
            key={card.id}
            name={name}
            title={card.title}
            id={card.id}
            description={card.description}
            comments={card.comments}
            cards={cards}
            setCards={setCards}
            setDescription={setDescription}
            setComments={setComments}
            columns={columns}
          />
        ))}

        <AddCardHeader
          onClick={(e: React.SyntheticEvent) => {
            let target = e.target;

            if ((target as HTMLElement).tagName !== "H4") return;
            editElem(target as HTMLElement);
          }}
        >
          + Добавить карточку
        </AddCardHeader>
        <AddCardTextArea
          onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCardInitialValue({
              id: cards.length,
              title: e.currentTarget.value,
              description: "",
              comments: [],
            })
          }
          onKeyDown={(e) =>
            e.key === "Enter" && e.currentTarget.value.trim() !== ""
              ? addCard(e)
              : false
          }
        />

        <RemoveColumn onClick={() => removeColumn(id)}>
          Удалить колонку
        </RemoveColumn>
      </Col>
    </ColumnBody>
  );
};

export default Column;

const ColumnBody = styled.div``;

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

const RemoveColumn = styled.p`
  min-width: 100%;
  background: transparent;

  cursor: pointer;

  display: flex;
  justify-content: right;
  align-items: flex-end;

  flex: 1;
`;

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;

const AddCardHeader = styled.h4`
  font-weight: bold;
  margin-bottom: 20px;
  background: white;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.5s;

  &:hover {
    background: lightgray;
    color: black;
  }

  &.active {
    display: none;
  }

  &.active + textarea {
    display: block;
  }

  cursor: pointer;
`;

const AddCardTextArea = styled.textarea`
  width: 100%;
  display: none;

  margin-bottom: 25px;
`;
