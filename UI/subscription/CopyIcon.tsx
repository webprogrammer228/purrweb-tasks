import * as React from "react";
import styled from "styled-components";
import media from "styled-media-query";

export const CopyIcon = ({
  height,
  width,
  color,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: "45px",
        right: "15px",
        cursor: "pointer",
      }}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M21 20.999H27V4.99902H11V10.999"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9999 10.999H4.99988V26.999H20.9999V10.999Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
