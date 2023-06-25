import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Tabs } from 'antd';
import { DoubleRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { Loading } from '@lugia/lugia-web';

import FoldModal from '@/components/fold-modal';
import { getHocComp } from '@/utils';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { Container, TabContainer, LoadingContainer, NavTitle, ModelBody } from './style';
import LogTable from '../log-table';
import TreeTable from '../tree-table';
import models from '../../models';

const AuthorizationLogModal: React.FC = ({
  isShowModal,
  currentScene,
  updateIsShowModalInTime,
  currentRow,
  permissions,
  pageSizeOptions,
  asyncExportFile,
}) => {
  const closeModal = async () => {
    updateIsShowModalInTime(false);
  };
  return (
    <FoldModal
      isShow={isShowModal}
      // isShow={true}
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
            onClick={closeModal}
          />
          {currentScene === 'log' && <div>【{currentRow.userName}】操作日志</div>}
          {currentScene === 'auth' && <div>授权【{currentRow.userName}】信息</div>}
        </NavTitle>
        <ModelBody>
          {currentScene === 'log' && <LogTable model={models} />}
          {currentScene === 'auth' && <TreeTable model={models} permissions={permissions} />}
        </ModelBody>
      </Container>
    </FoldModal>
  );
};

export default getHocComp(AuthorizationLogModal);
