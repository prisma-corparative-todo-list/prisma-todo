import * as yup from 'yup';
import { groupFormSchema } from './group.schema';

export type ICreateGroupInput = yup.InferType<typeof groupFormSchema>;
