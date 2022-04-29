import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CardType, ColumnType } from "../types/type";
import { addCard, editColumn, removeColumn } from "../store/addColumnsSlice";
import { endEditColumn } from "./Board";
import Card from "./Card";
import { editElem } from "./Board";
import CardDetails from "./CardDetails";

type ColumnProps = {
  id: number;
  title: string;
  name: string | null;
  cards: CardType[];
};

const Column: React.FC<ColumnProps> = ({ id, title, name, cards }) => {
  const dispatch = useDispatch();

  const colEdit = (id: number, editedTitleColumn: ColumnType) =>
    dispatch(editColumn({ id, editedTitleColumn }));
  const removeCol = (id: number) => dispatch(removeColumn({ id }));

  function cardAdd(id: number, e: React.SyntheticEvent) {
    dispatch(addCard({ cardTitle, id }));
    endEditColumn(e);
    setCardTitle("");
  }

  const [editedTitleColumn, setEditedTitleColumn] = useState<ColumnType>({
    id: 0,
    title: "",
    cards: [],
  });

  const [cardTitle, setCardTitle] = useState(String(""));

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

  const showPopupOnEsc = () => {
    setShowPopup(false);
  };
  const [showPopup, setShowPopup] = useState(Boolean(false));

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
          onChange={(e) =>
            setEditedTitleColumn({
              id: id,
              title:
                e.currentTarget.value.trim() === ""
                  ? title
                  : e.currentTarget.value,
              cards: [],
            })
          }
          onBlur={(e) => endEditColumn(e)}
          onKeyDown={(e) =>
            e.key === "Enter"
              ? colEdit(id, editedTitleColumn) && endEditColumn(e)
              : false
          }
        />

        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            cardId={card.id}
            description={card.description}
            columnId={id}
            setShowPopup={setShowPopup}
          />
        ))}

        {showPopup ? (
          <CardDetails
            columnTitle={title}
            setShowPopup={setShowPopup}
            name={name}
          />
        ) : (
          false
        )}

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
          value={cardTitle}
          onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCardTitle(e.currentTarget.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && e.currentTarget.value.trim() !== ""
              ? cardAdd(id, e)
              : false
          }
        />

        <RemoveColumn onClick={() => removeCol(id)}>
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
