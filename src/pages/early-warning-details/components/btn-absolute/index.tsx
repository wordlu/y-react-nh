import React from 'react';
import styled from 'styled-components';

import { DoubleLeftOutlined } from '@ant-design/icons';

import { getHocComp } from '@/utils';

const Container = styled.div`
  // width: 20px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  background: #fff;

  & > div {
    font-size: 12px;
    line-height: 1.2;
    color: rgb(96, 98, 102);
    transform: scale(0.8);
  }
`;

const BtnAbsolute: React.FC = ({currentRow, isShowModal, updateIsShowModalInTime }) => (
  <>
    {currentRow.id &&!isShowModal && (
      <Container
        onClick={e => {
          e.stopPropagation();

          updateIsShowModalInTime(true);
        }}
      >
        <div>
          <DoubleLeftOutlined style={{ fontSize: '12px', color: 'rgb(96, 98, 102)' }} />
        </div>
        <div>
          <div>预</div>
          <div>警</div>
          <div>主</div>
          <div>体</div>
        </div>
      </Container>
    )}
  </>
);

export default getHocComp(BtnAbsolute);