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

  & .ant-form-item {
    margin-bottom: 0px !important;
    font-size: 12px !important;
  }

  & .ant-form-item-explain {
    height: 15px;
    min-height: 15px;
  }

  & .ant-form-item-label > label, & .ant-btn-sm, & .ant-picker-input > input, & .ant-select, .ant-btn {
    font-size: 12px !important;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 40px 10px;
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
