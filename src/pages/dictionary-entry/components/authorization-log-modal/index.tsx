import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Tabs } from 'antd';
import { DoubleRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { Loading } from '@lugia/lugia-web';

import FoldModal from '@/components/fold-modal';
import { getHocComp } from '@/utils';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { Container, TabContainer, LoadingContainer, NavTitle, ModelBody } from './style';
import AddBizdictModel from '../add-bizdict-model'
import TreeTable from '../tree-table'
import models from '../../models'


const AuthorizationLogModal: React.FC = ({
  isShowModal,
  currentScene,
  updateIsShowModalInTime,
  currentRow,
  pageSizeOptions,
  asyncExportFile,
}) => {
  return (
    <FoldModal
      isShow={isShowModal}
      style={{
        width: '45%',
        height: '100%',
        background: '#fff',
        zIndex: 10,
        padding: 0,
        top: '5px',
      }}
    >
      <Container>
        <NavTitle>
          <DoubleRightOutlined
            style={{ color: '#ccc', paddingRight: '10px' }}
            onClick={() => {
              updateIsShowModalInTime(false);
            }}
          />
          新增
        </NavTitle>
        <ModelBody>
          <AddBizdictModel model={models}/>
        </ModelBody>
      </Container>
    </FoldModal>
  );
};

export default getHocComp(AuthorizationLogModal);
