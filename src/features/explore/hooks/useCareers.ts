import { useQuery } from '@tanstack/react-query';
import { fetchCareers, fetchCareerById } from '../api/careerApi';

export const useCareers = (filters: Record<string, any>) => {
  return useQuery({
    queryKey: ['careers', filters],
    queryFn: () => fetchCareers(filters),
  });
};

export const useCareerDetails = (id: string) => {
  return useQuery({
    queryKey: ['career', id],
    queryFn: () => fetchCareerById(id),
    enabled: !!id,
  });
};
