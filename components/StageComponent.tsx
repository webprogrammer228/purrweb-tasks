import React from "react";
import { Stage } from "../UI/stage";
import { Stages } from "../UI/form/components/Stages";
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
        <Stage key={uuidv4()} title={d.title} index={index} dataIndex={id} />
      ))}
    </Stages>
  );
};

export default StageComponent;
