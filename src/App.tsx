import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Board from "./components/Board/Board";
import GreetingPopup from "./components/GreetingPopup/GreetingPopup";
import "./index.css";
import { RootState } from "./store";
import { ColumnType } from "./types/type";

function App() {
  const name: string | null = localStorage.getItem("name");
  const [isGreeting, setIsGreeting] = useState(Boolean(name));

  const columns = useSelector<RootState, ColumnType[]>(
    (state) => state.columns.columns
  );
  //что делает этот юзэффект?
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
        <Board name={name} columns={columns} />
      )}
    </div>
  );
}

export default App;
