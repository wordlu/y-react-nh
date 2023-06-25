import styled from 'styled-components';

const ContainerMain = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-grow: 1;

  & .ant-table-body {
    min-height: calc(100vh - 240px);
  }

  & .ant-table-placeholder{
    // height: calc(100vh - 190px);
  }
`;

// const FormContainer = styled.div`
//   background: #eef1f6;
//   padding: 5px;
// `;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

export { PaginationContainer, ContainerMain }