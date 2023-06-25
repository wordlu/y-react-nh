import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import Program from './components/program';
import BtnAbsolute from './components/btn-absolute';

import models from './models';
import './style.css'
import { searchObj } from '@/utils/helper';

import { Container } from '@/constant/style';

const EarlyWarningScheme: React.FC = () => {
  const [queryObj, setQueryObj] = useState({});

  useEffect(() => {
    const obj = searchObj(window.location.search);
    setQueryObj(obj);
    models.mutations.asyncInit(obj);
  }, []);
 
  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <Program model={models} queryObj={queryObj} />
        {!queryObj?.earlyWarnCaseId && <BtnAbsolute model={models} />}
      </Container>
    </ConfigProvider>
  );
};

export default EarlyWarningScheme;
