import { FormFieldData } from "@/types/all";
import FormField from "./FormField";
import { ReactNode } from "react";

export default function Form({
  fieldsData,
  submitHandler,
}: {
  fieldsData: (FormFieldData | ReactNode)[];
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="w-4/5 max-w-[30rem] mx-auto" onSubmit={submitHandler}>
      {fieldsData.map((datum, index) => {
        const ffDatum = datum as FormFieldData;
        if (ffDatum.id !== undefined) {
          return (
            <FormField
              key={index}
              fieldData={ffDatum}
            />
          );
        } else {
          return <div key={index}>{datum as ReactNode}</div>;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
}