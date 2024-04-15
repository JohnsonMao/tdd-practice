import { addComma, getNumberIntervals, updateNestedValue } from '.';

export function validatePrice({ name, value, setError }) {
  const _value = String(value);

  if (_value.trim() === '') {
    setError((pre) => updateNestedValue(pre, name, '不可以為空白'));
  } else if (addComma(value) === '') {
    setError((pre) => updateNestedValue(pre, name, '金額格式不正確'));
  } else if (_value[0] === '-') {
    setError((pre) => updateNestedValue(pre, name, '不可以為負數'));
  } else {
    setError((pre) => updateNestedValue(pre, name, ''));
  }
}

export function validateAgeGroup({ data, setError }) {
  if (!Array.isArray(data)) return;

  const { overlap } = getNumberIntervals(data.map((item) => item.ageGroup));

  data.forEach((item, index) => {
    const [start, end] = item.ageGroup;
    const key = `${index}.ageGroup`;

    if (!overlap.length) {
      setError((pre) => updateNestedValue(pre, key, ''));
    }

    for (const [overlapStart, overlapEnd] of overlap) {
      if (end < overlapStart || start > overlapEnd) {
        setError((pre) => updateNestedValue(pre, key, ''));
      } else {
        setError((pre) => updateNestedValue(pre, key, '年齡區間不可重疊'));
        break;
      }
    }
  });
}
