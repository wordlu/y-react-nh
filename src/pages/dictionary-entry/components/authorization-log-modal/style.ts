import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  & .ant-tabs-nav {
    // background: #fafafa;
    // background: rgb(245, 247, 250);
    background: #eef1f6;
    padding-left: 10px;
    padding-right: 5px;
    margin: 0;
  }

  & .ant-tabs {
    width: 100% !important;
    height: 100% !important;
    overflow-x: hidden;
    overflow-y: auto;
  }

  & .ant-tabs-tab {
    padding: 8px 0 !important;
  }

  & .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 20px !important;
  }

  & .ant-tabs-extra-content {
    position: relative;
    top: 2px;

    &:nth-child(1) {
      background: #fff;
      margin-right: 15px;
    }
  }

  & .ant-tabs-extra-content svg {
    font-size: 14px !important;
  }

  & .ant-tabs-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  & .ant-tabs-tabpane {
    padding: 10px;
  }
`;

export const TabContainer = styled.div`
  padding: 5px;
  height: 100%;
  // overflow-x: hidden;
  // overflow-y: auto;
  overflow:hidden;
  border: 1px solid rgb(245, 247, 250);
  display:flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavTitle = styled.div`
  background: #eef1f6;
  padding-left: 10px;
  padding-right: 5px;
  margin: 0;
  height: 34px;
  display: flex;
  align-items: center;
`;

export const ModelBody = styled.div`
  height: calc(100vh - 220px);
`
