import Field from './base/Field';
import Group from './base/Group';
import Input from './base/Input';
import Label from './base/Label';
import Text from './base/Text';
import { addComma } from '../utils';

export default function PriceInput({
  name,
  value,
  onChange,
  className = '',
  errorMessage = '',
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const price = addComma(value);
    const target = { name };
    if (price) {
      target.value = price;
    } else {
      target.value = value;
    }
    onChange({ target });
  };

  return (
    <Field name={name} className={className}>
      <Label>入住費用 (每人每晚)</Label>
      <Group>
        <Text>TWD</Text>
        <Input
          $isError={!!errorMessage}
          value={value}
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
