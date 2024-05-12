import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { Button, List } from 'antd';

import useFieldArray from '@/hooks/useFieldArray';
import getNumberIntervals from '@/utils/getNumberIntervals';
// import { validateAgeGroup, validatePrice } from '@/utils/validate';

import type {
  AgeGroupPriceListProps,
  HandleChangeType,
  GenerateDefaultValue,
} from './AgeGroupPriceList.type';
import AgeGroupPriceHeader from './AgeGroupPriceHeader';
import AgeGroupPriceContent from './AgeGroupPriceContent';

const generateDefaultValue: GenerateDefaultValue = ({ min, max }) => [
  {
    ageGroup: [min, max],
    price: 0,
  },
];

const MemoAgeGroupPriceHeader = memo(AgeGroupPriceHeader);
const MemoAgeGroupPriceContent = memo(AgeGroupPriceContent);

// function validateFn({ action, name, value, data, setError }) {
//   if (action === 'remove' || name?.includes?.('ageGroup')) {
//     validateAgeGroup({ data, setError });
//     return;
//   }
//   if (name?.includes?.('price')) {
//     validatePrice({ name, value, setError });
//   }
// }

const AgeGroupPriceList: FC<AgeGroupPriceListProps> = ({
  min = 0,
  max = 20,
  defaultValue = generateDefaultValue({ min, max }),
  onChange,
}) => {
  const { value, update, append, remove } = useFieldArray(defaultValue);

  const { notInclude } = useMemo(
    () => getNumberIntervals(value.map((item) => item.ageGroup)),
    [value]
  );
  const hasNotInclude = notInclude.length;

  useEffect(() => {
    onChange?.(value.map(({ price, ageGroup }) => ({ price, ageGroup })));
  }, [onChange, value]);

  const handleAppend = () => {
    if (!hasNotInclude) return;
    append({
      price: 0,
      ageGroup: notInclude[0],
    });
  };

  const handleChange: HandleChangeType = useCallback(
    (id, value) => update(id, value),
    [update]
  );

  return (
    <>
      <List itemLayout="vertical">
        {Array.isArray(value) &&
          value.map((item, index) => (
            <List.Item key={item.id}>
              <MemoAgeGroupPriceHeader
                index={index}
                id={item.id}
                onRemove={index ? remove : undefined}
              />
              <MemoAgeGroupPriceContent
                id={item.id}
                value={item}
                onChange={handleChange}
              />
            </List.Item>
          ))}
      </List>
      <Button type="link" onClick={handleAppend} disabled={!hasNotInclude}>
        ＋新增價格設定
      </Button>
    </>
  );
};

export default AgeGroupPriceList;
