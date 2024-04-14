import { useField } from '../Field';
import StyledSelect from './StyledSelect';

const Select = (props) => {
  const { id, name } = useField();

  return <StyledSelect id={`${name}-${id}`} name={name} {...props} />;
};

export default Select;
