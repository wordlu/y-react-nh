import React, { useEffect } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Permission from '@ysstech-data/data-web/dist/permissions-hoc/class';

import Form from './components/form';
import MainTable from './components/main-table';
import AuthorizationLogModal from './components/authorization-log-modal';
import models from './models';
import ExportExcel from './components/export';

import { Container } from '@/constant/style';
import { Content } from './style';

const p = Permission.getInstance();
const permissions = p.getPermissions();

const userDataAuth: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
  }, []);

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Form model={models} />
        {/* <ExportExcel model={models}></ExportExcel> */}
        <Content>
          <MainTable
            model={models}
            rowKey={(record: any) => record.id}
            permissions={permissions}
            loadingKey="tableLoading"
          />
          <AuthorizationLogModal model={models} permissions={permissions} />
        </Content>
      </Container>
    </ConfigProvider>
  );
};

export default userDataAuth;
