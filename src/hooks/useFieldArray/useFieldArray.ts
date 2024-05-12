import { useCallback, useReducer } from 'react';
import { nanoid } from 'nanoid';

import {
  ACTION_TYPE,
  GenerateInitialState,
  ActionType,
  ErrorType,
  ReducerType,
  StateType,
} from './useFieldArray.type';

const generateInitialError = <T extends {}>(data: T) =>
  Object.fromEntries(Object.keys(data).map((key) => [key, ''])) as ErrorType<T>;

const generateInitialState: GenerateInitialState = (defaultValue) => {
  const value = Array.isArray(defaultValue) ? defaultValue : [];
  const idList = value.map(() => nanoid());

  return {
    value: value.map((item, index) => ({
      ...item,
      id: idList[index],
    })),
    errors: value.map((item, index) => ({
      ...generateInitialError(item),
      id: idList[index],
    })),
  };
};

const reducer = <T extends {}>(
  state: StateType<T>,
  { type, payload }: ActionType<T>
): StateType<T> => {
  switch (type) {
    case ACTION_TYPE.APPEND_DATA: {
      const id = nanoid();
      const initialError = generateInitialError(payload.data);

      return {
        ...state,
        value: [...state.value, { ...payload.data, id }],
        errors: [...state.errors, { ...initialError, id }],
      };
    }
    case ACTION_TYPE.REMOVE_DATA: {
      const { id } = payload;
      return {
        ...state,
        value: state.value.filter((item) => item.id !== id),
        errors: state.errors.filter((item) => item.id !== id),
      };
    }
    case ACTION_TYPE.UPDATE_DATA: {
      const originDataIndex = state.value.findIndex(
        (item) => item.id === payload.id
      );
      if (originDataIndex === -1) return state;

      return {
        ...state,
        value: [
          ...state.value.slice(0, originDataIndex),
          { ...payload.data, id: payload.id },
          ...state.value.slice(originDataIndex + 1),
        ],
      };
    }
    case ACTION_TYPE.UPDATE_ERRORS: {
      const originErrorIndex = state.errors.findIndex(
        (item) => item.id === payload.id
      );
      if (originErrorIndex === -1) return state;

      return {
        ...state,
        errors: [
          ...state.errors.slice(0, originErrorIndex),
          { ...payload.error, id: payload.id },
          ...state.errors.slice(originErrorIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};

const useFieldArray = <T extends {}>(defaultValue: T[]) => {
  const [variables, dispatch] = useReducer<ReducerType<T>>(
    reducer,
    generateInitialState(defaultValue)
  );

  const append = useCallback(
    (data: T) => dispatch({ type: ACTION_TYPE.APPEND_DATA, payload: { data } }),
    []
  );

  const remove = useCallback(
    (id: string) =>
      dispatch({ type: ACTION_TYPE.REMOVE_DATA, payload: { id } }),
    []
  );

  const update = useCallback(
    (id: string, data: T) =>
      dispatch({ type: ACTION_TYPE.UPDATE_DATA, payload: { id, data } }),
    []
  );

  const setError = useCallback(
    (id: string, error: ErrorType<T>) =>
      dispatch({ type: ACTION_TYPE.UPDATE_ERRORS, payload: { id, error } }),
    []
  );

  return { ...variables, append, remove, update, setError };
};

export default useFieldArray;
