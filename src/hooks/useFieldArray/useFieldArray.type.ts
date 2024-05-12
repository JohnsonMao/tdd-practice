import type { WithIdType } from '@/types';

export type ErrorType<T> = WithIdType<Record<keyof T, string>>;

export interface StateType<T> {
  value: WithIdType<T>[];
  errors: ErrorType<T>[];
}

export enum ACTION_TYPE {
  APPEND_DATA,
  REMOVE_DATA,
  UPDATE_DATA,
  UPDATE_ERRORS,
}

export type ActionType<T> =
  | { type: ACTION_TYPE.APPEND_DATA; payload: { data: T } }
  | { type: ACTION_TYPE.REMOVE_DATA; payload: { id: string } }
  | { type: ACTION_TYPE.UPDATE_DATA; payload: { data: T; id: string } }
  | {
      type: ACTION_TYPE.UPDATE_ERRORS;
      payload: { error: ErrorType<T>; id: string };
    };

export type GenerateInitialState = <T extends {}>(
  defaultValue: T[]
) => StateType<T>;

export type ReducerType<T> = (
  state: StateType<T>,
  dispatch: ActionType<T>
) => StateType<T>;
