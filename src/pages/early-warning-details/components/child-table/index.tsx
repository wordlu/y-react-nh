import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // margin-top:5px;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow: hidden;

  & .odd {
    background: rgb(245, 247, 250);
  }
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const defaultColumns = [
  {
    title: '预警类型',
    dataIndex: 'indexType',
    key: 'indexType',
    // width: 120,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '预警指标',
    dataIndex: 'indexName',
    key: 'indexName',
    // width: 60,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '预警详情',
    dataIndex: 'desc',
    key: 'desc',
    // width: 60,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '触发时间',
    dataIndex: 'bizDate',
    key: 'bizDate',
    // width: 100,
    ellipsis: true,
    align: 'center',
    // showSorterTooltip: false,
    // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
  },
];

const positionColumns = [
  {
    title: '日期',
    dataIndex: 'bizDate',
    key: 'bizDate',
    // width: 120,
    ellipsis: true,
    align: 'center',
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '组合名称',
    dataIndex: 'pfName',
    key: 'pfName',
    // width: 60,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '债券代码',
    dataIndex: 'symbolCode',
    key: 'symbolCode',
    // width: 60,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '债券名称',
    dataIndex: 'symbolName',
    key: 'symbolName',
    // width: 100,
    ellipsis: true,
    // showSorterTooltip: false,
    // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
  },
  {
    title: '持仓成本',
    dataIndex: 'cost',
    key: 'cost',
    // width: 100,
    ellipsis: true,
    align: 'right',
    // showSorterTooltip: false,
    // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
  },
  {
    title: '持仓市值',
    dataIndex: 'netMv',
    key: 'netMv',
    // width: 100,
    ellipsis: true,
    align: 'right',
    // showSorterTooltip: false,
    // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
  },
];

const ChildTable: React.FC = ({
  childTableLoading,
  tableData,
  index,
  pagination,
  handleChildChange,
  asyncHandleCurrentSaerch,
}) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (index === 1 || index === 2) {
      const data = columns.filter((item, index) => index !== 0);
      setColumns(data);
    } else if (index === 3) {
      setColumns(positionColumns);
    }

    // const tableHeight = document.getElementById('child-table-container' + index)?.offsetHeight;
    // setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handleChildChange && (await handleChildChange({ pageNo: page, pageSize }));
    asyncHandleCurrentSaerch && asyncHandleCurrentSaerch(false);
  };

  return (
    <Container>
      <TableContainer id={'child-table-container' + index}>
        <TableComponent
          bordered={true}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
          // scroll={{ y: 400 }}
          size="small"
          loading={childTableLoading}
          rowKey={(record: any) => record.id}
          rowClassName={(record, index) => {
            if (index & 1) {
              return 'odd';
            }
          }}
        />
      </TableContainer>
      <PaginationContainer>
        <Pagination
          total={pagination.total}
          currentPage={pagination.pageNo}
          pageSize={pagination.pageSize}
          pageSizeOptions={pagination.pageSizeOptions}
          onChange={onChange}
        />
      </PaginationContainer>
    </Container>
  );
};

export default ChildTable;
