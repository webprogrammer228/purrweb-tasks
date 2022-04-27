import { useState, useEffect } from "react";
import Board from "./components/Board";
import GreetingPopup from "./components/GreetingPopup";
import "./index.css";
import { CardType, ColumnType, CommentType } from "./types/type";

function App() {
  //localStorage.clear();
  const name: string | null = localStorage.getItem("name");
  const [isGreeting, setIsGreeting] = useState(Boolean(name));

  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: 0,
      title: "TODO",
      cards: [],
    },
    {
      id: 1,
      title: "In Progress",
      cards: [],
    },
    {
      id: 2,
      title: "Testing",
      cards: [],
    },
    {
      id: 3,
      title: "Done",
      cards: [],
    },
  ]);

  const [cards, setCards] = useState<CardType[]>([]);

  const [description, setDescription] = useState<string>("");

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    if (localStorage.getItem("columns") === null) {
      localStorage.setItem("columns", JSON.stringify(columns));
    } else if (JSON.parse(localStorage.getItem("columns")!) !== columns) {
      setColumns(JSON.parse(localStorage.getItem("columns")!));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.getItem("name") === null
      ? localStorage.setItem("name", "")
      : localStorage.getItem("name");
  }, []);

  return (
    <div className="App">
      {!isGreeting ? (
        <GreetingPopup closeWindow={() => setIsGreeting(true)} />
      ) : (
        <Board
          name={name}
          columns={columns}
          setColumns={setColumns}
          cards={cards}
          setCards={setCards}
          description={description}
          setDescription={setDescription}
          comments={comments}
          setComments={setComments}
        />
      )}
    </div>
  );
}

export default App;
