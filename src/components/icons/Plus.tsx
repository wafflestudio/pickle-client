import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function PlusIcon(props: Props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.5 6.5H0V5.5H5.5V0H6.5V5.5H12V6.5H6.5V12H5.5V6.5Z"
        fill={props.color ?? "black"}
      />
    </svg>
  );
}
