import * as React from "react";

export const CheckMarkSubscription = ({
  height = "42px",
  width = "42px",
  color = "white",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.66406 6.90524L5.28448 10.5257L14.3355 1.47461"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
