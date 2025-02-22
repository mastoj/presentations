import { Column, Columns } from "@/components/columns";
import { Toaster } from "@/components/ui/sonner";
import { ClientDemo } from "./_components/client-demo";
import { FormDemo } from "./_components/form-demo";

export const generateStaticParams = async () => {
  return [{ code: "" }];
};

const ServerActionsPage = async () => {
  return (
    <>
      <Toaster />
      <Columns columns={2} className="m-20">
        <Column>
          <FormDemo />
        </Column>
        <Column>
          <ClientDemo />
        </Column>
      </Columns>
    </>
  );
};

export default ServerActionsPage;
