import { useCallback, useMemo, useState } from 'react';
import { removeElementAtIndex, updateNestedValue } from '../utils';

/**
 * @template T
 * @typedef ValidateProps
 * @prop {'change' | 'remove'} action
 * @prop {T[]} data
 * @prop {string} [name]
 * @prop {*} [value]
 * @prop {React.Dispatch<React.SetStateAction<{}>>} setError
 */

/**
 * @template T
 * @param {T[]} defaultValue
 * @param {(props: ValidateProps<T>) => void} validate
 */
export default function useFieldArray(defaultValue, validate) {
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState([]);
  const append = useCallback(
    /** @param {T} value */
    (value) => setData((pre) => [...pre, value]),
    []
  );

  const remove = useCallback(
    /** @param {number} index */
    (index) => {
      setError(removeElementAtIndex(index));
      setData((pre) => {
        const updated = removeElementAtIndex(index)(pre);
        validate({ action: 'remove', data: updated, setError });
        return updated;
      });
    },
    [validate]
  );

  const onChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setData((pre) => {
        const updated = updateNestedValue(pre, name, value);

        validate({
          action: 'change',
          data: updated,
          name,
          value,
          setError,
        });
        return updated;
      });
    },
    [validate]
  );

  const control = useMemo(() => ({ onChange }), [onChange]);

  return { data, control, error, append, remove };
}
