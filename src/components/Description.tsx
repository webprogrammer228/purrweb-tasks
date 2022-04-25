import React, { useState } from "react";
import styled from "styled-components";
import { description } from "../types/types";

const Description: React.FC<description> = ({
  description,
  currentCardId,
  currentColumnId,
  editElem,
  setDescription,
  deleteDescription,
  descriptionMas,
}) => {
  // For description
  const [descriptionInitialValue, setDescriptionInitialValue] = useState<{
    name: string | undefined;
    cardId: number | null | undefined;
    columnId: number | null | undefined;
  }>({
    name: "",
    cardId: 0,
    columnId: 0,
  });

  const editDescriptionName = (
    e: React.SyntheticEvent,
    id: number | null | undefined,
    descriptionInitialState: {
      cardId: number | null | undefined;
      name: string | null | undefined;
      columnId: number | null | undefined;
    }
  ) => {
    description.map((elem) =>
      elem.cardId === id ? Object.assign(elem, descriptionInitialState) : false
    );

    setDescription(description);

    localStorage.setItem("description", JSON.stringify(description));
    setDescription(JSON.parse(localStorage.getItem("description")!));

    e.currentTarget.previousElementSibling?.classList.remove("active");
  };

  const addDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    description.length === 0
      ? descriptionMas.push(descriptionInitialValue)
      : descriptionMas.push(...description, descriptionInitialValue);

    setDescription(descriptionMas);

    localStorage.setItem("description", JSON.stringify(descriptionMas));
    e.currentTarget.classList.add("hidden");
    e.currentTarget.value = "";
  };
  return (
    <>
      {description.map((elem) =>
        elem.cardId === currentCardId ? (
          <React.Fragment key={elem.cardId}>
            <CardDescriptionName
              key={elem.cardId}
              onClick={(e: React.SyntheticEvent) => {
                let target = e.target;

                if ((target as HTMLElement).tagName !== "H3") return;
                editElem(target as HTMLElement);
              }}
            >
              {elem.name}
            </CardDescriptionName>

            <ColEdit
              defaultValue={elem.name}
              onFocus={(e) =>
                setDescriptionInitialValue({
                  cardId: elem.cardId,
                  name:
                    e.currentTarget.value === ""
                      ? elem.name
                      : e.currentTarget.value,
                  columnId: currentColumnId,
                })
              }
              onChange={(e) =>
                setDescriptionInitialValue({
                  cardId: elem.cardId,
                  name:
                    e.currentTarget.value === ""
                      ? elem.name
                      : e.currentTarget.value,
                  columnId: currentColumnId,
                })
              }
              onBlur={(e) =>
                editDescriptionName(e, currentCardId, descriptionInitialValue)
              }
              onKeyDown={(e) =>
                e.key === "Enter"
                  ? editDescriptionName(
                      e,
                      currentCardId,
                      descriptionInitialValue
                    )
                  : false
              }
            />
            <CardDeleteDescription
              onClick={() => deleteDescription(currentCardId)}
            >
              Удалить описание
            </CardDeleteDescription>
          </React.Fragment>
        ) : (
          false
        )
      )}

      <CardDescriptionTextarea
        placeholder="Введите описание карточки"
        onChange={(e) =>
          e.currentTarget.value.trim() !== ""
            ? setDescriptionInitialValue({
                name: e.currentTarget.value,
                cardId: currentCardId,
                columnId: currentColumnId,
              })
            : false
        }
        onKeyDown={(e) =>
          e.key === "Enter" && e.currentTarget.value !== ""
            ? addDescription(e)
            : false
        }
      ></CardDescriptionTextarea>
    </>
  );
};

export default Description;

const CardDescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;

  font-size: 20px;

  &.hidden {
    display: none;
  }
`;
const CardDescriptionName = styled.h3`
  & ~ textarea {
    display: none;
  }

  &.active {
    display: none;
  }

  &.active ~ input {
    display: block;
  }
`;

const CardDeleteDescription = styled.button`
  width: 250px;

  border: 0;
  border-radius: 10px;

  background: lightblue;
  color: black;
  outline: 0;
  margin: 10px 0;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;

  transition: all 0.5s;

  &:hover {
    background: darkblue;
    color: white;
  }
`;

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 18px;
  outline: 0;
`;
