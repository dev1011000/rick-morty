import type { CharacterStatus } from '@/widgets';

export type StatusOption = {
  value: CharacterStatus;
  label: string;
};

export const STATUS_OPTIONS: StatusOption[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' },
];
