import { invitationFormSchema } from "./invitation.schema";

import * as yup from "yup"


export type IInvitationInput = yup.InferType<typeof invitationFormSchema>