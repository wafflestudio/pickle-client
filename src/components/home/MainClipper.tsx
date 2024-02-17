import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

// TODO: export 다시
export default function MainClipper(props: Props) {
  return (
    <svg
      width="390"
      height="480"
      viewBox="0 0 390 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M125.41 0H0V232.84L125.312 305.189L125.41 0Z" fill="white" />
        <path
          d="M0 457.663V232.63L194.812 345.188L0 457.663Z"
          fill="white"
          fillOpacity="0.8"
        />
        <path
          d="M264.205 480H0V457.426L264.205 305V480Z"
          fill="white"
          fillOpacity="0.6"
        />
        <path
          d="M389.999 297.503V480H264.012L264.094 224.811L389.999 297.503Z"
          fill="white"
          fillOpacity="0.4"
        />
        <path
          d="M390 297.712V71.9937L194.594 184.811L390 297.712Z"
          fill="white"
          fillOpacity="0.2"
        />
      </g>
    </svg>
  );
}
