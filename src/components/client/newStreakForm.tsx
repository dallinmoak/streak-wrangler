"use client";
import { useState, useEffect, RefObject, ReactNode } from "react";
import Form from "../ui/Form";
import { FieldSet, UserFieldSet } from "@/types/all";
import FormField from "../ui/FormField";
import { Streak } from "@prisma/client";
import { buildStreakObject, newStreakFormInitialFields, newUserFieldSetDefaults } from "@/lib/streakFormHelpers";

export default function NewStreakForm() {

  const [fieldSets, setFieldSets] = useState<FieldSet[]>(newStreakFormInitialFields);

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
    const newUserFieldSet: UserFieldSet = newUserFieldSetDefaults(userFieldIndex.toString());
    setFieldSets([...fieldSets, newUserFieldSet]);
  }

  const removeUserField = (index: number) => () => {
    const workingFieldSets = [...fieldSets];
    workingFieldSets.splice(index, 1);
    setFieldSets(workingFieldSets);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStreak: Streak = buildStreakObject(formData);
    console.log(newStreak);
  };

  const fieldSetNodes = (fieldSet: FieldSet, setIndex: number) => {
    return fieldSet.fields.map((field, fIndex) => {
      const fieldData = {
        ...field,
        onChange: (val: string, ref: RefObject<any>) => {
          updateFeildSet(setIndex, field.id, val, ref);
          setCurrentFocusRef(ref);
        },
      }
      return (
        <div key={fIndex}>
          <FormField fieldData={fieldData} />
        </div>
      )
    });
  }

  const FormNodes: ReactNode[] = [...fieldSets?.map((fieldSet, index) => {
    if ((fieldSet as UserFieldSet).userFieldSet) {
      const { userFieldIndex } = fieldSet as UserFieldSet;
      return (
        <div key={index} className="border-2 rounded-lg border-current p-2 bg-anti-plum-950 flex flex-row flex-wrap space-x-4">
          <h2>User Field {userFieldIndex}</h2>
          {fieldSetNodes(fieldSet, index)}
          <button onClick={removeUserField(index)} type='button'>➖ remove user field</button>
        </div>
      )
    } else {
      return fieldSetNodes(fieldSet, index);
    }
  }),
  <button onClick={addUserField} >➕ add user field</button>
  ];

  return (
    <>
      <Form fieldsData={FormNodes} submitHandler={handleSubmit} />
    </>
  );
}