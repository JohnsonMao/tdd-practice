import { FC, memo, useEffect, useMemo } from 'react';
import { Button, Col, List, Row, Typography } from 'antd';
import useFieldArray from '@/hooks/useFieldArray';
import getNumberIntervals from '@/utils/getNumberIntervals';
import { generateId } from '@/utils';
import type { WithId } from '@/types';
// import { validateAgeGroup, validatePrice } from '@/utils/validate';

import AgeGroupSelect from '../AgeGroupSelect';
import PriceInput from '../PriceInput';
import type {
  AgeGroupPriceListProps,
  Value,
  AgeGroup,
} from './AgeGroupPriceList.type';

const MemoAgeGroupSelect = memo(AgeGroupSelect);
const MemoPriceInput = memo(PriceInput);

const MIN = 0;
const MAX = 20;
const defaultValues: WithId<Value>[] = [
  {
    id: generateId(),
    ageGroup: [MIN, MAX],
    price: 0,
  },
];

// function validateFn({ action, name, value, data, setError }) {
//   if (action === 'remove' || name?.includes?.('ageGroup')) {
//     validateAgeGroup({ data, setError });
//     return;
//   }
//   if (name?.includes?.('price')) {
//     validatePrice({ name, value, setError });
//   }
// }

const AgeGroupPriceList: FC<AgeGroupPriceListProps> = ({ onChange }) => {
  const { data, control, append, remove } = useFieldArray(
    defaultValues,
    () => 0
    // validateFn
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
      ageGroup: notInclude[0] as AgeGroup,
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
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <Row align="middle">
              <Col flex="auto">
                <Typography.Title level={4}>
                  價格設定 - {index + 1}
                </Typography.Title>
              </Col>
              <Col>
                {!!index && (
                  <Button type="text" danger onClick={() => remove(index)}>
                    Ｘ 移除
                  </Button>
                )}
              </Col>
            </Row>
            <Row gutter={[16, 8]} wrap>
              <Col span={24} sm={12}>
                <MemoAgeGroupSelect
                  min={MIN}
                  max={MAX}
                  name={`${index}.ageGroup`}
                  // errorMessage={error?.[index]?.ageGroup}
                  value={item.ageGroup}
                  onChange={control.onChange}
                />
              </Col>
              <Col span={24} sm={12}>
                <MemoPriceInput
                  name={`${index}.price`}
                  // errorMessage={error?.[index]?.price}
                  value={item.price}
                  onChange={control.onChange}
                />
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Button type="link" onClick={handleAppend} disabled={isNotInclude}>
        ＋新增價格設定
      </Button>
    </>
  );
};

export default AgeGroupPriceList;
