import styled, { css } from 'styled-components';

/**
 * @typedef StyledButtonProps
 * @prop {'primary' | 'danger'} [$variant]
 * @prop {boolean} [disabled]
 */

/** @type {import('styled-components').IStyledComponent<'web', StyledButtonProps & import('react').ButtonHTMLAttributes>} */
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  ${(props) =>
    css`
      color: var(--${props.$variant || 'primary'}-color);
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`;

export default StyledButton;
