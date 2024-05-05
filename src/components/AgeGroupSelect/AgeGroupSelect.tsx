import { FC, useMemo } from 'react';
import { Row, Col, Typography, Select } from 'antd';

import {
  StyledAgeGroupSelectWrapper,
  StyledErrorMessage,
  StyledSeparator,
} from './AgeGroupSelect.style';
import type { AgeGroupSelectProps } from './AgeGroupSelect.type';

const AgeGroupSelect: FC<AgeGroupSelectProps> = ({
  name,
  value,
  min = 0,
  max = 20,
  errorMessage,
  onChange,
}) => {
  const options = useMemo(
    () => new Array(max - min + 1).fill(0).map((_, index) => min + index),
    [min, max]
  );

  const [startAge, endAge] = value;

  const handleChange = (targetName: string) => (targetValue: number) => {
    if (!onChange) return;
    onChange({ target: { name: targetName, value: targetValue } });
  };

  return (
    <StyledAgeGroupSelectWrapper>
      <Typography.Text>年齡</Typography.Text>
      <Row align="stretch">
        <Col flex="auto">
          <Select
            size="large"
            status={errorMessage && 'error'}
            value={startAge}
            onChange={handleChange(`${name}.0`)}
            options={options.map((option) => ({
              key: option,
              value: option,
              disabled: endAge < option,
            }))}
          />
        </Col>
        <Col>
          <StyledSeparator>～</StyledSeparator>
        </Col>
        <Col flex="auto">
          <Select
            size="large"
            status={errorMessage && 'error'}
            value={endAge}
            onChange={handleChange(`${name}.1`)}
            options={options.map((option) => ({
              key: option,
              value: option,
              disabled: startAge > option,
            }))}
          />
        </Col>
      </Row>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledAgeGroupSelectWrapper>
  );
};

export default AgeGroupSelect;
