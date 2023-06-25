import React from 'react';
import { Pagination, ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

interface Props {
  total: string | number;
  pageSize: string | number;
  currentPage: string | number;
  pageSizeOptions: number[];
  onChange?: (page:string, pageSize:string) => void;
  onShowSizeChange?: (current:string, size:string) => void;
}

const PaginationContainer: React.FC<Props> = (props: any) => {
  const {
    total,
    pageSize,
    currentPage,
    pageSizeOptions,
    onChange,
    onShowSizeChange,
  } = props;

  return (
    <ConfigProvider locale={zh_CN}>
      <Pagination
        total={total}
        showTotal={total => `共 ${total} 数据`}
        pageSize={pageSize}
        current={currentPage}
        // defaultCurrent={currentPage}
        // defaultPageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        size="small"
        showSizeChanger
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default PaginationContainer;
