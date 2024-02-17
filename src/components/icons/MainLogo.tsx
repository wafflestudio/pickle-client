import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function MainLogoIcon({ color = "white", ...props }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <path
        d="M27.0588 74.9075L3.38672 51.2713"
        stroke={color}
        strokeWidth="4"
      />
      <path
        d="M74.8743 73.1183L51.3438 96.6132"
        stroke={color}
        strokeWidth="4"
      />
      <path d="M83.9531 48.7287V82.0407" stroke={color} strokeWidth="4" />
      <path
        d="M96.6146 48.7287L73.084 25.2338"
        stroke={color}
        strokeWidth="4"
      />
      <path d="M48.7969 16.1466H82.0415" stroke={color} strokeWidth="4" />
      <path d="M25.125 27.023L48.7971 3.3868" stroke={color} strokeWidth="4" />
      <path d="M51.3431 83.8299H17.957" stroke={color} strokeWidth="4" />
      <path d="M16.166 51.2713V18.077" stroke={color} strokeWidth="4" />
    </svg>
  );
}
