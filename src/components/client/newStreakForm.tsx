"use client";
import { useState, useEffect, useRef, RefObject, SetStateAction } from "react";
import Form from "../ui/Form";
import { FormFieldData, FieldSet, UserFieldSet } from "@/types/all";
import FormField from "../ui/FormField";
import { Streak } from "@prisma/client";

export default function NewStreakForm() {

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
    if (currentFocusRef?.current) {
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
          value: "false",
        },
      ],
      userFieldSet: true,
      userFieldIndex,
    };
    setFieldSets([...fieldSets, newUserFieldSet]);
  }

  const removeUserField = (index: number) => () => {
    const workingFieldSets = [...fieldSets];
    workingFieldSets.splice(index, 1);
    setFieldSets(workingFieldSets);
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
      <form className="w-4/5 max-w-[30rem] mx-auto" onSubmit={handleSubmit}>
        {fieldSets?.map((fieldSet, index) => {
          if ((fieldSet as UserFieldSet).userFieldSet) {
            const { userFieldSet, userFieldIndex, fields } = fieldSet as UserFieldSet;
            return (
              <div key={index} className="border-2 rounded-lg border-current p-2 bg-anti-plum-950 flex flex-row flex-wrap space-x-4">
                <h2>User Field {userFieldIndex}</h2>
                {fields.map((field, fIndex) => {
                  const fieldData = {
                    ...field,
                    onChange: (val: string, ref: RefObject<any>) => {
                      updateFeildSet(index, field.id, val, ref);
                      setCurrentFocusRef(ref);
                    },
                  }
                  return (
                    <div key={fIndex}>
                      <FormField fieldData={fieldData} />
                    </div>
                  )
                })}
                <button onClick={removeUserField(index)} type='button'>➖ remove user field</button>
              </div>
            )
          } else {
            return (
              fieldSet.fields.map((field, fIndex) => {
                const fieldData = {
                  ...field,
                  onChange: (val: string, ref: RefObject<any>) => {
                    updateFeildSet(index, field.id, val, ref);
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
          }
        })}
        <button onClick={addUserField} >➕ add user field</button>
        <button type="submit">Submit</button>
      </form>
      {/* {fieldSets.map((fieldSet, index) => {
        return (
          <div>
            {fieldSet.fields.map((field, fIndex) => {
              return (
                <div key={fIndex}>
                  {field.id}: {field.value}
                </div>
              )
            })}
          </div>
        )
      })} */}
    </>
  );
}