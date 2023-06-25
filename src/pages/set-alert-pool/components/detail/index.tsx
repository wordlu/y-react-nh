import React, { useEffect } from 'react';

import Search from '../search';
import Table from './components/table';
import Title from './components/title';
import  PaginationContainer from '../right-container/components/pagination';

import { searchObj } from '@/utils/helper';
import models from '../../models/alert-pool-detail';
import { Container } from '@/constant/style';
import { TableContainer } from './style';

const Detail: React.FC = () => {
  useEffect(() => {
    const queryObj = searchObj(window.location.search);
    // 查询
    models.mutations.asyncInit(queryObj);
  }, []);

  return (
    <Container>
      <Search model={models} isShowBack={true}/>
      <TableContainer>
        <Title model={models}/>
        <Table model={models} loadingKey="tableContext"/>
      </TableContainer>
      <PaginationContainer model={models} />
    </Container>
  );
};

export default Detail;
