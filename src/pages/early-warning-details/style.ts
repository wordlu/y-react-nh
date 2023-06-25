import styled from 'styled-components';

export const TabContainer = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 5px 5px;
  display: flex;

  & .ant-tabs-nav {
    margin: 0 !important;
  }

  & .ant-tabs-content-holder {
    flex: 1;
    overflow: hidden;
  }

  & .ant-tabs-content {
    height: 100%;
    overflow: hidden;
  }

  & .ant-tabs-tabpane {
    height: 100%;
    // overflow: hidden;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  // padding: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  padding-right: 10px;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 100%;
  overflow: hidden;
  // margin-top: 5px;
  margin-left: 5px;
  // border-top: 1px solid rgb(245,247,250);
  padding: 5px 0;
`;

export const LeftContainer = styled.div`
  flex: 5;
  overflow: hidden;
  // border-right: 1px solid #ccc;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 5px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  // height: 50%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  // border-bottom: 1px solid #ccc;
  border: 1px solid rgb(245, 247, 250);
  padding: 5px;
`;

export const ChartBox = styled.div`
  width: 100%;
  height: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden;
`;

export const PositionTableContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Tip = styled.div`
  font-size: 12px;
  padding-left: 5px;

  // & span {
  //   color: #1890ff;
  // }
`;
