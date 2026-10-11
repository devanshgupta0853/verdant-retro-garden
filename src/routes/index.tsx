import { createFileRoute } from "@tanstack/react-router";
import { GardenOverview } from '@/components/garden-overview';
import { pageHead } from '@/components/plant-context';
export const Route = createFileRoute("/")({
  head: () => pageHead('Your garden', 'Your leafy little home for plant check-ins, sample sensor readings, care notes and leaf screening.'),
  component: GardenOverview,
});
