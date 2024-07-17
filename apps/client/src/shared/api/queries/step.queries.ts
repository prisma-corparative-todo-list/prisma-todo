import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { StepService } from '../services/step.service';
import { ICreateStep } from 'interfaces';
import { Prisma } from 'prisma/prisma-client';

export const useGetSteps = (taskId?: string) => {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.STEP, taskId],
    queryFn: async () => {
      const response = await StepService.findMany(taskId);
      return response;
    },
  });
  return {
    steps: data,
    stepsIsSuccess: isSuccess,
    refetchSteps: refetch,
  };
};

export const usePostStep = () => {
  const { mutate: postStep, isSuccess: postStepIsSuccess } = useMutation({
    mutationKey: [QUERY_KEYS.STEP],
    mutationFn: async (data: ICreateStep) => {
      const response = await StepService.create(data);
      return response;
    },
  });
  return {
    postStep,
    postStepIsSuccess,
  };
};

export const useToggleCompleteStep = () => {
  const { mutate: toggleCompleteStep, isSuccess: toggleCompleteStepIsSuccess } =
    useMutation({
      mutationKey: [QUERY_KEYS.STEP],
      mutationFn: async (stepId: string) => {
        const response = await StepService.toggleComplete(stepId);
        return response;
      },
    });
  return {
    toggleCompleteStep,
    toggleCompleteStepIsSuccess,
  };
};

export const useDeleteStep = () => {
  const { mutate: deleteStep, isSuccess: deleteStepIsSuccess } = useMutation({
    mutationKey: [QUERY_KEYS.STEP],
    mutationFn: async (stepId: string) => {
      const response = await StepService.deleteOne(stepId);
      return response;
    },
  });
  return {
    deleteStep,
    deleteStepIsSuccess,
  };
};

export const useUpdateStep = () => {
  const { mutate: updateStep, isSuccess: updateStepIsSuccess } = useMutation({
    mutationKey: [QUERY_KEYS.STEP],
    mutationFn: async (data: Prisma.StepUpdateInput) => {
      const response = await StepService.updateOne(data);
      return response;
    },
  });
  return {
    updateStep,
    updateStepIsSuccess,
  };
};
