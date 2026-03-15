import type { StatusVariant } from '@/shared/types';

export type StatusOption = {
  value: StatusVariant;
  label: string;
};

export const STATUS_OPTIONS: StatusOption[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];
