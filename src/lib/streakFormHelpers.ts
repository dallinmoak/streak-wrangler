import { FieldSet, UserFieldSet } from "@/types/all";
import { Streak } from "@prisma/client";

export const newStreakFormInitialFields: FieldSet[] = [
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
]

export const newUserFieldSetDefaults = (userFieldIndex: string): UserFieldSet => {
  return {
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
    userFieldIndex: parseInt(userFieldIndex),
  }
}

export const buildStreakObject = (formData: FormData, ownerId: string): Streak => {
  const defaultInterval = "1";
  const defaultIntervalUnit = "days";
  const formDataObj = Object.fromEntries(
    formData.entries(),
  );
  const userFieldIds = Array.from(new Set(
    Object.entries(formDataObj)
      .filter((field) => {
        return field[0].includes("user-field");
      })
      .map((field) => {
        return field[0].split("-")[2]
      })
  ));

  const userFieldsData = userFieldIds.map((id) => {
    const name = formDataObj[`user-field-${id}-label`] as string;
    // const rawType = formDataObj[`user-field-${id}-type`] as string;
    // const typeMap = {
    //   tap: "checkbox",
    //   duration: "number",
    //   count: "number",
    //   text: "text",
    // }
    // const type = typeMap[rawType as keyof typeof typeMap];
    const type = formDataObj[`user-field-${id}-type`] as string;
    const description = formDataObj[`user-field-${id}-description`] as string;
    const required = formDataObj[`user-field-${id}-required`] === "";
    return { name, type, description, required };
  });
  const newStreak: Streak = {
    id: "",
    ownerId,
    name: formDataObj.name as string,
    description: formDataObj.description as string,
    config: {
      repeatInterval: JSON.stringify({
        interval: formDataObj.interval as string ?? defaultInterval,
        unit: formDataObj.intervalUnit as string ?? defaultIntervalUnit,
      }),
      fields: userFieldsData
    }
  };
  return newStreak;
}