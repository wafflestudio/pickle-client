import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function FlagFillIcon(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <path
        d="M3.92773 22.3571V2.5H5.29883V4.5H22.1255L16.8893 11.5714L22.1255 18.6429H5.29883V22.3571H3.92773Z"
        fill={props?.color || "#fff"}
      />
    </svg>
  );
}
