import styled, { css } from 'styled-components';

/**
 * @typedef StyledInputProps
 * @prop {boolean} [$isError]
 */

/** @type {import('styled-components').IStyledComponent<'web', StyledInputProps & import('react').HTMLAttributes>} */
export const StyledSelect = styled.select`
  position: relative;
  flex: 1;
  z-index: 1;
  outline: none;
  ${(props) =>
    props.$isError &&
    css`
      --border-color: var(--danger-color);
    `}
`;

export const StyledOption = styled.option``;
