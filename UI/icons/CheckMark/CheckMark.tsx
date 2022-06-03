import * as React from "react";

const CheckMark = ({
  height = "24px",
  width = "25px",
  color = "white",
  isShow,
  ...props
}: React.SVGProps<SVGSVGElement> & { isShow?: boolean }) => {
  return (
    <svg
      style={{
        marginLeft: "7px",
        transform: isShow ? "rotate(180deg)" : "",
        transition: "all .5s",
      }}
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.31152 8.5L12.3115 15.5L19.3115 8.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckMark;
