import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ArrowDownIcon } from '@/assets';

import type { SelectOption, SelectSize } from './types';

import './select.css';

interface SelectProps<T extends string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  size?: SelectSize;

  addon?: React.ReactNode;

  renderOptionAddon?: (value: T) => React.ReactNode;
}

const Select = <T extends string>({
  options,
  value,
  onChange,
  placeholder,
  size = 'lg',
  addon,
  renderOptionAddon
}: SelectProps<T>) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const displayText = selectedOption?.label || placeholder || options[0]?.label || '';

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const selectOption = (nextValue: T) => {
    onChange(nextValue);
    closeDropdown();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeDropdown();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`select select_size_${size} ${isOpen ? 'select_open' : ''}`}
    >
      <button
        type='button'
        className='select__trigger'
        onClick={toggleDropdown}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className='select__value'>
          <span className='select__text'>{displayText}</span>
          {addon ? <span className='select__addon'>{addon}</span> : null}
        </span>

        <span className='select__arrow'>
          <ArrowDownIcon />
        </span>
      </button>

      {isOpen ? (
        <div
          className='select__dropdown'
          role='listbox'
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type='button'
              className='select__option'
              onClick={() => selectOption(opt.value)}
              role='option'
              aria-selected={opt.value === value}
            >
              <span className='select__option-text'>{opt.label}</span>

              {renderOptionAddon ? (
                <span className='select__option-addon'>{renderOptionAddon(opt.value)}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
