"use client";
import { useState, useEffect, useRef, RefObject, SetStateAction } from "react";
import Form from "../ui/Form";
import { FormFieldData } from "@/types/all";
import FormField from "../ui/FormField";
import { Streak } from "@prisma/client";

export default function NewStreakForm() {

  type FieldSet = baseFieldSet | UserFieldSet;

  type baseFieldSet = {
    fields: FormFieldData[];
  };

  type UserFieldSet = baseFieldSet & {
    userFieldSet: boolean;
    userFieldIndex: number;
  };

  const [fieldSets, setFieldSets] = useState<FieldSet[]>([
    {
      fields: [
        {
          id: "name",
          label: "Name",
          name: "name",
          required: true,
          value: "",
          placeholder: "Name of the streak",
        },
        {
          id: "description",
          label: "Description",
          name: "description",
          type: "textarea",
          required: true,
          value: "",
          placeholder: "Description of the streak",
        },
        {
          id: "interval",
          label: "Repeat Interval",
          name: "interval",
          type: "number",
          required: true,
          value: "1",
          placeholder: "Repeat every...",
        },
        {
          id: "intervalUnit",
          label: "Repeat Interval Unit",
          name: "intervalUnit",
          type: "select",
          required: true,
          value: "days",
          options: [
            { value: "days", label: "Days" },
            { value: "weeks", label: "Weeks" },
            { value: "months", label: "Months" },
            { value: "years", label: "Years" },
          ],
        },
      ],
    },
  ]);

  const [currentFocusRef, setCurrentFocusRef] = useState<React.RefObject<any>>();

  useEffect(() => {
    const focusField = (ref: any) => {
      ref.current.focus();
      if (ref.current.tagName === "TEXTAREA") {
        ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length);
      }
    };
    if (currentFocusRef) {
      focusField(currentFocusRef);
    }
  }, [fieldSets]);

  const defaultInterval = "1";
  const defaultIntervalUnit = "days";

  const updateFeildSet = ((setIndex: number, fieldId: string, value: string, ref: React.RefObject<any>) => {
    const workingFieldSets = [...fieldSets];
    workingFieldSets[setIndex].fields = workingFieldSets[setIndex].fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, value, ref };
      }
      return field;
    });
    setFieldSets(workingFieldSets);
  });

  const addUserField = () => {
    const userFieldIndex = fieldSets.filter((fieldSet) => {
      return (fieldSet as UserFieldSet).userFieldSet;
    }).length + 1;
    const newUserFieldSet: UserFieldSet = {
      fields: [
        {
          id: `user-field-${userFieldIndex}-label`,
          label: "Label",
          name: `user-field-${userFieldIndex}-label`,
          required: true,
          value: "",
          placeholder: "Field label",
        },
        {
          id: `user-field-${userFieldIndex}-type`,
          label: "Type",
          name: `user-field-${userFieldIndex}-type`,
          type: "select",
          required: true,
          value: "",
          options: [
            { value: "tap", label: "Tap (simple completion)" },
            { value: "duration", label: "Duration" },
            { value: "count", label: "Count" },
            { value: "text", label: "Text (custom note)" },
          ],
        },
        {
          id: `user-field-${userFieldIndex}-description`,
          label: "Description",
          name: `user-field-${userFieldIndex}-description`,
          type: "textarea",
          required: true,
          value: "",
          placeholder: "Field description",
        },
        {
          id: `user-field-${userFieldIndex}-required`,
          label: "Required",
          name: `user-field-${userFieldIndex}-required`,
          type: "checkbox",
          value: "",
        },
      ],
      userFieldSet: true,
      userFieldIndex,
    };
    setFieldSets([...fieldSets, newUserFieldSet]);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );
    const userFieldIds = Array.from(new Set(
      Object.entries(formData)
        .filter((field) => {
          return field[0].includes("user-field");
        })
        .map((field) => {
          return field[0].split("-")[2]
        })
    ));

    const userFieldsData = userFieldIds.map((id) => {
      const name = formData[`user-field-${id}-label`] as string;
      const type = formData[`user-field-${id}-type`] as string;
      const description = formData[`user-field-${id}-description`] as string;
      const required = formData[`user-field-${id}-required`] === "";
      return { name, type, description, required };
    });
    const newStreak: Streak = {
      id: "",
      ownerId: "",
      name: formData.name as string,
      description: formData.description as string,
      config: {
        repeatInterval: JSON.stringify({
          interval: formData.interval as string ?? defaultInterval,
          unit: formData.intervalUnit as string ?? defaultIntervalUnit,
        }),
        fields: userFieldsData
      }
    };
    console.log(newStreak);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fieldSets?.map((fieldSet, index) => {
          return (
            fieldSet.fields.map((field, fIndex) => {
              const fieldData = {
                ...field,
                onChange: (e: any, ref: RefObject<any>) => {
                  updateFeildSet(index, field.id, e.target.value, ref);
                  setCurrentFocusRef(ref);
                },
              }
              return (
                <div key={fIndex}>
                  <FormField fieldData={fieldData} />
                </div>
              )
            })
          )
        })}
        <button onClick={addUserField} >➕ add user field</button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}