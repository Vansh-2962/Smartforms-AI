"use client";
import FormCard from "@/components/FormCard";
import { useParams } from "next/navigation";

const Page = () => {
  const formId = useParams().id;

  return (
    <div>
      <FormCard formId={formId} />
    </div>
  );
};

export default Page;
