import { createContext, useContext, useId } from 'react';
import StyledField from './StyledField';

const FieldContext = createContext(null);

export const useField = () => useContext(FieldContext);

export default function Field({ children, name, className }) {
  const id = useId();
  const value = { id, name };

  return (
    <FieldContext.Provider value={value}>
      <StyledField className={className}>{children}</StyledField>
    </FieldContext.Provider>
  );
}
