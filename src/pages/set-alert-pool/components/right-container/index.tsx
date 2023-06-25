import React, { useEffect } from 'react';
import styled from 'styled-components';

import models from '../../models/set-alert-pool';
import BtnCombination from './components/btn-combination';
import Table from './components/table';
import PaginationContainer from './components/pagination';

const Div = styled.div`
  // margin-left: 5px;
  flex: 3;
  height: 100%;
  overflow: hidden;
  background: #fff;
  height: 30px;
  height: 100%;
  overflow: hidden;
  padding: 5px 0 0 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .ant-table-placeholder {
    height: calc(100vh - 250px);
  }
`;

const TableContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

interface Props {
  isSetPool: boolean;
  handleSetPool: (isSetPool: boolean) => void;
}

const RightContainer: React.FC<Props> = ({ isSetPool, handleSetPool }) => {
  return (
    <Div>
      <BtnCombination model={models} isSetPool={isSetPool} handleSetPool={handleSetPool} />

      <TableContainer>
        {/* <Table model={models} propKey="tableContext" loadingKey="tableContext" /> */}
        <Table model={models} propKey="tableContext"/>
      </TableContainer>
      

      <PaginationContainer model={models} propKey="tableContext" />
    </Div>
  );
};

export default RightContainer;
