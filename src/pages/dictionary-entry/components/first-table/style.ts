import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;

  & .ant-form-item-with-help .ant-form-item-explain {
    display: none;
  }
`;

export const TablesForm = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 5px;

  & .ant-tabs {
    flex: 1;
    overflow: hidden;
  }

  & .ant-tabs-content {
    height: 100%;
    overflow-y: hidden;
  }
`;