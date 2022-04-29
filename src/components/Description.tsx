import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import {
  addDescription,
  editDescription,
  removeDescription,
} from "../store/addColumnsSlice";
import { editElem } from "./Board";
import { CurrentCard } from "./CardDetails";

const Description: React.FC = () => {
  const currentCard = useSelector<RootState, CurrentCard>(
    (state) => state.columns.currentCard
  );

  const dispatch = useDispatch();

  const [descriptionCard, setDescriptionCard] = useState(String(""));
  const [currentDescription, setCurrentDescription] = useState(String(""));

  const appendDescription = () =>
    dispatch(addDescription({ currentCard, descriptionCard }));

  const deleteDescription = () => dispatch(removeDescription({ currentCard }));

  const redactDescription = () =>
    dispatch(editDescription({ currentCard, currentDescription }));

  const hideElem = (e: React.SyntheticEvent) => {
    e.currentTarget.classList.add("hidden");
  };

  return (
    <React.Fragment>
      {currentCard.description !== "" ? (
        <React.Fragment>
          <CardDescriptionName
            onClick={(e: React.SyntheticEvent) => {
              let target = e.target;

              if ((target as HTMLElement).tagName !== "H3") return;
              editElem(target as HTMLElement);
            }}
          >
            {currentCard.description}
          </CardDescriptionName>

          <ColEdit
            defaultValue={currentCard.description}
            onChange={(e) => setCurrentDescription(e.currentTarget.value)}
            onBlur={(e) =>
              e.currentTarget.value.trim() !== "" ? redactDescription() : false
            }
            onKeyDown={(e) =>
              e.key === "Enter" && e.currentTarget.value.trim() !== ""
                ? redactDescription()
                : false
            }
          />

          <CardDeleteDescription
            onClick={(e) => deleteDescription() && hideElem(e)}
          >
            Удалить описание
          </CardDeleteDescription>
        </React.Fragment>
      ) : (
        <CardDescriptionTextarea
          placeholder="Введите описание карточки"
          onChange={(e) =>
            e.currentTarget.value.trim() !== ""
              ? setDescriptionCard(e.currentTarget.value)
              : false
          }
          onKeyDown={(e) =>
            e.key === "Enter" && e.currentTarget.value !== ""
              ? appendDescription()
              : false
          }
        ></CardDescriptionTextarea>
      )}
    </React.Fragment>
  );
};

export default Description;

const CardDescriptionTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;

  font-size: 20px;
  margin-bottom: 25px;

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
  margin: 10px 0 25px 0;
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
