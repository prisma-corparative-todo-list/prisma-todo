import { Step } from "prisma/prisma-client";

export type IOptimisticStep = Omit<Step, "id">