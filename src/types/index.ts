export type IntervalType = [number, number];

export type WithIdType<T> = {
  id: string;
} & T;
