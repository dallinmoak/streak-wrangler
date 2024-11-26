"use client";
import { FormFieldData } from "@/types/all";
import { useRef } from "react";

export default function FormField({ fieldData }: { fieldData: FormFieldData }) {
  const {
    label,
    type = "text",
    id,
    name,
    required = false,
    placeholder = fieldData.name,
    disabled = false,
    value,
    onChange,
  } = fieldData;

  const ref = fieldData.ref ?? useRef(null);

  const labelEl = (
    <label className="mb-1" htmlFor={id}>
      {label}
    </label>
  );
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-col mb-4 max-w-64">
        {labelEl}
        {children}
      </div>
    );
  };

  const inputClasses = "border border-gray-300 p-2 text-black";

  if (type == "select") {
    const options = fieldData.options?.map((option, index) => {
      return (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      );
    });
    return (
      <Wrapper>
        <select
          className={inputClasses}
          id={id}
          name={name}
          required={required}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e, ref)}
          ref={ref}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options}
        </select>
      </Wrapper>
    );
  } else if (type == "textarea") {
    return (
      <Wrapper>
        <textarea
          className={inputClasses}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder ?? ""}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e, ref)}
          ref={ref}
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <input
        className={inputClasses}
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder ?? ""}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e, ref)}
        ref={ref}
      />
    </Wrapper>
  );
}