import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CardType } from "../types/type";
import { addCard, editColumn, removeColumn } from "../store/addColumnsSlice";
import { endEditColumn, Warning } from "./Board";
import Card from "./Card";
import { editElem } from "./Board";
import CardDetails from "./CardDetails";
import { SubmitHandler, useForm } from "react-hook-form";

type ColumnProps = {
  id: number;
  title: string;
  name: string | null;
  cards: CardType[];
};

export type ColumnSubmit = {
  columnTitle: string;
  cardTitle: string;
};

const Column: React.FC<ColumnProps> = ({ id, title, name, cards }) => {
  const dispatch = useDispatch();

  const colEdit = (id: number, columnTitle: string) =>
    dispatch(editColumn({ id, columnTitle }));
  const removeCol = (id: number) => dispatch(removeColumn({ id }));

  function cardAdd(id: number, cardTitle: string) {
    dispatch(addCard({ cardTitle, id }));
  }

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnSubmit>();
  const onSubmit: SubmitHandler<ColumnSubmit> = (data) => {
    colEdit(id, data.columnTitle);
    reset();
  };
  const cardSubmit: SubmitHandler<ColumnSubmit> = (data) => {
    cardAdd(id, data.cardTitle);
    reset();
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCol>{title}</HeaderCol>
          <ColEdit
            {...register("columnTitle", { required: true })}
            defaultValue={title}
            onBlur={(e) => endEditColumn(e)}
            onKeyDown={(e) =>
              e.key === "Enter" && e.currentTarget.value !== ""
                ? endEditColumn(e)
                : false
            }
          />
          {errors.columnTitle && <Warning>This field is required</Warning>}
        </Form>

        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            cardId={card.id}
            description={card.description}
            comments={card.comments}
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

        <Form onSubmit={handleSubmit(cardSubmit)}>
          <AddCardHeader
            onClick={(e: React.SyntheticEvent) => {
              let target = e.target;

              if ((target as HTMLElement).tagName !== "H4") return;
              editElem(target as HTMLElement);
            }}
          >
            + Добавить карточку
          </AddCardHeader>
          <ColEdit
            {...register("cardTitle", { required: true })}
            onBlur={(e: React.SyntheticEvent) => endEditColumn(e)}
          />

          {errors.cardTitle && <Warning>This field is required</Warning>}

          <RemoveColumn onClick={() => removeCol(id)}>
            Удалить колонку
          </RemoveColumn>
        </Form>
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

  &.active ~ span {
    display: block;
  }

  cursor: pointer;
`;

const RemoveColumn = styled.p`
  background: transparent;
  cursor: pointer;
  float: right;
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

  &.active ~ input {
    display: block;
  }

  cursor: pointer;
`;

//const AddCardTextArea = styled.textarea`
//  width: 100%;
//  display: none;

//  margin-bottom: 25px;
//`;

const Form = styled.form``;
