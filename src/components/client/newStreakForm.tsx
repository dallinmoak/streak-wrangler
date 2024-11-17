'use client';
import { ReactNode } from "react";
import Form from "../ui/Form";
import { FormFieldData } from "@/types/all";
import { useState } from "react";
import FormField from "../ui/FormField";

type UserField = {
  label: FormFieldData; // text
  type: FormFieldData; // select
  required: FormFieldData; // checkbox
}
export default function NewStreakForm() {

  const [userFields, setUserFields] = useState<UserField[]>([]);

  const userFieldTemplate = (id: string): UserField => {
    const labelField: FormFieldData = {
      id: `user-field-${id}-label`,
      label: "",
      name: `user-field-${id}-label`,
      required: true
    };
    const typeField: FormFieldData = {
      id: `user-field-${id}-type`,
      label: "",
      name: `user-field-${id}-type`,
      type: "select",
      options: [
        { value: "text", label: "Text" },
        { value: "number", label: "Number" }
      ]
    };
    const requiredField: FormFieldData = {
      id: `user-field-${id}-required`,
      label: "",
      name: `user-field-${id}-required`,
      type: "checkbox"
    };
    const userField: UserField = {
      label: labelField,
      type: typeField,
      required: requiredField
    };
    return userField;
  }

  const userFieldElements = userFields.map((userField, index) => {
    return (
      <>
        <h2>User Field {index + 1}</h2>
        <div className="flex flex-row space-x-4">
          <FormField fieldData={userField.label} />
          <FormField fieldData={userField.type} />
          <FormField fieldData={userField.required} />
        </div>
      </>
    );
  });

  const addUserField = () => {
    setUserFields([...userFields, userFieldTemplate(userFields.length.toString())]);
  }

  const fields: (FormFieldData | ReactNode)[] = [
    { id: "new-streak-name", label: "New Streak Name", name: "name", required: true },
    { id: "new-streak-description", label: "New Streak Description", name: "description", required: true },
    <h2>UserFields:</h2>,
    ...userFieldElements,
    <button id='add-user-field' onClick={addUserField}>Add User Field</button>
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  }

  return (
    <>
      <Form fieldsData={fields} submitHandler={handleSubmit} />
      {/* {JSON.stringify(userFields)} */}
    </>
  )
}