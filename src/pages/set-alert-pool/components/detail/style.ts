import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;
  margin-top: 5px;
  border: 1px solid rgb(245, 247, 250);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .ant-table-placeholder {
    height: calc(100vh - 250px);
  }
`;

export const PaginationConteiner = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 10px;
`;
