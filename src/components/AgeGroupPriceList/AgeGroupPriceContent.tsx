import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';

import AgeGroupSelect from '../AgeGroupSelect';
import PriceInput from '../PriceInput';
import type {
  AgeGroupPriceContentProps,
  AgeGroupType,
  PriceType,
} from './AgeGroupPriceList.type';

const MemoAgeGroupSelect = memo(AgeGroupSelect);
const MemoPriceInput = memo(PriceInput);

const AgeGroupPriceContent: FC<AgeGroupPriceContentProps> = ({
  id,
  value,
  min = 0,
  max = 20,
  onChange,
}) => {
  const [ageGroupPrice, setAgeGroupPrice] = useState(value);

  const handleAgeGroup = useCallback((ageGroup: AgeGroupType) => {
    setAgeGroupPrice((preState) => ({
      ...preState,
      ageGroup,
    }));
  }, []);

  const handlePrice = useCallback((price: PriceType) => {
    setAgeGroupPrice((preState) => ({
      ...preState,
      price,
    }));
  }, []);

  useEffect(() => {
    onChange?.(id, ageGroupPrice);
  }, [onChange, id, ageGroupPrice]);

  return (
    <Row gutter={[16, 8]} wrap>
      <Col span={24} sm={12}>
        <MemoAgeGroupSelect
          min={min}
          max={max}
          defaultValue={value.ageGroup}
          onChange={handleAgeGroup}
        />
      </Col>
      <Col span={24} sm={12}>
        <MemoPriceInput
          autoFocus
          canNegative={false}
          defaultValue={value.price}
          onChange={handlePrice}
          prefix="TWD"
        />
      </Col>
    </Row>
  );
};

export default AgeGroupPriceContent;
