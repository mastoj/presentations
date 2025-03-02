"use client";

import { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  });
  return <>{time}</>;
};

export default Time;
