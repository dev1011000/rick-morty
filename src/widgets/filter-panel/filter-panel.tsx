import { SearchIcon } from '@/assets';
import { Select, TextField } from '@/shared/components';
import { GENDER_FILTER_OPTIONS, SPECIES_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '@/shared/constants';

import type { FilterPanelValues, FilterPanelWidgetProps } from './types';

import './filter-panel.scss';

export const FilterPanelWidget = (props: FilterPanelWidgetProps) => {
  const { values, onChange } = props;

  const handleNameChange = (name: string) => {
    onChange({ ...values, name });
  };

  const handleStatusChange = (status: FilterPanelValues['status']) => {
    onChange({ ...values, status });
  };

  const handleSpeciesChange = (species: FilterPanelValues['species']) => {
    onChange({ ...values, species });
  };

  const handleGenderChange = (gender: FilterPanelValues['gender']) => {
    onChange({ ...values, gender });
  };

  return (
    <div className='filter-panel'>
      <TextField
        variant='outlined'
        placeholder='Filter by name...'
        icon={<SearchIcon />}
        value={values.name}
        onChange={handleNameChange}
        onClear={() => handleNameChange('')}
        className='filter-panel__input'
      />

      <Select
        placeholder='Species'
        options={SPECIES_FILTER_OPTIONS}
        value={values.species || ''}
        onChange={handleSpeciesChange}
        className='filter-panel__select'
      />

      <Select
        placeholder='Gender'
        options={GENDER_FILTER_OPTIONS}
        value={values.gender || ''}
        onChange={handleGenderChange}
        className='filter-panel__select'
      />

      <Select
        placeholder='Status'
        options={STATUS_FILTER_OPTIONS}
        value={values.status || ''}
        onChange={handleStatusChange}
        className='filter-panel__select'
      />
    </div>
  );
};
