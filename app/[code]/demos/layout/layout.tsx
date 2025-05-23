import { PropsWithChildren } from "react";
import FadeInComponent from "./_components/fade-in-component";
import Menu from "./_components/menu";

const DemoLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[400px_auto] h-screen w-screen">
      <div className="flex flex-col border-r h-screen shadow-md bg-primary/10 p-8">
        <FadeInComponent>
          <Menu />
        </FadeInComponent>
      </div>
      <div className="flex flex-col gap-2 justify-stretch">
        <FadeInComponent>
          <h1 className="text-2xl font-bold w-full p-8">Layout demo</h1>
          <div className="p-8 flex-1">{children}</div>
        </FadeInComponent>
      </div>
    </div>
  );
};

export default DemoLayout;
