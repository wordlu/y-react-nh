import styled from 'styled-components';
import { TypeEnumStr } from './type';
export const typeEnumColor = {
  default: 'rgba(52, 138, 234, 0.08)',
  deep: '#AED0F7',
};
export const Container = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 60, 127, 0.05);
  border-radius: 6px;
`;
export const Content = styled.div<{ type: TypeEnumStr }>`
  width: 100%;
  padding: 16px;
  ${({ type }) => (type === 'deep' ? { background: '#D6E8FB' } : undefined)}
  & > div {
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
export const Header = styled.div<{ type: TypeEnumStr }>`
  width: 100%;
  height: 40px;
  display: flex;
  background: ${({ type }) => typeEnumColor[type]};
  border-radius: 6px 6px 0 0;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;
export const BlueLine = styled.div`
  width: 4px;
  height: 12px;
  background: #348aea;
  border-radius: 2px;
  margin-right: 8px;
`;
export const Title = styled.div`
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3c4455;
  text-align: left;
  font-weight: 600;
`;
export const SubTitle = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(60, 68, 85, 0.6);
  text-align: right;
  font-weight: 400;
`;
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

export const DateTitle = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #3c4455;
  text-align: left;
  font-weight: 400;
  margin-left: 16px;
`;

export const MoreTitle = styled.div`
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(60, 68, 85, 0.8);
  text-align: right;
  font-weight: 400;
  margin-left: 16px;
  cursor: pointer;
`;
