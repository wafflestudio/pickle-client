import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function CardClipper(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="170"
      viewBox="0 0 170 170"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M170 0H0V170H170V0ZM125 61.5L84.5 38L44 61.5V108.5L84.5 132L125 108.5V61.5Z"
        fill={props?.color || "#fff"}
      />
    </svg>
  );
}
