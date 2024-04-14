import Field from './base/Field';
import Group from './base/Group';
import Label from './base/Label';
import Select from './base/Select';
import Text from './base/Text';

const options = new Array(20).fill(0).map((_, index) => ({
  label: index + 1,
  value: index + 1,
}));

export default function AgeGroupSelect({ className }) {
  return (
    <Field name="a" className={className}>
      <Label>年齡</Label>
      <Group>
        <Select options={options} $isError />
        <Text>～</Text>
        <Select options={options} $isError />
      </Group>
      <Text className="p-2 font-bold rounded-sm" $isError>
        年齡區間不可重疊
      </Text>
    </Field>
  );
}
