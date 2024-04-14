import { useField } from '../Field';
import StyledInput from './StyledInput';

const Input = (props) => {
  const { id, name } = useField();

  return <StyledInput id={`${name}-${id}`} name={name} {...props} />;
};

export default Input;
