import React, { useEffect } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { Container } from '@/constant/style';
import { Content } from './style';
import './style.css'
import models from './models'

import MainContent from './components/main-content'

const userDataAuth: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
  }, []);

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Content>
          <MainContent model={models}></MainContent>
        </Content>
      </Container>
    </ConfigProvider>
  );
};

export default userDataAuth;
