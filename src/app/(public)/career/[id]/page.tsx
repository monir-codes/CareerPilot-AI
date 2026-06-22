import { CareerDetailsClient } from '@/features/explore/components/CareerDetailsClient';

export async function generateMetadata({ params }: { params: { id: string } }) {
  // In a real app, fetch the title from DB here.
  return {
    title: `Career Details | CareerPilot AI`,
  };
}

export default function CareerPage({ params }: { params: { id: string } }) {
  return <CareerDetailsClient id={params.id} />;
}
