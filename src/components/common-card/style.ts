import styled from 'styled-components';
import { CardBoxParams, CardContentParams } from './type';
import { unitHandle } from '@/utils/index';

export const CardBox = styled.div<CardBoxParams>`
  ${({ width }) => (width ? `width: ${unitHandle(width)};` : '')}
  height: ${({ height }) => unitHandle(height)};
  border: 1px solid #eff2f5;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => unitHandle(margin)};
  user-select: none;
`;

export const CardTitle = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding: 0 16px;
  color: #3c4455;
  text-align: left;
  font-weight: 600;
  box-shadow: inset 0 -1px 0 0 #eff2f5;
`;

export const CardContent = styled.div<CardContentParams>`
  height: ${({ titleText }) => (titleText ? 'calc(100% - 40px)' : '100%')};
  width: 100%;
  padding: ${({ padding }) => unitHandle(padding)};
  position: relative;
`;
