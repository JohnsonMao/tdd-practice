import { memo, useEffect, useMemo } from 'react';
import List, { ListItem } from './base/List';
import Button from './base/Button';
import AgeGroupSelect from './AgeGroupSelect';
import PriceInput from './PriceInput';
import useFieldArray from '../hooks/useFieldArray';
import { generateId, getNumberIntervals } from '../utils';
import { validateAgeGroup, validatePrice } from '../utils/validate';

const MemoAgeGroupSelect = memo(AgeGroupSelect);
const MemoPriceInput = memo(PriceInput);

const MIN = 0;
const MAX = 20;
const defaultValues = [
  {
    id: generateId(),
    ageGroup: [MIN, MAX],
    price: 0,
  },
];

function validateFn({ action, name, value, data, setError }) {
  if (action === 'remove' || name?.includes?.('ageGroup')) {
    validateAgeGroup({ data, setError });
    return;
  }
  if (name?.includes?.('price')) {
    validatePrice({ name, value, setError });
  }
}

export default function AgeGroupPriceList({ onChange }) {
  const { data, control, error, append, remove } = useFieldArray(
    defaultValues,
    validateFn
  );
  const { notInclude } = useMemo(
    () => getNumberIntervals(data.map((item) => item.ageGroup)),
    [data]
  );
  const isNotInclude = !notInclude.length;

  const handleAppend = () => {
    if (isNotInclude) return;
    append({
      id: generateId(),
      price: 0,
      ageGroup: notInclude[0],
    });
  };

  useEffect(() => {
    const result = data.map((item) => ({
      ageGroup: item.ageGroup,
      price: item.price,
    }));
    onChange?.(result);
  }, [data, onChange]);

  return (
    <>
      <List>
        {data.map((item, index) => (
          <ListItem key={item.id}>
            <div className="flex">
              <h2 className="font-bold font-lg flex-1">
                價格設定 - {index + 1}
              </h2>
              {!!index && (
                <Button $variant="danger" onClick={() => remove(index)}>
                  ╳ 移除
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <MemoAgeGroupSelect
                className="flex-1"
                min={MIN}
                max={MAX}
                name={`${index}.ageGroup`}
                errorMessage={error?.[index]?.ageGroup}
                value={item.ageGroup}
                onChange={control.onChange}
              />
              <MemoPriceInput
                className="flex-1"
                name={`${index}.price`}
                errorMessage={error?.[index]?.price}
                value={item.price}
                onChange={control.onChange}
              />
            </div>
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAppend} disabled={isNotInclude}>
        ＋新增價格設定
      </Button>
    </>
  );
}
