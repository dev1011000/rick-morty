export type FilterStatus = 'alive' | 'dead' | 'unknown';
export type FilterSpecies = 'Human' | 'Alien' | 'Humanoid' | 'Animal' | 'Robot' | 'Cronenberg' | 'Disease' | 'Unknown';
export type FilterGender = 'female' | 'male' | 'genderless' | 'unknown';

export type FilterOption<T> = {
  value: T;
  label: string;
};

export const STATUS_FILTER_OPTIONS: FilterOption<FilterStatus | ''>[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

export const SPECIES_FILTER_OPTIONS: FilterOption<FilterSpecies | ''>[] = [
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' },
  { value: 'Unknown', label: 'Unknown' },
];

export const GENDER_FILTER_OPTIONS: FilterOption<FilterGender | ''>[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];
