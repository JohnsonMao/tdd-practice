import { useMemo, useState } from 'react';
import Field from './base/Field';
import Group from './base/Group';
import Label from './base/Label';
import Select, { SelectOption } from './base/Select';
import Text from './base/Text';

export default function AgeGroupSelect({
  className,
  errorMessage = '',
  min = 0,
  max = 20,
}) {
  const [ageGroup, setAgeGroup] = useState([min, max]);
  const options = useMemo(
    () => new Array(max - min + 1).fill(0).map((_, index) => min + index),
    [min, max]
  );

  const [startAge, endAge] = ageGroup;

  const handleChange =
    (index) =>
    ({ target }) => {
      console.log(ageGroup);
      setAgeGroup((pre) => {
        const updated = pre.concat();
        updated[index] = Number(target.value);
        return updated;
      });
    };

  return (
    <Field name="a" className={className}>
      <Label>年齡</Label>
      <Group>
        <Select
          $isError={!!errorMessage}
          defaultValue={startAge}
          onChange={handleChange(0)}
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
          $isError={!!errorMessage}
          defaultValue={endAge}
          onChange={handleChange(1)}
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
