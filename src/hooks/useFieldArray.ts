import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { debounce, removeElementAtIndex, updateNestedValue } from '../utils';
import { Target } from '@/types';

interface ValidateProps<T, E> {
  action: 'change' | 'remove';
  data: T[];
  name?: string;
  value?: unknown;
  setError: Dispatch<SetStateAction<E>>;
}

type ValidateFn<T, E> = (props: ValidateProps<T, E>) => void;

export default function useFieldArray<T>(
  defaultValue: T[],
  validate: ValidateFn<T, unknown[]>
) {
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState<unknown[]>([]);
  const debounceValidate = useMemo(() => debounce(validate), [validate]);

  const append = useCallback(
    (value: T) => setData((pre) => [...pre, value]),
    []
  );

  const remove = useCallback(
    (index: number) => {
      setError(removeElementAtIndex(index));
      setData((pre) => {
        const updated = removeElementAtIndex(index)(pre);
        debounceValidate({ action: 'remove', data: updated, setError });
        return updated;
      });
    },
    [debounceValidate]
  );

  const onChange = useCallback(
    ({ target }: { target: Target<unknown> }) => {
      const { name, value } = target;
      setData((pre) => {
        const updated = updateNestedValue(pre, name, value);

        debounceValidate({
          action: 'change',
          data: updated,
          name,
          value,
          setError,
        });
        return updated;
      });
    },
    [debounceValidate]
  );

  const control = useMemo(() => ({ onChange }), [onChange]);

  return { data, control, error, append, remove };
}
