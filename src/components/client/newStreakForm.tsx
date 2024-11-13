'use client';
import Form from "../ui/Form";
import { FormFieldData } from "@/types/all";

export default function NewStreakForm() {
  const fields: FormFieldData[] = [
    { id: "new-streak-name", label: "Name", name: "name", required: true },
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  }

  return (
    <Form fieldsData={fields} submitHandler={handleSubmit} />
  )
}