export type SelectSize = 'lg' | 'sm';

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};
