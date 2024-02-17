import { HTMLAttributes } from "react";

type Props = HTMLAttributes<SVGElement>;

export default function Sample(props: Props) {
  return <svg {...props}></svg>;
}
