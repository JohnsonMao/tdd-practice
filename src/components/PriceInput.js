import Field from './base/Field';
import Group from './base/Group';
import Input from './base/Input';
import Label from './base/Label';
import Text from './base/Text';

export default function PriceInput() {
  return (
    <Field name="a">
      <Label>入住費用 (每人每晚)</Label>
      <Group>
        <Text>TWD</Text>
        <Input $isError />
      </Group>
      <Text className="p-2 rounded-sm" $isError>
        不可以為空白
      </Text>
      <Text className="mt-1 text-right">輸入 0 表示免費</Text>
    </Field>
  );
}
