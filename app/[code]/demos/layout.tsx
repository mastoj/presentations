import { PropsWithChildren } from "react";

export const generateStaticParams = () => {
  return [{ code: "" }];
};

const DemoLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-screen w-screen">{children}</div>;
};

export default DemoLayout;
