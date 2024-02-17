import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function FlagIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.83485 5.52518L12 1.60791H2V0.5H1V11.5H2V9.44245H12L8.83485 5.52518ZM9.90636 8.44245L7.54922 5.52518L9.90636 2.60791H2V8.44245H9.90636Z"
        fill={props?.color || "black"}
      />
    </svg>
  );
}
