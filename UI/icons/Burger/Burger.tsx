import * as React from "react";

const Burger = ({
  height = "42px",
  width = "42px",
  color = "white",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ cursor: "pointer", zIndex: "2" }}
    >
      <line
        x1="4"
        y1="5"
        x2="20"
        y2="5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="19"
        x2="20"
        y2="19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Burger;
