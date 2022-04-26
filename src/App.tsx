import { useState, useEffect } from "react";
import Board from "./components/Board";
import GreetingPopup from "./components/GreetingPopup";
import "./index.css";

function App() {
  //localStorage.clear();
  const name: string | number | null = localStorage.getItem("name");
  const [isGreeting, setIsGreeting] = useState(Boolean(name));

  const [columns, setColumns] = useState([
    { id: 0, name: "TODO" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Testing" },
    { id: 3, name: "Done" },
  ]);

  const [cards, setCards] = useState<
    {
      name: string | undefined;
      cardId: number | undefined;
      columnId: number | undefined;
    }[]
  >([]);

  const [description, setDescription] = useState<
    {
      name: string | undefined;
      cardId: number | undefined | null;
      columnId: number | null | undefined;
    }[]
  >([]);

  const [comments, setComments] = useState<
    {
      name: string | undefined;
      cardId: number | undefined | null;
      columnId: number | null | undefined;
      commentId?: number | null | undefined;
    }[]
  >([]);

  useEffect(() => {
    if (localStorage.getItem("columns") === null) {
      localStorage.setItem("columns", JSON.stringify(columns));
    } else if (JSON.parse(localStorage.getItem("columns")!) !== columns) {
      setColumns(JSON.parse(localStorage.getItem("columns")!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("cards") === null) {
      localStorage.setItem("cards", JSON.stringify(cards));
    } else if (JSON.parse(localStorage.getItem("cards")!) !== cards) {
      setCards(JSON.parse(localStorage.getItem("cards")!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("description") === null) {
      localStorage.setItem("description", JSON.stringify(description));
    } else if (
      JSON.parse(localStorage.getItem("description")!) !== description
    ) {
      setDescription(JSON.parse(localStorage.getItem("description")!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("comments") === null) {
      localStorage.setItem("comments", JSON.stringify(comments));
    } else if (JSON.parse(localStorage.getItem("comments")!) !== comments) {
      setComments(JSON.parse(localStorage.getItem("comments")!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
