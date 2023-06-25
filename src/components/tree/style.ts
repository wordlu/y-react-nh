import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // border-right: 3px solid rgb(245, 247, 250);
  padding-right: 5px;
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

export const SelectContainer = styled.div`
  width: 100%;
  // padding-bottom: 10px;
  // background: aliceblue;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 5px;

  & .ant-select-selector {
    height: 26px !important;
  }

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
  // height: 36px;
  padding: 0 5px;
  // background: aliceblue;
  height: 34px;

  & .ant-input {
    font-size: 12px;
    height: 26px;
  }

  & .ant-input-search-button {
    width: 26px;
    height: 26px;
    padding: 0;
    font-size: 12px;
  }

  & .ant-btn {
    margin-right: 0 !important;
  }
`;

export const TreeContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 10px;

  & .ant-tree-title {
    white-space: nowrap;
  }

  & .ant-tree {
    font-size: 12px !important;
  }
`;

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
