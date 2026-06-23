import { useMutation } from '@tanstack/react-query';
import { analyzeResumeAPI, generateCoverLetterAPI } from '../api/aiApi';
import toast from 'react-hot-toast';

export const useAnalyzeResume = () => {
  return useMutation({
    mutationFn: analyzeResumeAPI,
    onSuccess: () => toast.success('Resume analyzed successfully!'),
    onError: () => toast.error('Failed to analyze resume.')
  });
};

export const useGenerateCoverLetter = () => {
  return useMutation({
    mutationFn: generateCoverLetterAPI,
    onSuccess: () => toast.success('Cover letter generated!'),
    onError: () => toast.error('Failed to generate cover letter.')
  });
};
