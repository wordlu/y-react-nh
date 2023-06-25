import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const BlockContainer = styled.div`
  // margin-top: 10px;
  margin-bottom: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  // font-size: 13px !important;
  font-weight: 400;
  padding: 0 5px;
  // border-left: 4px solid #1890ff;
  margin: 0 0 10px;
  display: inline-block;
  background: aliceblue;
  border: 1px solid #f0ebeb;
  font-size: 12px !important;
`;

export const ContentContainer = styled.div<{ isFold: boolean }>`
  margin-left: 10px;
  margin-right: 10px;
  height: ${({ isFold }) => (isFold ? 0 : 'auto')};
  overflow: hidden;
`;

export const FoldText = styled.span`
  cursor: default;
  color: #1890ff;
  margin-right: 10px;
  font-size: 12px !important;
`;
