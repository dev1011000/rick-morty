export type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  classes.forEach((cls) => {
    if (!cls) return;

    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls));
    } else if (typeof cls === 'object') {
      Object.entries(cls).forEach(([key, value]) => {
        if (value) {
          result.push(key);
        }
      });
    }
  });

  return result.join(' ');
}
