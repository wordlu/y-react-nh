import React from 'react';
import styled from 'styled-components';

import Pagination from '@/components/pagination';
import { getHocComp } from '@/utils';

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 10px;
`;

interface Props {
  total: string | number;
  pageSize: string | number;
  currentPage: string | number;
  pageSizeOptions: number[];
  handleChange?: (params: any) => void;
  handleOnShowSizeChange?: (params: any) => void;
  asyncGetTableInit?: () => void;
  updateTableDataInTime?: () => void;
}

const PaginationContainer: React.FC<Props> = ({
  total,
  pageSize,
  currentPage,
  pageSizeOptions,
  handleChange,
  handleOnShowSizeChange,
  asyncGetTableInit,
  updateTableDataInTime,
}) => {
  const onChange = async (page: string, pageSize: string) => {
    handleChange && (await handleChange({ page, pageSize }));
    updateTableDataInTime && (await updateTableDataInTime());
    asyncGetTableInit && asyncGetTableInit();
  };

  return (
    <Div>
      <Pagination
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onChange={onChange}
      />
    </Div>
  );
};

export default getHocComp(PaginationContainer);
