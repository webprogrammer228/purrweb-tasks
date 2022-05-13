import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ColumnType } from "../../types/type";
//здесь должен быть такой импорт
import { Column } from "../Column";

import { addColumn } from "../../store/addColumnsSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import {editElem} from "../../utils";

type BoardProps = {
  name: string | null;
  columns: ColumnType[];
};

type Inputs = {
  columnName: string;
};


const Board: React.FC<BoardProps> = ({ name, columns }) => {
  //any - плохо
  const blockElem = useRef<any>(null);

  const hideActiveBlock = (block: HTMLDivElement | null) => {
    block?.classList.remove("active");
    block?.children[0].classList.remove("active");
  };
  //я не поняла, для чего подписка на каждый клик. нужно пояснение. но сейчас уже видно, что это плохая идея. на абсолютно любой клик срабатывает функция
  useEffect(() => {
    //не должно быть эни. найди подходящий тип. ивент нужно типизировать
    const onClick = (e: any) =>
      blockElem.current?.contains(e.target) ||
      hideActiveBlock(blockElem.current);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const dispatch = useDispatch();

  const colAdd = (title: string) => dispatch(addColumn({ title }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    colAdd(data.columnName);
    hideActiveBlock(blockElem.current);
    reset();
  };

  return (
    <>
      <Header>
        <p>Привет, {name}</p>
      </Header>
      <Content>
        <BoardBlock>
          {columns.map((column) => (
            <Column
              key={column.id}
              /* чтобы не прокидывать все пропсы, можно использовать деструктуризацию */
              {...column}
              name={name}
            />
          ))}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AddNewCol ref={blockElem}>
              <HeaderCol
                //такие большие функции лучше выносить
                onClick={(e: React.SyntheticEvent) => {
                  let target = e.target;

                  if ((target as HTMLElement).tagName !== "H3") return;
                  editElem(target as HTMLElement);
                }}
              >
                + Добавить колонку
              </HeaderCol>

              <ColEdit
                {...register("columnName", { required: true })}
                placeholder="Введите название колонки"
              />
              {//было бы хорошо еще для редактирования названия колонки добавить такую ошибку
                errors.columnName && <Warning>This field is required</Warning>}
              <SaveButton type="submit">Сохранить</SaveButton>
            </AddNewCol>
          </Form>
        </BoardBlock>
      </Content>
    </>
  );
};

export default Board;

const BoardBlock = styled.div`
  display: flex;
  margin: 0 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background: lightblue;
  font-size: 20px;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Warning = styled.span`
  display: none;
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
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

  &.active {
    height: 112px;
  }
`;

const ColEdit = styled.input`
  width: 95%;
  height: auto;

  font-size: 18px;

  display: none;
  margin-bottom: 10px;
  outline: 0;
`;

const SaveButton = styled.button`
  display: none;
  width: 150px;
  height: 32px;
  background: lightblue;
  color: white;
  font-size: 18px;
  font-family: sans-serif;
  border: 0;
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

  &.active ~ button {
    display: block;
  }

  &.active ~ span {
    display: block;
  }

  cursor: pointer;
`;
