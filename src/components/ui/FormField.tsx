'use client'
import { FormFieldData } from '@/types/all';
export default function FormField({ fieldData }: { fieldData: FormFieldData }) {
  const { label, type = 'text', id, name, required = false, placeholder = fieldData.name } = fieldData;
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1" htmlFor={id}>{label}</label>
      <input className="border border-gray-300 p-2 text-black" type={type} id={id} name={name} required={required} placeholder={placeholder ?? ""} />
    </div>
  );
}