"use client";

import { ReactNode } from "react";

type ChipProps = {
  text: string | ReactNode;
  type?: "success" | "warning" | "error" | "info" | "default";
};

export function Chip({ text, type = "default" }: ChipProps) {
  const colorClasses = {
    success: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    error: "bg-red-200 text-red-800",
    info: "bg-blue-200 text-blue-800",
    default: "bg-gray-200 text-gray-800",
  };

  const classes = `
    px-2
    py-1
    rounded-full
    font-light
    text-[0.6rem]
    lowercase
    inline-block
    ${colorClasses[type]}
  `;

  return <span className={classes}>{text}</span>;
}
