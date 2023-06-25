import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Form from './components/form';
import MainTable from './components/main-table';
import models from './models';
import SetTaskModal from './components/set-task-modal';
import { Container } from '@/constant/style';

const taskManagement: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
  }, []);
  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Form model={models} />
        <MainTable model={models} loadingKey="tableLoading" />
        <SetTaskModal model={models} />
      </Container>
    </ConfigProvider>
  );
};

export default taskManagement;
