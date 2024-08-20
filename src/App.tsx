import { Button, Container, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { FormFields, useForm } from "./useForm";

type LoginFormValues = {
  name: string;
  phoneNo: number;
};

const fieldsSchema: FormFields<LoginFormValues> = {
  name: {
    id: "name",
    label: "Name",
    type: "text",
    defaultValue: "",
    validation: {
      required: true,
    }
  },
  phoneNo: {
    id: "phoneNo",
    label: "Phone",
    type: "number",
    defaultValue: 0,
    validation: {
      required: true,
    }
  },
};

function App() {
  const { fieldState, onChange, validate } = useForm(fieldsSchema);
  const handleSubmit = () => {
    validate("name");
    console.log(fieldState);
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
          <FormControl key={value.id}>
            <FormLabel htmlFor={value.id}>{value.label}</FormLabel>
            <Input
              id={value.id}
              type={value.type}
              value={fieldState[value.id]}
              defaultValue={value.defaultValue || ""}
              onChange={(event) => onChange({ fieldId: value.id, value: event.target.value })}
            />
          </FormControl>
        ))}
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
}

export default App;
