"use client";
import FormCard from "@/components/FormCard";
import { useParams } from "next/navigation";

const Page = () => {
  const formId = useParams().id as string;

  return (
    <div>
      <FormCard formId={formId} />
    </div>
  );
};

export default Page;
