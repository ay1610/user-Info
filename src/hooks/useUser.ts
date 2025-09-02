import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/user';


export function useUsers(enabled:boolean, limit: number, skip: number) {
    return useQuery({
        queryKey:['userData',  limit, skip ],
        queryFn:() => fetchUsers({ limit, skip }),
        staleTime: 20 * 60 * 1000, 
        enabled,
    })
}