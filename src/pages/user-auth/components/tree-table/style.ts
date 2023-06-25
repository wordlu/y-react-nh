import styled from 'styled-components';

export const FormContainer = styled.div`
  background: aliceblue;
  // padding: 10px;
  min-height: 40px;
  // display: flex;
  // align-items: center;
  // flex-shrink: 0;
  padding-left: 10px;
  position: relative;

  & .ant-form-inline .ant-form-item-with-help {
    margin-bottom: 0;
  }

  & .liquidity-exposure-btn {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
  }

  & .ant-picker {
    height: 24px;
    width: 100%;
  }

  & .ant-select-selector {
    // width: 180px !important;
  }

  & .ant-form-item {
    // margin-right: 25px;
    margin-bottom: 0px !important;
  }

  // & .ant-form-item:last-child{
  //   margin-left: 100px;
  // }

  & .ant-form-item-explain {
    height: 15px;
    min-height: 15px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 30px 10px;

  .ant-select {
    font-size: 12px !important;
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  overflow-y: hidden;
  margin-top: 5px;
  // padding-left: 5px;
  // padding-right: 5px;

  & .ant-spin-nested-loading,
  & .ant-spin-container,
  & .ant-table-container,
  & .ant-table.ant-table-small{
    height: 100% !important;
  }

  & .ant-table-body {
    max-height: 100% !important;
  }

  & .ant-table-body {
    height: calc(100% - 40px) !important;
  }

  & .ant-table-placeholder{
    height: calc(100vh - 210px);
  }
`;
