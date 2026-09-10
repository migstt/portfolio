import { Children, ReactNode } from "react";
import { Reveal } from "./Reveal";

export function RevealSections({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <Reveal key={index}>{child}</Reveal>
      ))}
    </>
  );
}
