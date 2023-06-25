import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  & .ant-table-body {
    // min-height: calc(100vh - 316px);
    min-height: calc(100vh - 280px);
  }

  .ant-select,
  .ant-modal,
  .ant-modal-body,
  .ant-btn > span {
    font-size: 12px !important;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

export { PaginationContainer, Container };
