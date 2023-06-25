import React, { useEffect, useState } from 'react';
import {
  HeartOutlined,
  StarOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  HeartFilled,
} from '@ant-design/icons';
import styled from 'styled-components';

import { getHocComp } from '@/utils';
import TableComponent from '@/components/table';
import { Loading } from '@lugia/lugia-web';

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;

  & .ant-table-body {
    min-height: calc(100% - 250px);
  }

  & .ant-table-placeholder {
    // height: calc(100% - 190px);
  }
`;

const Table: React.FC = (props: any) => {
  const {
    tableData,
    selectedRowKeys,
    asyncGetTableInit,
    asyncDoFocusFn,
    handleSelect,
    tableLoading,
    initTable,
  } = props;

  const [height, setHeight] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'subjectName',
      key: 'subjectName',
      // width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      sorter: (a, b) => a.subjectName.localeCompare(b.subjectName), // 中文排序
    },
    {
      title: '外部评级',
      dataIndex: 'externalGrade',
      key: 'externalGrade',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
      // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
      // sorter: (a, b) => a.externalGrade?.localeCompare(b.externalGrade), // 中文排序
    },
    {
      title: '评级机构',
      dataIndex: 'gradeOrgan',
      key: 'gradeOrgan',
      // width: 100,
      ellipsis: true,
      showSorterTooltip: false,
      // sorter: (a, b) => a.gradeOrgan?.localeCompare(b.gradeOrgan),
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
      windth: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '一级行业',
      dataIndex: 'primaryIndustry',
      key: 'primaryIndustry',
      width: 180,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '二级行业',
      dataIndex: 'secondaryIndustry',
      key: 'secondaryIndustry',
      width: 180,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '关注',
      dataIndex: 'focus',
      key: 'focus',
      width: 60,
      align: 'center',
      render: (text: any, record: any) =>
        text === '0' ? (
          // <PlusSquareOutlined
          //   onClick={() => doFocus(record)}
          //   style={{ color: '#eb2f96', fontSize: '16px', cursor: 'default' }}
          // />
          <HeartFilled
            onClick={() => doFocus(record)}
            style={{ color: 'red', opacity: '0.7', fontSize: '16px', cursor: 'default' }}
          />
        ) : (
          // <MinusSquareOutlined
          //   onClick={() => doFocus(record)}
          //   style={{ fontSize: '16px', cursor: 'default' }}
          // />
          <HeartOutlined
            onClick={() => doFocus(record)}
            style={{ fontSize: '16px', cursor: 'default' }}
          />
        ),
    },
  ];

  const doFocus = (record: any) => {
    asyncDoFocusFn &&
      asyncDoFocusFn({ subjectIds: [record.subjectId], flag: Number(record.focus) ? '0' : '1' });
  };

  useEffect(() => {
    (async () => {
      await initTable();
      asyncGetTableInit();
    })();

    const heights = document.getElementById('table-container')?.offsetHeight;
    setHeight(heights ? heights - 50 + 'px' : null);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      handleSelect({ selectedRows, selectedRowKeys });
    },
  };

  return (
    <Container id="table-container">
      <Loading loading={tableLoading} isInherit={true}>
        <TableComponent
          bordered={true}
          columns={columns}
          dataSource={tableData}
          rowSelection={{
            ...rowSelection,
          }}
          pagination={false}
          // scroll={{ x: 'max-content', y: height }}
          scroll={{ x: '100%', y: height }}
          size="small"
          // loading={loading}
          rowKey={(record: any) => record.subjectId}
        />
      </Loading>
    </Container>
  );
};

// export default getHocComp(Table, { withLoading: true });
export default getHocComp(Table);
