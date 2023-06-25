import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  & .ant-table-body {
    min-height: calc(100vh - 320px);
  }
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

export { PaginationContainer, Container }