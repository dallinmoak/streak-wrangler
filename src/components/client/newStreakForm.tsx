"use client";
import { ReactNode } from "react";
import Form from "../ui/Form";
import { FormFieldData } from "@/types/all";
import { useState } from "react";
import FormField from "../ui/FormField";

type UserField = {
  label: FormFieldData; // text
  type: FormFieldData; // select
  description?: FormFieldData; // textarea
  required: FormFieldData; // checkbox
};
export default function NewStreakForm() {
  const [userFields, setUserFields] = useState<UserField[]>([]);

  const userFieldTemplate = (id: string): UserField => {
    const labelField: FormFieldData = {
      id: `user-field-${id}-label`,
      label: "label",
      name: `user-field-${id}-label`,
      required: true,
    };
    const typeField: FormFieldData = {
      id: `user-field-${id}-type`,
      label: "type",
      name: `user-field-${id}-type`,
      type: "select",
      options: [
        { value: "tap", label: "Tap" },
        { value: "duration", label: "Duration" },
        { value: "count", label: "Count" },
        { value: "text", label: "Text" },
      ],
    };
    const descriptionField: FormFieldData = {
      id: `user-field-${id}-description`,
      label: "description",
      name: `user-field-${id}-description`,
      type: "textarea",
    };
    const requiredField: FormFieldData = {
      id: `user-field-${id}-required`,
      label: "required",
      name: `user-field-${id}-required`,
      type: "checkbox",
    };
    const userField: UserField = {
      label: labelField,
      type: typeField,
      description: descriptionField,
      required: requiredField,
    };
    return userField;
  };

  const removeUserField = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.id.split("-")[2]) - 1;
    setUserFields((prev) => {
      const newFields = [...prev];
      newFields.splice(index, 1);
      return newFields;
    });
  };

  const userFieldElements = userFields.map((userField, index) => {
    return (
      <>
        <h2>User Field {index + 1}</h2>
        <div className="border-2 rounded-lg border-current p-2 bg-anti-plum-950 flex flex-row flex-wrap space-x-4">
          {Object.values(userField).map((field, index) => {
            return <FormField key={index} fieldData={field} />;
          })}
          <button id={`remove-field-${index + 1}`} onClick={removeUserField}>
            ❌
          </button>
        </div>
      </>
    );
  });

  const addUserField = () => {
    setUserFields([
      ...userFields,
      userFieldTemplate((userFields.length + 1).toString()),
    ]);
  };

  const fields: (FormFieldData | ReactNode)[] = [
    {
      id: "new-streak-name",
      label: "New Streak Name",
      name: "name",
      required: true,
    },
    {
      id: "new-streak-description",
      label: "New Streak Description",
      name: "description",
      required: true,
      type: "textarea",
    },
    <h2>UserFields:</h2>,
    ...userFieldElements,
    <button id="add-user-field" onClick={addUserField}>
      ➕ Add field
    </button>,
    {
      id: "new-streak-interval",
      label: "New Streak Interval",
      name: "interval",
      required: true,
      type: "number",
      defaultValue: "1",
      disabled: true,
    },
    {
      id: "new-strea-interval-unit",
      label: "New Streak Interval Unit",
      name: "intervalUnit",
      required: true,
      type: "select",
      options: [
        { value: "days", label: "Days" },
        { value: "weeks", label: "Weeks" },
        { value: "months", label: "Months" },
        { value: "years", label: "Years" },
      ],
      defaultValue: "days",
      disabled: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    console.log(formData);
  };

  return (
    <>
      <Form fieldsData={fields} submitHandler={handleSubmit} />
    </>
  );
}