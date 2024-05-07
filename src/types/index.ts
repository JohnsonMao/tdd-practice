export type Target<T> = {
  name: string;
  value: T;
};

export type WithId<T> = {
  id: string;
} & T;
