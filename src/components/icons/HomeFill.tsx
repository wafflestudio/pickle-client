import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function HomeFillIcon(props: Props) {
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
        d="M6.66675 26.6666V12.6667L16.0001 5.61536L25.3334 12.6667V26.6666H18.4103V18.1538H13.5898V26.6666H6.66675Z"
        fill={props?.color || "#09090B"}
      />
    </svg>
  );
}
