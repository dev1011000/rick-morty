import type { FilterGender, FilterSpecies, FilterStatus } from '@/shared/constants';

export interface FilterPanelValues {
  name: string;
  status: FilterStatus | '';
  species: FilterSpecies | '';
  gender: FilterGender | '';
}

export interface FilterPanelWidgetProps {
  values: FilterPanelValues;
  onChange: (values: FilterPanelValues) => void;
}
