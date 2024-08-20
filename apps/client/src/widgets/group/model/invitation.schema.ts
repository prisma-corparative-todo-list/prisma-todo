import * as yup from 'yup';

export const invitationFormSchema = yup.object({
  email: yup
    .string()
    .max(50, 'Max group name length is 50')
    .required('please enter user email!')
    .email('Invalid email'),
});
