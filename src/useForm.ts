import { useEffect, useState } from "react";

export type FormField<T extends object> = {
  id: keyof T;
  label: string;
  type: React.HTMLInputTypeAttribute;
  defaultValue: T[keyof T];
};

export type FormFields<T extends object> = {
  [K in keyof T]: FormField<T>;
};
type ChangeParams<T extends object> = {
  fieldId: keyof T;
  value: T[keyof T];
};
export const useForm = <T extends object>(formFields: FormFields<T>) => {
  const [fieldState, setFieldState] = useState<Partial<T>>({});

  useEffect(() => {
    const newFieldState: Partial<T> = {};
    Object.keys(formFields).forEach((key) => {
      const keyVal = key as keyof T;
      newFieldState[keyVal] = formFields[keyVal].defaultValue || undefined;
    });
    setFieldState(newFieldState);
  }, [formFields]);

  const onChange = ({ fieldId, value }: ChangeParams<T>) => {
    if (formFields[fieldId]) {
      const newFieldState = { ...fieldState };
      newFieldState[fieldId as keyof T] = value;
      setFieldState(newFieldState);
    } else {
      console.log("no-form-found");
    }
  };

  return {
    fieldState,
    onChange,
  };
};
