import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  background: #fff;
  display: flex;
  font-size: 12px !important;
`;

export const LeftContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 3px solid rgb(245, 247, 250);
  padding-right: 5px;
  font-size: 12px !important;
  // padding-top: 5px;

  & .ant-btn-icon-only {
    vertical-align: -1px;
  }

  & .ant-tree .ant-tree-treenode {
    padding: 0;
  }

  & .ant-tree-checkbox {
    margin-right: 0;
  }

  & .ant-tree-checkbox-inner {
    width: 14px;
    height: 14px;
  }
`;

export const RightContainer = styled.div`
  flex: 4;
  height: 100%;
  overflow: hidden;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  font-size: 12px !important;

  & .ant-tabs-content {
    height: 100%;
  }
`;

export const FormContainer = styled.div`
  background: aliceblue;
  // padding: 10px;
  min-height: 40px;
  // height: 40px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 10px;
  position: relative;
  font-size: 12px !important;

  & .ant-form-inline .ant-form-item-with-help {
    margin-bottom: 0;
  }

  & .liquidity-exposure-btn {
    position: absolute;
    right: 60px;
  }

  & .ant-picker {
    height: 24px;
    width: 180px;
  }

  & .ant-select-selector {
    width: 180px !important;
  }

  & .ant-form-item {
    margin-right: 25px;
    font-size: 12px !important;
  }

  & .ant-form-item-label > label {
    font-size: 12px !important;
  }

  & .ant-picker-input > input {
    font-size: 12px !important;
  }

  & .ant-btn-sm {
    font-size: 12px !important;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  // padding-bottom: 10px;
  background: aliceblue;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 5px;

  & .ant-select {
    width: 100%;
    font-size: 12px;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 5px;
  font-size: 12px !important;

  & .ant-input-search-button {
    width: 21px;
    height: 21px;
    padding: 0;
  }
`;

export const TreeContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  & .ant-tree-title {
    white-space: nowrap;
  }

  & .ant-tree {
    font-size: 12px !important;
  }
`;

export const MainContainer = styled.div`
  flex: 1;
  overflow-x: hiddden;
  overflow-y: auto;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TabContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  paddingleft: 5px;
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
  & .ant-table.ant-table-small {
    height: 100% !important;
  }

  & .ant-table-body {
    max-height: 100% !important;
  }

  & .ant-table-body {
    height: calc(100% - 40px) !important;
  }

  & .ant-table-placeholder {
    height: calc(100vh - 210px);
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
`;
