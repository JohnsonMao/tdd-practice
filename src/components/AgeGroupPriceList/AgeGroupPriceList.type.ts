import type { IntervalType, WithIdType } from '@/types';
import type { ErrorType } from '@/hooks/useFieldArray/useFieldArray.type';

export type PriceType = number;
export type AgeGroupType = IntervalType;

export interface AgeGroupPrice {
  ageGroup: AgeGroupType;
  price: PriceType;
}

export type HandleChangeType = (
  id: string,
  value: WithIdType<AgeGroupPrice>
) => void;

export type HandleErrorType = (
  id: string,
  value: ErrorType<AgeGroupPrice>
) => void;

export interface GenerateDefaultValueProps {
  min: number;
  max: number;
}

export type GenerateDefaultValue = (
  props: GenerateDefaultValueProps
) => AgeGroupPrice[];

export interface AgeGroupPriceListProps {
  min?: number;
  max?: number;
  defaultValue?: AgeGroupPrice[];
  onChange?: (value: AgeGroupPrice[]) => void;
}

export interface AgeGroupPriceContentProps {
  id: string;
  value: WithIdType<AgeGroupPrice>;
  min?: number;
  max?: number;
  onChange?: HandleChangeType;
}

export interface AgeGroupPriceHeaderProps {
  index: number;
  id: string;
  onRemove?: (id: string) => void;
}
