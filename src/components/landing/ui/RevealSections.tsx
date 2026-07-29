import { Children, ReactNode } from "react";
import { Reveal } from "./Reveal";

/*
 * Wraps each child in a Reveal. The page previously repeated
 * `<Reveal><Section /></Reveal>` six times, so adding a section meant
 * remembering the wrapper — easy to forget and easy to get inconsistent.
 *
 * Children stay as JSX elements rather than component references, which keeps
 * async server components (StravaStrip) type-checking cleanly.
 */

export function RevealSections({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <Reveal key={index}>{child}</Reveal>
      ))}
    </>
  );
}
