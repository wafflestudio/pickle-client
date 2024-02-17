import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function FlagIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      {...props}
    >
      <path
        d="M8.44594 6.33942L10.9532 9.44245H2H1.5V2.60791H2H10.9532L8.44594 5.71094L8.19203 6.02518L8.44594 6.33942Z"
        stroke={props?.color || "#000"}
      />
    </svg>
  );
}
