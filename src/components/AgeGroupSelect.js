import { useMemo } from 'react';
import Field from './base/Field';
import Group from './base/Group';
import Label from './base/Label';
import Select, { SelectOption } from './base/Select';
import Text from './base/Text';

export default function AgeGroupSelect({
  name,
  value,
  onChange,
  className = '',
  errorMessage = '',
  min = 0,
  max = 20,
}) {
  const options = useMemo(
    () => new Array(max - min + 1).fill(0).map((_, index) => min + index),
    [min, max]
  );

  const [startAge, endAge] = value;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const target = { name, value: Number(value) };
    onChange({ target });
  };

  return (
    <Field name={name} className={className}>
      <Label>年齡</Label>
      <Group>
        <Select
          name={`${name}.0`}
          $isError={!!errorMessage}
          defaultValue={startAge}
          onChange={handleChange}
        >
          {options.map((option) => (
            <SelectOption
              key={option}
              value={option}
              disabled={endAge < option}
            >
              {option}
            </SelectOption>
          ))}
        </Select>
        <Text>～</Text>
        <Select
          name={`${name}.1`}
          $isError={!!errorMessage}
          defaultValue={endAge}
          onChange={handleChange}
        >
          {options.map((option) => (
            <SelectOption
              key={option}
              value={option}
              disabled={startAge > option}
            >
              {option}
            </SelectOption>
          ))}
        </Select>
      </Group>
      {errorMessage && (
        <Text className="p-2 font-bold rounded-sm" $isError>
          {errorMessage}
        </Text>
      )}
    </Field>
  );
}
