import React from "react";
import { Stage } from "../UI/Stage";
import { Stages } from "../UI/form/Stages";
import { v4 as uuidv4 } from "uuid";

type StagesProps = {
  index: number;
};

const StageComponent: React.FC<StagesProps> = ({ index }) => {
  const data = [
    { title: "Create Account" },
    { title: "Log In" },
    { title: "Checkout" },
  ];
  return (
    <Stages>
      {data.map((d, id) => (
        <Stage key={uuidv4()} title={d.title} idd={id} index={index} />
      ))}
    </Stages>
  );
};

export default StageComponent;
