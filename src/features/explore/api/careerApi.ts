import { apiClient } from '@/core/api/axios';

// Mock data generator for immediate UI visualization
const generateMockCareers = (count: number) => Array.from({ length: count }).map((_, i) => ({
  _id: `career_${i}`,
  title: ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'][(i) % 4],
  description: 'Join a fast-growing team and build the future of technology with us.',
  salary: { min: 80000 + (i * 5000), max: 120000 + (i * 10000) },
  experienceLevel: ['Entry', 'Mid', 'Senior', 'Lead'][(i) % 4],
  location: 'San Francisco, CA',
  isRemote: i % 2 === 0,
  rating: 4.5 + (i % 5) * 0.1,
  category: ['Engineering', 'Product', 'Data', 'Design'][(i) % 4]
}));

export const fetchCareers = async (filters: any) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const data = generateMockCareers(20);
  
  // Simple mock filtering
  let filtered = data;
  if (filters.search) filtered = filtered.filter(c => c.title.toLowerCase().includes(filters.search.toLowerCase()));
  if (filters.category) filtered = filtered.filter(c => c.category === filters.category);
  
  return {
    data: filtered,
    total: filtered.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  };
};

export const fetchCareerById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateMockCareers(1)[0];
};
