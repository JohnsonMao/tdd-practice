import { ChangeEventHandler, FC, useMemo } from 'react';
import { Row, Col, Input, Typography } from 'antd';
import { addComma } from '@/utils';

import {
  StyledPriceInputWrapper,
  StyledAddon,
  StyledErrorMessage,
  StyledHelperMessage,
} from './PriceInput.style';
import type { PriceInputProps } from './PriceInput.type';

const PriceInput: FC<PriceInputProps> = ({
  name,
  value,
  errorMessage,
  onChange,
}) => {
  const price = useMemo(() => {
    const number = addComma(value);
    if (number) return number;
    return value;
  }, [value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    const price = addComma(value);
    const target = {
      name,
      value: price ? Number(price.replace(/,/g, '')) : value,
    };
    if (onChange) onChange({ target });
  };

  return (
    <StyledPriceInputWrapper>
      <Typography.Text>入住費用 (每人每晚)</Typography.Text>
      <Row align="stretch">
        <Col>
          <StyledAddon>TWD</StyledAddon>
        </Col>
        <Col flex="auto">
          <Input
            size="large"
            name={name}
            value={price}
            status={errorMessage && 'error'}
            onChange={handleChange}
          />
        </Col>
      </Row>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      <StyledHelperMessage>輸入 0 表示免費</StyledHelperMessage>
    </StyledPriceInputWrapper>
  );
};

export default PriceInput;
