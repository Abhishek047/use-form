import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormFields, useForm } from "./useForm";

type LoginFormValues = {
  name: string;
  numLT: number;
};

const fieldsSchema: FormFields<LoginFormValues> = {
  name: {
    id: "name",
    label: "Name",
    type: "text",
    defaultValue: "",
    validation: {
      required: true,
    },
  },
  numLT: {
    id: "numLT",
    label: "Number less than 10",
    type: "number",
    defaultValue: 0,
    validation: {
      required: true,
      max: 10,
    },
  },
};

function App() {
  const { fieldState, errorState, onChange, validate } = useForm(fieldsSchema);
  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
  };
  return (
    <Container maxW='container.lg'>
      <Text fontSize='3xl'>Form</Text>
      <VStack
        maxW={400}
        pt={2}
        gap={2}
        align='flex-start'>
        {Object.values(fieldsSchema).map((value) => (
          <FormControl
            isInvalid={!!errorState[value.id]}
            key={value.id}>
            <FormLabel htmlFor={value.id}>{value.label}</FormLabel>
            <Input
              id={value.id}
              type={value.type}
              value={fieldState[value.id]}
              defaultValue={value.defaultValue || ""}
              onChange={(event) => onChange({ fieldId: value.id, value: event.target.value })}
            />
            {!!errorState[value.id] && <FormHelperText>{errorState[value.id]}</FormHelperText>}
          </FormControl>
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
}

export default App;
