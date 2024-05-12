import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from 'react';
import { Row, Col, Input, Typography } from 'antd';
import addComma, { InvalidPrice } from '@/utils/addComma';

import {
  StyledAddon,
  StyledErrorMessage,
  StyledHelperMessage,
  StyledPriceInputWrapper,
} from './PriceInput.style';
import type { PriceInputProps } from './PriceInput.type';

const PriceInput: FC<PriceInputProps> = ({
  autoFocus,
  canDecimal = true,
  canNegative = true,
  defaultValue = 0,
  errorMessage,
  prefix,
  onChange,
}) => {
  const [price, setPrice] = useState(() => addComma(defaultValue));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let { value } = event.target;
    if (value.startsWith('0')) {
      value = value.replace(/^0+/, '');
      if (!value) value = '0';
    }
    if (value.startsWith('.')) {
      value = `0${value}`;
    }

    const formattedValue = addComma(value);
    const number = parseFloat(formattedValue.replace(/,/g, ''));
    const isInvalidPrice = formattedValue === InvalidPrice;

    setPrice(isInvalidPrice ? value : formattedValue);
    onChange?.(number);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const isNumber = /\d/.test(event.key);
    const allowedKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
      'Delete',
      'Home',
      'End',
      'Tab',
    ];
    const onlyOnceKeys = [canNegative && '-', canDecimal && '.'];

    if (
      isNumber ||
      allowedKeys.includes(event.key) ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    if (onlyOnceKeys.includes(event.key) && !price.includes(event.key)) {
      return;
    }
    event.preventDefault();
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    event.currentTarget.select();
  };

  return (
    <StyledPriceInputWrapper>
      <Typography.Text>入住費用 (每人每晚)</Typography.Text>
      <Row align="stretch">
        <Col>
          <StyledAddon>{prefix}</StyledAddon>
        </Col>
        <Col flex="auto">
          <Input
            size="large"
            value={price}
            status={errorMessage && 'error'}
            autoFocus={autoFocus}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Col>
      </Row>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      <StyledHelperMessage>輸入 0 表示免費</StyledHelperMessage>
    </StyledPriceInputWrapper>
  );
};

export default PriceInput;
