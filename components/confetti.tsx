"use client";
import React from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize, useIsClient } from "usehooks-ts";

export const Confetti = () => {
  const { width, height } = useWindowSize();
  const isClient = useIsClient();
  if (!isClient) return null;
  console.log("Confetti render", { width, height });
  return <ReactConfetti width={width} height={height} />;
};
