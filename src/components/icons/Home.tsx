import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGElement> {
  color?: string;
}

export default function HomeIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M9.16643 24.2497H13.4732V17.3857H18.8568V24.2497H23.1636V13.7518L16.165 8.45806L9.16643 13.7518V24.2497ZM8 25.4161V13.1686L16.165 7L24.33 13.1686V25.4161H17.6903V18.5522H14.6397V25.4161H8Z"
        fill={props?.color || "#A1A1AA"}
      />
    </svg>
  );
}
