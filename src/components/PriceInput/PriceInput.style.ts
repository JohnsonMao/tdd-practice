import styled from 'styled-components';

export const StyledAddon = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  background-color: #f4f4f5;
  border: 1px solid #d9d9d9;
  border-right: 0;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

export const StyledPriceInputWrapper = styled.div`
  .ant-row {
    margin: 0.5rem 0 0;
  }
  .ant-input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const StyledErrorMessage = styled.div`
  display: block;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #f57954;
  background-color: #fbe9e7;
  border-radius: 0.25rem;
`;

export const StyledHelperMessage = styled.div`
  display: block;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: right;
`;
