type FormFieldDataBase = {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (val: string, ref: any) => void
  ref?: any;
};

type HasSelect = {
  type: "select";
  options: SelectOption[];
};

type NonSelect = {
  type?: Exclude<string, "select">;
  options?: never;
};

export type FormFieldData = FormFieldDataBase & (HasSelect | NonSelect);

type SelectOption = {
  value: string;
  label: string;
};

export type FieldSet = baseFieldSet | UserFieldSet;

type baseFieldSet = {
  fields: FormFieldData[];
};

export type UserFieldSet = baseFieldSet & {
  userFieldSet: boolean;
  userFieldIndex: number;
};