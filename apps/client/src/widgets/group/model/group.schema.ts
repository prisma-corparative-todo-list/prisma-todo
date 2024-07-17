import * as yup from "yup"


export const groupFormSchema = yup.object({
    name: yup.string().min(2,"Min group name length is 2").max(50,"Max group name length is 50").required("please enter your group name!"),
})