
import * as yup from "yup"
import { signupFormSchema } from "./signup-form.schema";

export type FormSchema = yup.InferType<typeof signupFormSchema>;