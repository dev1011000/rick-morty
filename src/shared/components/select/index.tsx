import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '@/assets';

import type { SelectOption, SelectSize } from './types';

import './select.css';

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;

  addon?: React.ReactNode;

  renderOptionAddon?: (value: string) => React.ReactNode;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  size = 'lg',
  addon,
  renderOptionAddon
}: SelectProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const displayText = selectedOption?.label || placeholder || options[0]?.label || '';

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    close();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className={`select select_size_${size}`}
    >
      <button
        type='button'
        className='select__trigger'
        onClick={toggle}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className='select__value'>
          <span className='select__text'>{displayText}</span>
          {addon ? <span className='select__addon'>{addon}</span> : null}
        </span>

        <span className='select__arrow'>{isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}</span>
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
              onClick={() => handleSelect(opt.value)}
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
