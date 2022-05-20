import * as React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export const Logo = ({
  height = "42px",
  width = "42px",
  color = "white",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => {
  const router = useRouter();

  return (
    <Wrapper onClick={() => router.push("/")}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 43 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M21.689 21.8401L42.689 21.4202V20.5801L21.689 20.1602V21.8401Z"
          fill={secondaryColor}
        />
        <path
          d="M22.1091 10.4999H21.269L20.8491 0H22.529L22.1091 10.4999Z"
          fill={color}
        />
        <path
          d="M21.269 31.5H22.1091L22.529 41.9999H20.8491L21.269 31.5Z"
          fill={color}
        />
        <path
          d="M11.1889 20.5801V21.4202L0.688965 21.8401V20.1602L11.1889 20.5801Z"
          fill={color}
        />
        <path
          d="M29.4108 13.8722L28.8169 13.2783L35.9444 5.55664L37.1323 6.74467L29.4108 13.8722Z"
          fill={color}
        />
        <path
          d="M13.9673 28.1279L14.5612 28.7218L7.43363 36.4435L6.24561 35.2555L13.9673 28.1279Z"
          fill={color}
        />
        <path
          d="M28.8169 28.7218L29.4108 28.1279L37.1323 35.2555L35.9444 36.4435L28.8169 28.7218Z"
          fill={color}
        />
        <path
          d="M14.5612 13.2781L13.9673 13.872L6.24561 6.74446L7.43363 5.55664L14.5612 13.2781Z"
          fill={color}
        />
        <path
          d="M18.0587 11.1387L17.2827 11.4602L12.8765 1.92028L14.4285 1.27734L18.0587 11.1387Z"
          fill={color}
        />
        <path
          d="M25.3193 30.8615L26.0954 30.54L30.5016 40.0799L28.9493 40.7229L25.3193 30.8615Z"
          fill={color}
        />
        <path
          d="M11.8277 24.6299L12.1491 25.4059L2.60924 29.8122L1.96631 28.2601L11.8277 24.6299Z"
          fill={color}
        />
        <path
          d="M26.0954 11.4602L25.3193 11.1387L28.9493 1.27734L30.5016 1.92028L26.0954 11.4602Z"
          fill={color}
        />
        <path
          d="M17.2827 30.54L18.0587 30.8615L14.4285 40.7229L12.8765 40.0799L17.2827 30.54Z"
          fill={color}
        />
        <path
          d="M31.229 25.4059L31.5503 24.6299L41.4118 28.2601L40.7689 29.8122L31.229 25.4059Z"
          fill={color}
        />
        <path
          d="M12.1491 16.5937L11.8277 17.3698L1.96631 13.7396L2.60924 12.1875L12.1491 16.5937Z"
          fill={color}
        />
        <path
          d="M20.0522 10.6204L19.2284 10.7842L16.7681 0.567959L18.4159 0.240234L20.0522 10.6204Z"
          fill={color}
        />
        <path
          d="M23.3252 31.3806L24.149 31.2168L26.6095 41.433L24.9617 41.7607L23.3252 31.3806Z"
          fill={color}
        />
        <path
          d="M11.3089 22.6367L11.4727 23.4607L1.25644 25.9211L0.928711 24.2733L11.3089 22.6367Z"
          fill={color}
        />
        <path
          d="M27.8713 12.5026L27.1729 12.036L32.657 3.07227L34.0538 4.00558L27.8713 12.5026Z"
          fill={color}
        />
        <path
          d="M15.506 29.4971L16.2044 29.9639L10.7201 38.9277L9.32324 37.9941L15.506 29.4971Z"
          fill={color}
        />
        <path
          d="M30.186 27.1828L30.6527 26.4844L39.6164 31.9687L38.6831 33.3656L30.186 27.1828Z"
          fill={color}
        />
        <path
          d="M13.1916 14.8175L12.725 15.5159L3.76123 10.0316L4.69476 8.63477L13.1916 14.8175Z"
          fill={color}
        />
        <path
          d="M16.2044 12.036L15.506 12.5026L9.32324 4.00558L10.7201 3.07227L16.2044 12.036Z"
          fill={color}
        />
        <path
          d="M27.1729 29.9639L27.8713 29.4971L34.0538 37.9941L32.657 38.9277L27.1729 29.9639Z"
          fill={color}
        />
        <path
          d="M30.6527 15.5159L30.186 14.8175L38.6831 8.63477L39.6164 10.0318L30.6527 15.5159Z"
          fill={color}
        />
        <path
          d="M12.725 26.4844L13.1916 27.1828L4.69455 33.3656L3.76123 31.9687L12.725 26.4844Z"
          fill={color}
        />
        <path
          d="M24.149 10.7842L23.3252 10.6204L24.9617 0.240234L26.6095 0.567959L24.149 10.7842Z"
          fill={color}
        />
        <path
          d="M19.2284 31.2168L20.0522 31.3806L18.4159 41.7607L16.7681 41.433L19.2284 31.2168Z"
          fill={color}
        />
        <path
          d="M31.9053 23.4607L32.0692 22.6367L42.4494 24.2733L42.1217 25.9211L31.9053 23.4607Z"
          fill={color}
        />
        <path
          d="M11.4727 18.5394L11.3089 19.3634L0.928711 17.7269L1.25644 16.0791L11.4727 18.5394Z"
          fill={color}
        />
      </svg>
      <LogoTitle>Gscore</LogoTitle>
    </Wrapper>
  );
};

const LogoTitle = styled.h3`
  color: #ffffff;
  font-family: "Thicccboi", sans-serif;
  text-transform: uppercase;
  font-size: 26px;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;
