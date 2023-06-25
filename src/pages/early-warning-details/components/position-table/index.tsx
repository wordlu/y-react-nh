import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getHocComp } from '@/utils';
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  & .ant-table-body {
    // min-height: calc(100vh - 300px);
  }

  & .ant-table-placeholder {
    height: calc(100vh - 300px);
  }
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const PositionTable: React.FC = ({
  tableData,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  bizdictData,
  handlePositionChange,
  asyncGetPositionTableInit,
}) => {
  const columns = [
    {
      title: '组合名称',
      dataIndex: 'pfName',
      key: 'pfName',
      width: 150,
      ellipsis: true,
      showSorterTooltip: true,
      // sorter: (a, b) => a.comName.localeCompare(b.comName), // 中文排序
    },
    {
      title: '债券代码',
      dataIndex: 'symbolCode',
      key: 'symbolCode',
      width: 100,
      ellipsis: true,
      // showSorterTooltip: false,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '债券名称',
      dataIndex: 'symbolName',
      key: 'symbolName',
      width: 150,
      ellipsis: true,
      // showSorterTooltip: false,
    },
    {
      title: '持仓成本',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      ellipsis: true,
      // showSorterTooltip: false,
      align: 'right',
      // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
    },
    {
      title: '持仓市值',
      dataIndex: 'netMv',
      key: 'netMv',
      width: 100,
      ellipsis: true,
      // showSorterTooltip: false,
      align: 'right',
      // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
    },
    {
      title: '企业名称',
      dataIndex: 'comName',
      key: 'comName',
      width: 170,
      ellipsis: true,
    },
    {
      title: 'Logistic值',
      dataIndex: 'logistic',
      key: 'logistic',
      width: 120,
      ellipsis: true,
      align: 'right',
    },
    {
      title: 'Z-score',
      dataIndex: 'zScore',
      key: 'zScore',
      width: 100,
      ellipsis: true,
      align: 'right',
    },
    {
      title: '是否价格预警',
      dataIndex: 'priceStatus',
      key: 'priceStatus',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        const data = bizdictData?.filter(item => item.code === text) || [];
        return data.length ? data[0].name : '';
      },
    },
    {
      title: '是否舆情预警',
      dataIndex: 'opinionsStatus',
      key: 'opinionsStatus',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        const data = bizdictData?.filter(item => item.code === text) || [];
        return data.length ? data[0].name : '';
      },
    },
    {
      title: '外部评级',
      dataIndex: 'rateLevel',
      key: 'rateLevel',
      width: 120,
      ellipsis: true,
      // align: 'right',
    },
    {
      title: '本日信用压力',
      dataIndex: 'crsScoreName',
      key: 'crsScoreName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '五日内信用压力',
      dataIndex: 'crsScore5DName',
      key: 'crsScore5DName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '三十日内信用压力',
      dataIndex: 'crsScore30DName',
      key: 'crsScore30DName',
      width: 120,
      ellipsis: true,
    },
  ];

  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handlePositionChange && (await handlePositionChange({ pageNo: page, pageSize }));
    asyncGetPositionTableInit && asyncGetPositionTableInit();
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const tableHeight = document.getElementById('position-table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  return (
    <Container>
      <div
        id="position-table-container"
        style={{
          width: '100%',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <TableComponent
          bordered={true}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: '1700px', y: height }}
          size="small"
          // loading={loading}
          rowKey={(record: any) => record.id}
        />
      </div>
      <PaginationContainer>
        <Pagination
          total={total}
          currentPage={pageNo}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onChange={onChange}
        />
      </PaginationContainer>
    </Container>
  );
};

export default getHocComp(PositionTable, { withLoading: true });
