import { SVGAttributes } from "react";

type Props = SVGAttributes<SVGElement>;

export default function Sample(props: Props) {
  return <svg {...props}></svg>;
}
