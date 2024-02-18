import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function LogoIcon(props: Props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1854 1.17008L8.35706 8.98656L7.18874 7.81647L15.0171 0L16.1854 1.17008ZM26.5953 5.63144H15.6013V3.97794H26.5953V5.63144ZM5.63648 5.44309V16.4204H3.98299V5.44309H5.63648ZM30.83 16.1646L23.0484 8.39487L24.2167 7.22479L31.9983 14.9946L30.83 16.1646ZM26.4002 26.5958V15.5796H28.0537V26.5958H26.4002ZM1.16831 15.8354L8.99665 23.6518L7.82833 24.8219L0 17.0055L1.16831 15.8354ZM15.8593 30.8299L23.6408 23.0602L24.8092 24.2302L17.0276 32L15.8593 30.8299ZM5.40215 26.3608H16.4429V28.0143H5.40215V26.3608Z"
        fill={props?.color || "#000"}
        css={{ transition: "fill 0.5s" }}
      />
    </svg>
  );
}
