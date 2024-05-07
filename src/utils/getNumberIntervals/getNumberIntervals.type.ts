export type Interval = [number, number];

export interface GetNumberIntervalsOptions {
  min?: number;
  max?: number;
}

export interface GetNumberIntervalsResult {
  overlap: Interval[];
  notInclude: Interval[];
}

export type ToIntervalType = (interval: number[]) => Interval;

export type MergeIntervalsType = (
  intervals: Readonly<Interval[]>
) => Interval[];

export type GetNumberIntervalsType = (
  intervals: Readonly<Interval[]>,
  options?: GetNumberIntervalsOptions
) => GetNumberIntervalsResult;
