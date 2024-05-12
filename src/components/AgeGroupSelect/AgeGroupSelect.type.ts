import type { IntervalType } from '@/types';

export interface AgeGroupSelectProps {
  min?: number;
  max?: number;
  defaultValue?: IntervalType;
  errorMessage?: string;
  onChange?: (value: IntervalType) => void;
}

export enum ACTION_TYPE {
  UPDATE_START_VALUE,
  UPDATE_END_VALUE,
}

export type HandleChangeType = (action: ACTION_TYPE) => (value: number) => void;
