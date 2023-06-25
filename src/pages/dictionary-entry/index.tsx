import React, { useEffect } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import Form from './components/form';
import MainTable from './components/main-table';
import AuthorizationLogModal from './components/authorization-log-modal'
import models from './models'
import OptBtns from './components/options'

import { Container } from '@/constant/style';
import { Content } from './style';

const userDataAuth: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
  }, []);

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Form model={models} />
        <Content>
          <MainTable 
            model={models} 
            rowKey={(record: any) => record.id}
            loadingKey="tableLoading" />
          <AuthorizationLogModal model={models} />
        </Content>
      </Container>
    </ConfigProvider>
  );
};

export default userDataAuth;
