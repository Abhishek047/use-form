import { useState } from "react";

type Props<T> = {
  defaultValue: T[];
};

export const useFormArray = <T>({ defaultValue }: Props<T>) => {
  const [formArrayValue, setFormArrayValue] = useState<T[]>(defaultValue);
  const handleAdd = (val: T) => {
    if (val) {
      setFormArrayValue((prev) => [...prev, val]);
    }
  };
  const handleUpdate = (val: T, index: number) => {
    if (val) {
      const newArr = [...formArrayValue];
      newArr[index] = val;
      setFormArrayValue(newArr);
    }
  };
  const handleDelete = (index: number) => {
    setFormArrayValue([...formArrayValue.slice(0, index), ...formArrayValue.slice(index + 1)]);
  };
  return {
    handleAdd,
    handleDelete,
    handleUpdate,
    values: formArrayValue,
  };
};
