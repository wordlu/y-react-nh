import styled from 'styled-components';

export const WrappedContainer = styled.div`
  width: 100%;
  padding: 16px 12px;
  height: 100%;
  overflow-y: auto;
  & > div {
    margin-bottom: 16px;
    height: auto;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const LineContainer = styled.div`
  display: flex;
  width: 100%;
  & > div {
    flex: 1;
    flex-grow: 1;
    margin-right: 16px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const CellTextAlign = styled.div<{ textAlign: string; color?: string }>`
  text-align: ${({ textAlign }) => textAlign || 'center'};
  color: ${({ color }) => color || '#3C4455'};
  font-weight: 400;
`;

export const SpanBlock = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9fa7b7;
`;

export const RowSelfAdaption = styled.div`
  width: 100%;
  display: flex;
  & > div {
    flex: 1;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;


export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
`;