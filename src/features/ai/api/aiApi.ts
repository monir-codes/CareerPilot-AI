import { apiClient } from '@/core/api/axios';

export const analyzeResumeAPI = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await apiClient.post('/ai/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const generateCoverLetterAPI = async (data: any) => {
  const response = await apiClient.post('/ai/cover-letter/generate', data);
  return response.data;
};
