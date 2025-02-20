"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { handleFormAction } from "./actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="block" disabled={pending}>
      Submit
    </Button>
  );
};

export const FormDemo = () => {
  const handleSubmit = async (formData: FormData) => {
    const result = await handleFormAction(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <form action={handleSubmit} className="flex flex-col gap-2 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" className="max-w-sm" />
      </div>
      <div className="flex flex-row">
        <SubmitButton />
      </div>
    </form>
  );
};
