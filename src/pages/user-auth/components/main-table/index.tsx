import React, { useEffect, useMemo, useState } from 'react';
import {
  ConfigProvider,
  Form,
  DatePicker,
  Input,
  Row,
  Col,
  Button,
  message,
  Space,
  Modal,
} from 'antd';

import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import { Container, PaginationContainer } from './style';

const btnIdObj = {
  auditBtn: 'pf_auth', // 审核功能按钮
};

const MainTable: React.FC = ({
  isShowModal,
  tableData,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  currentRow,
  permissions,
  auditCount,
  handleChange,
  asyncHandleSearch,
  updateIsShowModalInTime,
  updateCurrentSceneInTime,
  updateCurrentRowInTime,
  asyncAuthAllAudit,
  asyncGetWaitAuditCount,
}) => {
  const [isShowAuditBtn, setIsShowAuditBtn] = useState(false);

  // 控制审核按钮显隐权限
  useEffect(() => {
    const isShowBtn = key => {
      const btnArr = permissions?.visible?.filter(item => item === key) || [];
      return !!btnArr.length;
    };
    setIsShowAuditBtn(isShowBtn(btnIdObj['auditBtn']));
  }, [permissions]);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: 60,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleClickAuth(_, record)}>
            授权
          </a>
          {/* <Button type='text' onClick={() => handleClickLog(_, record)}>日志</Button> */}
          {isShowAuditBtn && (
            <a onClick={() => handleClickCheck(_, record)}>
              审核
            </a>
          )}
        </Space>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      ellipsis: true,
      align: 'left',
      width: 150,
      key: 'userName',
    },
    {
      title: '授权信息',
      ellipsis: true,
      dataIndex: 'authorizeInfo',
      align: 'left',
      key: 'authorizeInfo',
    },
    {
      title: '授权状态',
      ellipsis: true,
      dataIndex: 'auditStatus',
      align: 'left',
      key: 'auditStatus',
      render: (text: any, record: any) => {
        if (text) {
          return text === '1' ? <span>已审核</span> : <span>待审核</span>;
        } else {
          return '';
        }
      },
    },
    {
      title: '上次变更时间',
      ellipsis: true,
      dataIndex: 'updateTime',
      align: 'left',
      key: 'updateTime',
    },
    {
      title: '变更人',
      ellipsis: true,
      dataIndex: 'updateUser',
      align: 'left',
      key: 'updateUser',
    },
  ];

  const handleClickAuth = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    await updateCurrentRowInTime(record);
    updateCurrentSceneInTime('auth');
  };

  const handleClickLog = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    updateCurrentSceneInTime('log');
  };

  const handleClickCheck = async (e, record) => {
    await updateCurrentRowInTime(record);
    const params = {
      userId: record.userId,
    };
    await asyncGetWaitAuditCount(params);
    showModal(record);
  };

  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handleChange && (await handleChange({ pageNo: page, pageSize }));
    asyncHandleSearch && asyncHandleSearch();
  };

  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = record => {
    setOpen(true);
    setUserName(record.userName);
  };

  // 确认审核
  const handleOk = async () => {
    setConfirmLoading(true);
    const params = {
      userId: currentRow.userId,
      audit: 1,
    };
    asyncAuthAllAudit && (await asyncAuthAllAudit(params));
    asyncHandleSearch && (await asyncHandleSearch());
    setOpen(false);
    setConfirmLoading(false);
  };

  // 退回审核
  const handleRefuse = async () => {
    setConfirmLoading(true);
    const params = {
      userId: currentRow.userId,
      audit: 2,
    };
    asyncAuthAllAudit && (await asyncAuthAllAudit(params));
    asyncHandleSearch && (await asyncHandleSearch());
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const tableHeight = document.getElementById('table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  return (
    <Container>
      <Modal
        title={userName + '用户审核提醒'}
        visible={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" disabled={auditCount == 0} type="primary" onClick={handleOk}>
            通过
          </Button>,
          <Button type="primary" disabled={auditCount == 0} onClick={handleRefuse}>
            不通过
          </Button>,
        ]}
      >
        {/* <p>您确定要对 {userName} 进行授权审核操作？</p> */}
        <p>您现在有{auditCount}条需要审核的数据</p>
      </Modal>
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
          // scroll={{ x: 'max-content', y: 'calc(100vh - 316px)' }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 280px)' }}
          size="small"
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

export default getHocComp(MainTable, { withLoading: true });
