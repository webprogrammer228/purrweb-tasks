import * as React from "react";

export const FBIcon = ({
  height = "36px",
  width = "36px",
  color = "#ffffff",
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.002 30.7233V19.4944H23.9608L24.5535 15.1183H20.0019V12.3243C20.0019 11.0573 20.3714 10.1939 22.2798 10.1939L24.7137 10.1928V6.27886C24.2928 6.22563 22.8479 6.10645 21.1671 6.10645C17.6578 6.10645 15.2553 8.14578 15.2553 11.891V15.1183H11.2864V19.4944H15.2553V30.7232H20.002V30.7233Z"
        fill={color}
      />
    </svg>
  );
};
