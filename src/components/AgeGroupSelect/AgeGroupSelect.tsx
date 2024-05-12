import { FC, useMemo } from 'react';
import { Row, Col, Typography, Select } from 'antd';

import useIntervalRange from '@/hooks/useIntervalRange';
import {
  StyledAgeGroupSelectWrapper,
  StyledErrorMessage,
  StyledSeparator,
} from './AgeGroupSelect.style';
import {
  ACTION_TYPE,
  AgeGroupSelectProps,
  HandleChangeType,
} from './AgeGroupSelect.type';

const AgeGroupSelect: FC<AgeGroupSelectProps> = ({
  min = 0,
  max = 20,
  errorMessage,
  defaultValue = [min, max],
  onChange,
}) => {
  const { interval, setIntervalStart, setIntervalEnd } =
    useIntervalRange(defaultValue);
  const options = useMemo(
    () => new Array(max - min + 1).fill(0).map((_, index) => min + index),
    [min, max]
  );
  const [intervalStart, intervalEnd] = interval;
  const intervalStartOptions = useMemo(
    () =>
      options.map((option) => ({
        key: option,
        value: option,
        disabled: intervalEnd < option,
      })),
    [options, intervalEnd]
  );
  const intervalEndOptions = useMemo(
    () =>
      options.map((option) => ({
        key: option,
        value: option,
        disabled: intervalStart > option,
      })),
    [options, intervalStart]
  );

  const handleChange: HandleChangeType = (action) => (value) => {
    switch (action) {
      case ACTION_TYPE.UPDATE_START_VALUE:
        setIntervalStart(value);
        onChange?.([value, interval[1]]);
        return;
      case ACTION_TYPE.UPDATE_END_VALUE:
        setIntervalEnd(value);
        onChange?.([interval[0], value]);
        return;
      default:
        new Error();
    }
  };

  return (
    <StyledAgeGroupSelectWrapper>
      <Typography.Text>年齡</Typography.Text>
      <Row align="stretch">
        <Col flex="auto">
          <Select
            size="large"
            status={errorMessage && 'error'}
            value={intervalStart}
            onChange={handleChange(ACTION_TYPE.UPDATE_START_VALUE)}
            options={intervalStartOptions}
          />
        </Col>
        <Col>
          <StyledSeparator>～</StyledSeparator>
        </Col>
        <Col flex="auto">
          <Select
            size="large"
            status={errorMessage && 'error'}
            value={intervalEnd}
            onChange={handleChange(ACTION_TYPE.UPDATE_END_VALUE)}
            options={intervalEndOptions}
          />
        </Col>
      </Row>
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledAgeGroupSelectWrapper>
  );
};

export default AgeGroupSelect;
