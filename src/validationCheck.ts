export type ValidationsKeys = "required" | "max" | string;
export type ValidationFn<T> = (value: T) => string | boolean;
export type ValidationObject<V> = boolean | number | ValidationFn<V>;

export type Validations<V> = Record<ValidationsKeys, ValidationObject<V>>;

type ValidationCheckFnProps = {
  name: string;
  type: ValidationsKeys;
  value: any;
  args?: number;
  fn?: ValidationFn<any>;
};
export const validationCheck = ({
  name,
  type,
  value,
  args,
  fn,
}: ValidationCheckFnProps): string | boolean => {
  if (fn) {
    return fn(value);
  }
  switch (type) {
    case "required": {
      return [undefined, null, ""].includes(value) ? `${name} is required` : false;
    }
    case "max": {
      const conv = parseFloat(value);
      if (!isNaN(conv) && args) {
        if (value > (args || -Infinity)) {
          return `Value of ${name} should be smaller than ${args}`;
        }
      }
      break;
    }
    default:
      // no default thing to do
      break;
  }
  return false;
};
