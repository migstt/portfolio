// app/components/ThemeSwitcher.tsx
"use client";

import React from "react";
// import {Switch, VisuallyHidden, useSwitch} from "@nextui-org/react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { useTheme } from "next-themes";

const ThemeSwitch = (props: any) => {
  const { theme, setTheme } = useTheme()
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? (
            <>
              <SunIcon />
              {setTheme('light')}
            </>
          ) : (
            <>
              <MoonIcon />
              {setTheme('dark')}
            </>      
          )}
        </div>
      </Component>
    </div>
  )
}


export default function ThemeSwitcher() {
  return <ThemeSwitch />
}
