import React from "react";

const Check = ({
  height = "26px",
  width = "26px",
  color = "white",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "14px" }}
      {...props}
    >
      <path
        d="M13 26C20.1799 26 26 20.1799 26 13C26 5.8201 20.1799 0 13 0C5.8201 0 0 5.8201 0 13C0 20.1799 5.8201 26 13 26Z"
        fill={color}
      />
      <path
        d="M7.1167 13.8406L10.4785 17.2024L18.8831 8.79785"
        stroke="#272727"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Check;
