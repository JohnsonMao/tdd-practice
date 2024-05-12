import { ReactNode } from 'react';

export interface PriceInputProps {
  autoFocus?: boolean;
  canDecimal?: boolean;
  canNegative?: boolean;
  defaultValue?: number;
  errorMessage?: string;
  prefix?: ReactNode;
  onChange?: (value: number) => void;
}
