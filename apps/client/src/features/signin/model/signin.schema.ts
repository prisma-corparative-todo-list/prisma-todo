
import * as yup from "yup"

export const signinFormSchema = yup.object({
    login: yup.string().required("please enter your email or username!"),
    password: yup.string().min(6,"Min password length is 6").max(50,"Max password length is 50").required("please enter your password!"),
})