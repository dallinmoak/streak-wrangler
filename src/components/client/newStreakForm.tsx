"use client";
import { useState, useEffect, RefObject, ReactNode, useContext } from "react";
import Form from "../ui/Form";
import { FieldSet, UserFieldSet } from "@/types/all";
import FormField from "../ui/FormField";
import { Streak } from "@prisma/client";
import { buildStreakObject, newStreakFormInitialFields, newUserFieldSetDefaults } from "@/lib/streakFormHelpers";
import UserContext from "@/lib/context/UserContext";
import cloneDeep from "lodash/cloneDeep";

export default function NewStreakForm() {

  const initialSet = cloneDeep(newStreakFormInitialFields);
  const [fieldSets, setFieldSets] = useState<FieldSet[]>(initialSet);

  const [submissionMessage, setSubmissionMessage] = useState<string>('');

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSubmissionMessage('');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [submissionMessage])

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

  const currentUserId = useContext(UserContext)?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStreak: Streak = buildStreakObject(formData, currentUserId ?? "");
    console.log(newStreak);
    const res = await fetch('/api/streak', {
      method: 'POST',
      body: JSON.stringify(newStreak),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const newStreak = await res.json();
      console.log('new streak saved', newStreak);
      console.log('resetting form');
      console.log(newStreakFormInitialFields)
      setFieldSets(newStreakFormInitialFields);
      setSubmissionMessage('Streak saved');
    } else {
      const errorMsg = await res.text();
      console.log(errorMsg);
      console.error('failed to save new streak');
    }
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
        <div key={index} className="border-2 rounded-lg border-current p-2 bg-anti-plum-950 space-x-4">
          <h2>User Field {userFieldIndex}</h2>
          <div className="flex flex-row flex-wrap gap-x-4 mb-1">
            {fieldSetNodes(fieldSet, index)}
          </div>
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
      {submissionMessage && <p>{submissionMessage}</p>}
      <Form fieldsData={FormNodes} submitHandler={handleSubmit} />
    </>
  );
}