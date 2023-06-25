import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHocComp } from '@/utils';
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import { render } from '@lugia/lugiax-router';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  & .ant-table-body {
    min-height: calc(100vh - 300px);
  }
`;

const PaginationContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const MainTable: React.FC = (props: any) => {
  const {
    groupData,
    tableData,
    loading,
    total,
    pageNo,
    pageSize,
    pageSizeOptions,
    onPageChange,
    selectedRowKeys,
    onSelectChange,
  } = props;
  const [tableHeight, setTableHeight] = useState<number>(0);
  useEffect(() => {
    const tableHeight = document.getElementById('table-container')?.offsetHeight;
    setTableHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
      key: 'jobName',
      ellipsis: true,
      // width: 100,
      align: 'left',
      sorter: (a, b) => a.jobName.localeCompare(b.jobName), // 中文排序
    },
    {
      title: '服务名称',
      dataIndex: 'jobDesc',
      key: 'jobDesc',
      align: 'left',
      // width: 120,
      ellipsis: true,
      sorter: (a, b) => a.jobDesc.localeCompare(b.jobDesc), // 中文排序
    },
    {
      title: '执行计划',
      dataIndex: 'scheduleName',
      key: 'scheduleName',
      align: 'left',
      // width: 100,
      ellipsis: true,
      sorter: (a, b) => a.scheduleName.localeCompare(b.scheduleName), // 中文排序
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      key: 'status',
      align: 'left',
      width: 80,
      render: (text, record) => {
        if (text === '01') {
          return '执行中'
        } else if (text === '02') {
          return '等待调度'
        } else if (text === '03') {
          return '已暂停'
        } else if (text === '04') {
          return '正常调度'
        } else if (text === '05') {
          return '已阻塞'
        }  else if (text === '99') {
          return '已停止'
        } else if (text === '-1') {
          return '异常调度'
        } else {
          return '未定义'
        }
      },
    },
    {
      title: '重叠执行',
      dataIndex: 'concurrent',
      key: 'concurrent',
      align: 'left',
      width: 80,
      render: (text: any, record: any) => (text === '1' ? '是' : '否'),
    },
    {
      title: '所属分组',
      dataIndex: 'jobGroup',
      key: 'jobGroup',
      align: 'left',
      ellipsis: true,
      width: 80,
      render: (text, record) => {
        const data = groupData.filter(it => it.code === text)[0]
        return data?.name
      }
    },
    {
      title: '任务参数',
      dataIndex: 'params',
      key: 'params',
      align: 'left',
      ellipsis: true,
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      align: 'left',
      ellipsis: true,
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      align: 'left',
      ellipsis: true,
      width: 100,
      sorter: (a, b) => a.creator.localeCompare(b.creator), // 中文排序
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      align: 'left',
      width: 150,
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
      align: 'left',
      ellipsis: true,
      width: 100,
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      width: 150,
      ellipsis: true,
      align: 'left',
    },
  ];
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
          bordered
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
              onSelectChange(selectedRowKeys);
            },
            selections: true,
          }}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: '1600px', y: tableHeight }}
          size="small"
          loading={loading}
          rowKey={(record: any) => record.id}
        />
      </div>
      <PaginationContainer>
        <Pagination
          total={total}
          currentPage={pageNo}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onChange={(page, pageSize) => {
            onPageChange({ page, pageSize });
          }}
        />
      </PaginationContainer>
    </Container>
  );
};

export default getHocComp(MainTable, { withLoading: true });
