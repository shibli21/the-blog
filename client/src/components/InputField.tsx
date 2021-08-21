import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  error: any;
};
export const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FormControl id={props.name} isInvalid={props.error}>
    <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
    <Input
      type={props.type}
      name={props.name}
      defaultValue={undefined}
      ref={ref}
      placeholder={props.placeholder}
    />
    <FormErrorMessage>{props.error?.message}</FormErrorMessage>
  </FormControl>
));
