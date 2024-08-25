import { useEffect, useState } from "react";
import { validationCheck, Validations } from "./validationCheck";

export type FormField<T extends object> = {
  id: keyof T;
  label: string;
  type: React.HTMLInputTypeAttribute;
  defaultValue: T[keyof T];
  validation: Validations<T[keyof T]>;
};

export type FormFields<T extends object> = {
  [K in keyof T]: FormField<T>;
};
type ChangeParams<T extends object> = {
  fieldId: keyof T;
  value: T[keyof T];
};
type ErrorState<TY> = {
  [K in keyof TY]: string;
};
export const useForm = <T extends object>(formFields: FormFields<T>) => {
  const [fieldState, setFieldState] = useState<Partial<T>>({});
  const [errorState, setErrorState] = useState<Partial<ErrorState<T>>>({});

  const validateSingleField = ({
    fieldForValidation,
    value,
  }: {
    fieldForValidation: keyof T;
    value?: T[keyof T];
  }) => {
    const field = formFields[fieldForValidation];
    const keysForValidation = Object.keys(field.validation);
    for (let i = 0; i < keysForValidation.length; i++) {
      const args = field.validation[keysForValidation[i]] as number;
      const validationMsg = validationCheck({
        name: field.label,
        value,
        type: keysForValidation[i],
        args,
      });
      if (validationMsg) {
        return typeof validationMsg === "string" ? validationMsg : `${field.label} is invalid`;
      }
    }
    return false;
  };

  const validate = (fields?: keyof T | keyof T[], value?: T[keyof T]) => {
    let fieldsToCheck = null;
    let noErrors = true;
    if (fields) {
      if (Array.isArray(fields)) {
        fieldsToCheck = fields;
      } else if (typeof fields === "string") {
        fieldsToCheck = [fields];
      }
    } else {
      fieldsToCheck = Object.keys(formFields) as (keyof T)[];
    }
    if (fieldsToCheck) {
      const newErrorState: Partial<ErrorState<T>> = { ...errorState };
      fieldsToCheck.forEach((key) => {
        const kayVal = key as keyof T;
        const valueToCheck = value || fieldState[kayVal];
        const error = validateSingleField({ fieldForValidation: key, value: valueToCheck });
        if (error) {
          noErrors = false;
          newErrorState[kayVal] = error;
        } else {
          delete newErrorState[kayVal];
        }
        setErrorState(newErrorState);
      });
    }
    return noErrors;
  };

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
    errorState,
    onChange,
    validate,
  };
};
