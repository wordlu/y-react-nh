import React, { useEffect, useState } from 'react';
import { Divider, Form, Input, DatePicker, Row, Col, Button, Modal } from 'antd';
import {
  DoubleRightOutlined,
  SearchOutlined,
  FileSearchOutlined,
  DeleteOutlined,
  FormOutlined
} from '@ant-design/icons';
import moment from 'moment';

import FoldModal from '@/components/fold-modal';
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import { go } from '@utils/cusRouter';

import {
  Container,
  HeaderConteiner,
  Title,
  FormContainer,
  TableContainer,
  PaginationContainer,
} from './style';

interface Props {
  isShow: boolean;
  tableData: any[];
  tableLoading: boolean;
  pagination: any;
  formData: any;
  handleChangeShowProgramModal: (isShow: boolean) => void;
  handlePaginationChange: (params: any) => void;
  updateForm: (params: any) => void;
  deleteProgram: (id: string) => void;
}

const dateFormat = 'YYYY-MM-DD';

const ProgramModal: React.FC<Props> = ({
  isShow,
  tableData,
  tableLoading,
  pagination,
  formData,
  handlePaginationChange,
  handleChangeShowProgramModal,
  updateForm,
  deleteProgram,
}) => {
  const [form] = Form.useForm();
  const [height, setHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
    const tableHeight = document.getElementById('table')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 360);
  }, [isShow]);

  const handleClickSearch = (id, type) => {
    // console.log(1111, id);
    handleChangeShowProgramModal(false);
    go({ url: `/abcAnalysis/publicSentiment/early-warning-program?earlyWarnCaseId=${id}&type=${type}` });
  };

  const handleClickDelete = record => {
    setVisible(true);
    setDeleteData(record);
  };

  const handleOkDelete = () => {
    deleteProgram(deleteData?.earlyWarnCaseId);
    setDeleteData(null);
    setVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
    setVisible(false);
  };

  const columns = [
    {
      title: '方案名称',
      dataIndex: 'earlyWarnCaseName',
      key: 'earlyWarnCaseName',
      // width: 120,
      ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '创建日期',
      dataIndex: 'earlyWarnCaseTime',
      key: 'earlyWarnCaseTime',
      // width: 120,
      // ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div>
          <span>
            <FileSearchOutlined
              style={{ cursor: 'pointer', color: '#1890ff', fontSize: '12px' }}
              onClick={() => handleClickSearch(record.earlyWarnCaseId, 'view')}
            />
          </span>
          <span>
            <FormOutlined  
              style={{ cursor: 'pointer', color: '#1890ff', fontSize: '12px', marginLeft: '6px' }}
              onClick={() => handleClickSearch(record.earlyWarnCaseId, 'edit')}
            />
          </span>
          <DeleteOutlined
            style={{ cursor: 'default', fontSize: '12px', marginLeft: '3px', color: 'red' }}
            onClick={() => handleClickDelete(record)}
          />
        </div>
      ),
    },
  ];

  const onFinish = values => {
    updateForm && updateForm(values);
  };

  const onChange = async (page: string, pageSize: string) => {
    handlePaginationChange && (await handlePaginationChange({ pageNo: page, pageSize }));
  };

  return (
    <FoldModal
      isShow={isShow}
      style={{ background: '#fff', width: '500px', zIndex: 10, overflow: 'hidden' }}
    >
      <Container>
        <HeaderConteiner>
          <Title>预警方案</Title>
          <DoubleRightOutlined
            style={{ cursor: 'pointer', color: '#989da3' }}
            onClick={() => handleChangeShowProgramModal(!isShow)}
          />
        </HeaderConteiner>
        <Divider style={{ margin: '2px 0 5px' }} />
        <FormContainer>
          <Form
            form={form}
            initialValues={formData}
            layout="inline"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row style={{ width: '100%' }}>
              <Col span={10}>
                <Form.Item name="names">
                  <Input placeholder="方案名称" size="small" allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="date"
                >
                  <DatePicker.RangePicker
                    size="small"
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item>
                  <SearchOutlined
                    style={{ cursor: 'default', color: '#1890ff' }}
                    onClick={() => form.submit()}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FormContainer>
        <TableContainer id="table">
          <TableComponent
            bordered={true}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
            scroll={{ y: height }}
            size="small"
            loading={tableLoading}
            rowKey={(record: any) => record.earlyWarnCaseId}
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
        {/* 删除 */}
        <Modal
          title={'删除'}
          maskClosable={false}
          visible={visible}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          <div style={{ textAlign: 'center' }}>
            您确定要删除【{deleteData?.earlyWarnCaseName}】方案吗？
          </div>
        </Modal>
      </Container>
    </FoldModal>
  );
};

export default ProgramModal;
