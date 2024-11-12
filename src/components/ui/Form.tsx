import { FormFieldData } from '@/types/all';
import FormField from './FormField';

export default function Form({ fieldsData, submitHandler }: { fieldsData: FormFieldData[], submitHandler: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className="w-4/5 max-w-64 mx-auto" onSubmit={submitHandler}>
      {fieldsData.map((fieldData, i) => <FormField key={i} fieldData={fieldData} />)}
      <button type="submit">Submit</button>
    </form>
  )
}