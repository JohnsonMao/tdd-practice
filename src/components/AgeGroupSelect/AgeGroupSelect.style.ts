import styled from 'styled-components';

export const StyledSeparator = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  background-color: #f4f4f5;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

export const StyledAgeGroupSelectWrapper = styled.div`
  .ant-select {
    width: 100%;
  }
  .ant-row {
    margin: 0.5rem 0 0;
  }
  .ant-col:first-of-type .ant-select-selector {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .ant-col:last-of-type .ant-select-selector {
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
