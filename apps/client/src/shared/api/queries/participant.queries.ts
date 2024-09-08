import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { ParticipantService } from '../services/participant.service';




export const useGetParticipants = (id?: string) => {
    const {
        data: participants,
        isSuccess: participantsIsSuccess,
        isError: participantsIsError,
        isPending: participantsIsPending,
        refetch: refetchParticipants
    } = useQuery({
        queryKey: [QUERY_KEYS.PARTICIPANT],
        queryFn: async () => {
            const response = await ParticipantService.findMany(id);
            return response;
        },
        
    });

    return {
        participants,
        participantsIsSuccess,
        participantsIsError,
        participantsIsPending,
        refetchParticipants
    }
}