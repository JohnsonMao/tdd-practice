import { useReducer } from 'react';

import { ACTION_TYPE, ReducerType, StateType } from './useIntervalRange.type';

const reducer: ReducerType = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_INTERVAL_START:
      return {
        ...state,
        interval: [payload.data, state.interval[1]],
      };
    case ACTION_TYPE.SET_INTERVAL_END:
      return {
        ...state,
        interval: [state.interval[0], payload.data],
      };
    default:
      return state;
  }
};

const useIntervalRange = (defaultValue: StateType['interval']) => {
  const [variables, dispatch] = useReducer(reducer, { interval: defaultValue });

  const setIntervalStart = (data: number) =>
    dispatch({ type: ACTION_TYPE.SET_INTERVAL_START, payload: { data } });

  const setIntervalEnd = (data: number) =>
    dispatch({ type: ACTION_TYPE.SET_INTERVAL_END, payload: { data } });

  return { ...variables, setIntervalStart, setIntervalEnd };
};

export default useIntervalRange;
