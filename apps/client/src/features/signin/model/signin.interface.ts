
import * as yup from "yup"
import { signinFormSchema } from "./signin.schema"

export type FormSchema = yup.InferType<typeof signinFormSchema>