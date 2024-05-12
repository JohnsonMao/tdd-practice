import type { IntervalType } from '@/types';

export interface GetNumberIntervalsOptions {
  min?: number;
  max?: number;
}

export interface GetNumberIntervalsResult {
  overlap: IntervalType[];
  notInclude: IntervalType[];
}

export type CreateIntervalType = (n1: number, n2: number) => IntervalType;

export type MergeIntervalsType = (
  intervals: Readonly<IntervalType[]>
) => IntervalType[];

export type GetNumberIntervalsType = (
  intervals: Readonly<IntervalType[]>,
  options?: GetNumberIntervalsOptions
) => GetNumberIntervalsResult;
