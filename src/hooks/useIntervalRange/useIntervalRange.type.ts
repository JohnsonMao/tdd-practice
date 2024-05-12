import type { IntervalType } from '@/types';

export interface StateType {
  interval: IntervalType;
}

export enum ACTION_TYPE {
  SET_INTERVAL_START,
  SET_INTERVAL_END,
}

export type ActionType =
  | { type: ACTION_TYPE.SET_INTERVAL_START; payload: { data: number } }
  | { type: ACTION_TYPE.SET_INTERVAL_END; payload: { data: number } };

export type ReducerType = (state: StateType, { type, payload }: ActionType) => StateType;
