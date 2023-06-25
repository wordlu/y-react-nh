import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
    // min-height: calc(100vh - 270px);
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

const manualStatus = {
  title: '是否手工维护主体',
  dataIndex: 'manualStatus',
  key: 'manualStatus',
  width: 120,
  align: 'left',
  render: (text: any, record: any) => (text === '01' ? <span>是</span> : <span>否</span>),
};

const MainTable: React.FC = ({
  currentId,
  currentRow,
  isShowModal,
  tableData,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  bizdictPositionData,
  handleChange,
  asyncHandleSearch,
  asyncHandleCurrentSaerch,
  updateIsShowModalInTime,
  updateCurrentIdInTime,
  updateCurrentRowInTime,
  updateTags,
  formData,
}) => {
  const columnsData = [
    {
      title: '企业名称',
      dataIndex: 'comName',
      key: 'comName',
      width: 150,
      ellipsis: true,
      showSorterTooltip: true,
      sorter: (a, b) => a.comName.localeCompare(b.comName), // 中文排序
      render: (text: any, record: any) => <a onClick={() => handleClickComName(record)}>{text}</a>,
    },
    {
      title: 'Logistic值',
      dataIndex: 'logistic',
      key: 'logistic',
      width: 100,
      align: 'right',
      ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: 'Z-score',
      dataIndex: 'zScore',
      key: 'zScore',
      width: 100,
      align: 'right',
      ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '是否价格预警',
      dataIndex: 'priceStatus',
      key: 'priceStatus',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        const data = bizdictPositionData?.filter(item => item.code === text) || [];
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
        const data = bizdictPositionData?.filter(item => item.code === text) || [];
        return data.length ? data[0].name : '';
      },
    },
    {
      title: '外部评级',
      dataIndex: 'rateLevel',
      key: 'rateLevel',
      width: 100,
      ellipsis: true,
      // showSorterTooltip: false,
      // align: 'right',
      // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
    },
    {
      title: '本日信用压力',
      dataIndex: 'crsScoreName',
      key: 'crsScoreName',
      width: 100,
      ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
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
    {
      title: '是否持仓',
      dataIndex: 'positionStatus',
      key: 'positionStatus',
      width: 100,
      ellipsis: true,
      align: 'left',
      render: (text: any, record: any) => (text === '01' ? <span>是</span> : <span>否</span>),
    },
  ];

  const [columns, setColumns] = useState(JSON.parse(JSON.stringify(columnsData)));

  useEffect(() => {
    setColumns(formData?.earlyWarnPool ? [...columnsData, manualStatus] : [...columnsData]);
  }, [formData?.earlyWarnPool,bizdictPositionData]);

  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handleChange && (await handleChange({ pageNo: page, pageSize }));
    asyncHandleSearch && asyncHandleSearch();
  };

  const handleClickComName = async record => {
    !isShowModal && updateIsShowModalInTime(true);
    if (currentRow.id !== record.id) {
      // if (currentId !== record.id) {
      // await updateCurrentIdInTime(record.id);
      await updateCurrentRowInTime(record);
      await updateTags(record.positionStatus === '01');

      asyncHandleCurrentSaerch(true);
    }
  };

  const onDoubleClick = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    if (currentRow.id !== record.id) {
      // if (currentId !== record.id) {
      // await updateCurrentIdInTime(record.id);
      await updateCurrentRowInTime(record);
      await updateTags(record.positionStatus === '01');

      asyncHandleCurrentSaerch(true);
    }
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const tableHeight = document.getElementById('table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  return (
    <Container>
      <div
        id="table-container"
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
          scroll={{ x: 'max-content', y: height }}
          // scroll={{ x: 'max-content', y: 'calc(100vh - 190px)' }}
          size="small"
          // loading={loading}
          rowKey={(record: any) => record.id}
          // onRow={record => {
          //   return {
          //     onDoubleClick: e => onDoubleClick(e, record),
          //   };
          // }}
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

export default getHocComp(MainTable, { withLoading: true });
