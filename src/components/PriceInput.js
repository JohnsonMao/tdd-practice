import { useState } from 'react';
import Field from './base/Field';
import Group from './base/Group';
import Input from './base/Input';
import Label from './base/Label';
import Text from './base/Text';
import { addComma } from '../utils';

export default function PriceInput({
  name,
  className = '',
  errorMessage = '',
  value = 0,
}) {
  const [price, setPrice] = useState(String(value));

  const handleChange = ({ target }) => {
    const number = addComma(target.value.replace(/,/g, ''));
    if (number) {
      setPrice(number);
      return;
    }
    setPrice(target.value);
  };

  return (
    <Field name={name} className={className}>
      <Label>入住費用 (每人每晚)</Label>
      <Group>
        <Text>TWD</Text>
        <Input
          $isError={!!errorMessage}
          value={price}
          onChange={handleChange}
        />
      </Group>
      {errorMessage && (
        <Text className="p-2 font-bold rounded-sm" $isError>
          {errorMessage}
        </Text>
      )}
      <Text className="mt-1 text-right">輸入 0 表示免費</Text>
    </Field>
  );
}
