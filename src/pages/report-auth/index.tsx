import React, { useEffect } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import MainConent from './components/main-content';
import AuthorizationLogModal from './components/authorization-log-modal'
import models from './models'
import OptBtns from './components/options'

import { Container } from '@/constant/style';
import { Content } from './style';

const userDataAuth: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
    models.mutations?.updateIsShowModalInTime && models.mutations?.updateIsShowModalInTime(false);
  }, []);

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Content>
          <MainConent model={models} />
          <AuthorizationLogModal model={models} />
        </Content>
      </Container>
    </ConfigProvider>
  );
};

export default userDataAuth;
