import React, { PropsWithChildren } from "react";
import MatrixRain from "./matrix-rain";

const Title = ({ children }: PropsWithChildren) => (
  <h1 className="text-4xl md:text-6xl font-bold text-green-400">{children}</h1>
);

const SubTitle = ({ children }: PropsWithChildren) => (
  <span className="text-green-400">{children}</span>
);

const CodeTime = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MatrixRain />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 px-8 py-4 rounded flex flex-col gap-2 items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

CodeTime.Title = Title;
CodeTime.SubTitle = SubTitle;

export { CodeTime };
