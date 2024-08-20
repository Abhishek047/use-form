import { useEffect, useState } from "react";
import { validationCheck, Validations } from "./validationCheck";

export type FormField<T extends object> = {
  id: keyof T;
  label: string;
  type: React.HTMLInputTypeAttribute;
  defaultValue: T[keyof T];
  validation: Validations<T[keyof T]>
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

  const validateSingleField = ({ fieldForValidation, value }: {
    fieldForValidation: keyof T,
    value?: T[keyof T],
  }) => {
    const field = formFields[fieldForValidation];
    const keysForValidation = Object.keys(field.validation);
    for (let i = 0; i < keysForValidation.length; i++) {
      const validationMsg = validationCheck({
        name: field.label,
        value,
        type: keysForValidation[i], 
      })
      if(validationMsg) {
        console.log(validationMsg);
        break;
      }
    }
  }
  const validate = (field: keyof T) => {
    validateSingleField({ fieldForValidation: field, value: fieldState[field] })
  }
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
    validate
  };
};
