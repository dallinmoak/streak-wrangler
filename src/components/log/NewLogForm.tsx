'use client';

import { FormFieldData } from "@/types/all";
import { StreakField } from "@prisma/client";
import Form from "../ui/Form";

export default function NewLogForm({ fields }: { fields: StreakField[] }) {

  const initialFields: FormFieldData[] = fields.map((field: any, index: number) => {
    const toCamelCase = (str: string) => {
      return str
        .replace(/\s(.)/g, (match, group1) => group1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/^(.)/, (match, group1) => group1.toLowerCase());
    };
    const id = `${index}-${toCamelCase(field.name)}`;

    return {
      id,
      label: field.name,
      name: id,
      type: field.type,
      placeholder: field.description,
      required: false,
    }
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const logData = Object.fromEntries(formData.entries());
    console.log('submitting log', logData);
  };

  return (
    <>
      <h1>New Log form</h1>
      <Form fieldsData={initialFields} submitHandler={submitHandler} />
    </>
  )
};