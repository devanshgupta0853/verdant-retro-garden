import { createContext, useContext, useState, type ReactNode } from 'react';

export type Plant = { id: string; name: string; species: string; scientific: string; environment: string; source: string; station: boolean };
export type Observation = { id: string; plantId: string; type: string; note: string; date: string };
export const initialPlants: Plant[] = [
  { id: 'pothos', name: 'My Pothos', species: 'Money plant / Pothos', scientific: 'Epipremnum aureum', environment: 'Indoor · Living room', source: 'Provisional care profile', station: true },
  { id: 'basil', name: 'Little Basil', species: 'Basil', scientific: 'Ocimum basilicum', environment: 'Outdoor · Balcony', source: 'Provisional care profile', station: false },
  { id: 'snake', name: 'The Snake Plant', species: 'Snake plant', scientific: 'Dracaena trifasciata', environment: 'Indoor · Bedroom', source: 'Provisional care profile', station: false },
];
const initialObservations: Observation[] = [
  { id: 'o1', plantId: 'pothos', type: 'Observation', note: 'New leaf unfurling! Leaves look bright and firm.', date: '2026-10-11T08:20:00Z' },
  { id: 'o2', plantId: 'pothos', type: 'Watering', note: 'Watered the soil and allowed excess water to drain.', date: '2026-10-09T07:30:00Z' },
  { id: 'o3', plantId: 'basil', type: 'Observation', note: 'Moved the pot to a brighter spot on the balcony.', date: '2026-10-10T09:00:00Z' },
];
type PlantContextValue = { plants: Plant[]; selected: Plant; selectPlant: (id: string) => void; addPlant: (plant: Plant) => void; observations: Observation[]; addObservation: (observation: Observation) => void };
const PlantContext = createContext<PlantContextValue | null>(null);
export function PlantProvider({ children }: { children: ReactNode }) {
  const [plants, setPlants] = useState(initialPlants);
  const [selectedId, selectPlant] = useState('pothos');
  const [observations, setObservations] = useState(initialObservations);
  const selected = plants.find(p => p.id === selectedId) ?? initialPlants[0];
  if (!selected) return null;
  return <PlantContext.Provider value={{ plants, selected, selectPlant, addPlant: p => setPlants(v => [...v, p]), observations, addObservation: o => setObservations(v => [o, ...v]) }}>{children}</PlantContext.Provider>;
}
export function usePlants() { const context = useContext(PlantContext); if (!context) throw new Error('PlantProvider is required'); return context; }
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} · Smart Plant Doctor` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} · Smart Plant Doctor` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }