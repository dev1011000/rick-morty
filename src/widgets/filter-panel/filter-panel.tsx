import { SearchIcon } from '@/assets';
import { Select, TextField } from '@/shared/components';
import { GENDER_FILTER_OPTIONS, SPECIES_FILTER_OPTIONS, STATUS_FILTER_OPTIONS } from '@/shared/constants';

import type { FilterPanelValues, FilterPanelWidgetProps } from './types';

import './filter-panel.scss';

export const FilterPanelWidget = (props: FilterPanelWidgetProps) => {
  const { values, onChange, className } = props;

  const handleChange = <K extends keyof FilterPanelValues>(key: K, value: FilterPanelValues[K]) => {
    onChange({ ...values, [key]: value });
    
  };

  return (
    <div className={`filter-panel${className ? ` ${className}` : ''}`}>
      <TextField
        variant='outlined'
        placeholder='Filter by name...'
        icon={<SearchIcon />}
        value={values.name}
        onChange={(value) => handleChange('name', value)}
        onClear={() => handleChange('name', '')}
        className='filter-panel__input'
      />

      <Select
        placeholder='Species'
        options={SPECIES_FILTER_OPTIONS}
        value={values.species || ''}
        onChange={(value) => handleChange('species', value)}
        className='filter-panel__select'
      />

      <Select
        placeholder='Gender'
        options={GENDER_FILTER_OPTIONS}
        value={values.gender || ''}
        onChange={(value) => handleChange('gender', value)}
        className='filter-panel__select'
      />

      <Select
        placeholder='Status'
        options={STATUS_FILTER_OPTIONS}
        value={values.status || ''}
        onChange={(value) => handleChange('status', value)}
        className='filter-panel__select'
      />
    </div>
  );
};
