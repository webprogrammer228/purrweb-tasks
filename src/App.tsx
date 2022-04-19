import { useState, useEffect } from "react";
import Board from "./components/Board";
import GreetingPopup from "./components/GreetingPopup";
import "./index.css";

function App() {
  //localStorage.clear();
  const [isGreeting, setIsGreeting] = useState(false);
  const data: { id: number; name: string }[] = [
    { id: 0, name: "TODO" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Testing" },
    { id: 3, name: "Done" },
  ];

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(data));

    localStorage.getItem("name") === null
      ? localStorage.setItem("name", "")
      : localStorage.getItem("name");
  }, []);

  const name: string = localStorage.getItem("name")!;

  return (
    <div className="App">
      {!isGreeting && name === "" ? (
        <GreetingPopup closeWindow={() => setIsGreeting(true)} />
      ) : (
        <Board name={name} data={data} />
      )}
    </div>
  );
}

export default App;
