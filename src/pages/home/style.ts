import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;

  & .ant-table-body {
    min-height: calc(100vh - 220px);
  }

  & .ant-table-placeholder {
    height: calc(100vh - 200px);
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;
