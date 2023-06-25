import styled from 'styled-components';

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  background: #f0f2f5;
  display: flex;
  margin-top: 5px;
  border-top: 1px solid rgb(245, 247, 250);
  position: relative;
`;

export const LeftContainer = styled.div<{ isFold: boolean }>`
  flex: ${({ isFold }) => (isFold ? 'none' : 1)};
  height: 100%;
  // overflow-y: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  background: #fff;
  position: relative;
  transform: ${({ isFold }) => (isFold ? 'translateX(calc(-100% + 10px))' : undefined)};
  position: ${({ isFold }) => (isFold ? 'absolute' : undefined)};
  transition: 0.5s;
  background: #fff;
  z-index: 1;
  padding-right: 10px;
`;

// width:${({isFold})=>(isFold?'10px':undefined)};

export const ScreenContainer = styled.div`
  // position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-right: 10px;
  overflow-y: auto;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
