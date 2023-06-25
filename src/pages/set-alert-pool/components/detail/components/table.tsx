import React, { useEffect, useState } from 'react';
import {
  HeartOutlined,
  StarOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';

import { getHocComp } from '@/utils';
import TableComponent from '@/components/table';

const Table: React.FC = (props: any) => {
  const {
    tableData,
    selectedRowKeys,
    asyncGetTableInit,
    asyncDoFocusFn,
    handleChangeSelect,
  } = props;

  const [height, setHeight] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'subjectName',
      key: 'subjectName',
      // width: 150,
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
    },
    {
      title: '评级机构',
      dataIndex: 'gradeOrgan',
      key: 'gradeOrgan',
      // width: 150,
      showSorterTooltip: false,
      ellipsis: true,
      // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
      ellipsis: true,
      width: 80,
    },
    {
      title: '一级行业',
      dataIndex: 'primaryIndustry',
      key: 'primaryIndustry',
      // width: 120,
      ellipsis: true,
    },
    {
      title: '二级行业',
      dataIndex: 'secondaryIndustry',
      key: 'secondaryIndustry',
      // width: 120,
      ellipsis: true,
    },
    // {
    //   title: '关注',
    //   dataIndex: 'focus',
    //   key: 'focus',
    //   width: 60,
    //   align: 'center',
    //   render: (text: any, record: any) =>
    //     text==='0' ? (
    //       <PlusSquareOutlined onClick={()=>doFocus(record)} style={{ color: '#eb2f96', fontSize: '16px',cursor:'default' }} />
    //     ) : (
    //       <MinusSquareOutlined onClick={()=>doFocus(record)} style={{ fontSize: '16px',cursor:'default' }} />
    //     ),
    // },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      handleChangeSelect({ selectedRows, selectedRowKeys });
    },
  };

  const doFocus = (record: any) => {
    asyncDoFocusFn && asyncDoFocusFn();
  };

  useEffect(() => {
    const tableHeight = document.getElementById('table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
    // console.log(99999,tableHeight ? tableHeight - 40 : 400)

    // console.log(88888, document.getElementById('table-container')?.offsetHeight);
  }, []);

  return (
    <div
      id="table-container"
      style={{
        // marginTop: '5px',
        display: 'flex',
        width: '100%',
        flex: 1,
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <TableComponent
        bordered={true}
        columns={columns}
        dataSource={tableData}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={false}
        // scroll={{ x: "max-content", y: "calc(100vh - 190px)"}}
        scroll={{ x: 'max-content', y: height }}
        size="small"
        // loading={loading}
        rowKey={(record: any) => record.subjectId}
      />
    </div>
  );
};

export default getHocComp(Table, { withLoading: true });
