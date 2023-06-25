import React, { useEffect, useState } from 'react';
import { ConfigProvider, Form, DatePicker, Input, Row, Col, Button, message, Space, Modal } from 'antd';
import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import {Container, PaginationContainer} from './style'


const MainTable: React.FC = ({
  isShowModal,
  tableData,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  columnsData,
  handleChange,
  updateIsShowModalInTime,
  updateCurrentSceneInTime
}) => {
  const columns = columnsData

  const handleClickAuth = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    updateCurrentSceneInTime("auth")
  }

  const handleClickLog = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    updateCurrentSceneInTime("log")
  }

  const handleClickCheck = (e, record) => {
    showModal(record)
  }

  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handleChange && (await handleChange({ pageNo: page, pageSize }));
  };

  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (record) => {
    setOpen(true)
    setUserName(record.username)
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
        title={userName+"用户审核提醒"}
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>您确定要对 {userName} 进行授权审核操作？</p>
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
          scroll={{ x: 'max-content', y: 'calc(100vh - 320px)' }}
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
