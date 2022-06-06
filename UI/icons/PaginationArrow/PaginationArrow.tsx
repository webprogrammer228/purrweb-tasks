import * as React from "react";

const PaginationArrow = ({
  height = "24px",
  width = "24px",
  color = "white",
  rotate,
  ...props
}: React.SVGProps<SVGSVGElement> & { rotate: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ transform: `rotate(${rotate})` }}
    >
      <path
        d="M11.4609 3.53906L3.00007 11.9999L11.4609 20.4608"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.00009 12L21 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PaginationArrow;