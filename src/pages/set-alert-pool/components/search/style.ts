import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: rgb(245, 247, 250);
  position: relative;

  .ant-input::placeholder {
    font-size: 12px;
  }
`;

export const Back = styled.div`
  position: absolute;
  left: 0;
  padding: 10px;
  color: #1890ff;
  cursor: pointer;
`;
