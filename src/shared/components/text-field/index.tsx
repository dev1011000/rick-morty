import React from 'react';

import { CloseIcon } from '@/assets';
import { cn } from '@/shared/lib/cn/cn';

import './text-field.css';

/** 
 * underlined - только нижняя граница (для форм)
 * outlined - полная обводка (для фильтров)
 */
export type TextFieldVariant = 'underlined' | 'outlined';
export type TextFieldSize = 'sm' | 'lg';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  className?: string;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  label?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const TextField = (props: TextFieldProps) => {
  const {
    className,
    variant = 'underlined',
    size = 'lg',
    label,
    icon,
    value,
    onChange,
    onClear,
    placeholder,
    ...otherProps
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cn('text-field-wrapper', className)}>
      {label && <span className="text-field-label">{label}</span>}
      
      <div className={cn(
        'text-field',
        `text-field--variant-${variant}`,
        `text-field--size-${size}`,
        { 'text-field--with-icon': !!icon }
      )}>
        {icon && <div className="text-field__icon">{icon}</div>}
        
        <input
          className="text-field__input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          {...otherProps}
        />

        {value && onClear && (
          <button 
            type="button" 
            className="text-field__clear-btn" 
            onClick={onClear}
            aria-label="Clear input"
          >
            <CloseIcon className="text-field__clear-icon" />
          </button>
        )}
      </div>
    </div>
  );
};
