import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { ParticipantService } from '../services/participant.service';




export const useGetParticipants = () => {
    const {
        data: participants,
        isSuccess: getParticipantsIsSuccess,
        isError: getParticipantsIsError,
        isPending: getParticipantsIsPending,
        refetch: refetchParticipants
    } = useQuery({
        queryKey: [QUERY_KEYS.PARTICIPANT],
        queryFn: async () => {
            const response = await ParticipantService.findMany();
            return response;
        },
        
    });

    return {
        participants,
        getParticipantsIsSuccess,
        getParticipantsIsError,
        getParticipantsIsPending,
        refetchParticipants
    }
}