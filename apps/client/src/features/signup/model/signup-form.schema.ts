
import * as yup from "yup"

export const signupFormSchema = yup.object({
    userName: yup.string().min(2,"Min username length is 2").max(50,"Max username length is 50").required("please enter your username!"),
    email: yup.string().email("Invalid email").required("please enter your email!"),
    password: yup.string().min(6,"Min password length is 6").max(50,"Max password length is 50").required("please enter your password!"),
})