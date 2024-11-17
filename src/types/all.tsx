type FormFieldDataBase = {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

type HasSelect = {
  type: 'select';
  options: SelectOption[];
};

type NonSelect = {
  type?: Exclude<string, 'select'>;
  options?: never;
};

export type FormFieldData = FormFieldDataBase & (HasSelect | NonSelect);

type SelectOption = {
  value: string;
  label: string;
}