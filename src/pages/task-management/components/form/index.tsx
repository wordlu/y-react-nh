import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, Button, Select, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getHocComp } from '@/utils';

import './index.css';
import models from '../../models';
import MessageConfirm from '@/components/message-confirm';

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
  background: rgb(245, 247, 250);
  padding: 5px 10px;
  width: 100%;
  margin: 5px 0;
`;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const FormContainer: React.FC = (props: any) => {
  const {
    setVisibleModal,
    asyncOpTable,
    groupData,
    taskNameData,
    jobNamesData,
    selectedRowKeys,
    asyncGetTaskNameData,
    asyncGetJobNamesInfo,
    filterTaskCodeHandler,
    pageNo,
    pageSize,
    setSearchObj,
    asyncGetTableInfoData,
  } = props;
  const [form] = Form.useForm();
  const [copywriting, setCopywriting] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const onSearch = async () => {
    const searchObj = await form.validateFields();
    setSearchObj(searchObj);
    asyncGetTableInfoData();
  };
  useEffect(() => {
    asyncGetTableInfoData();
  }, [pageNo, pageSize]);
  const filterHandler = (value: string) => {
    filterTaskCodeHandler(value);
    asyncGetJobNamesInfo();
  };
  const keys = selectedRowKeys.length;
  const operationHandler = (value: object) => {
    if (!keys) {
      message.warning('请至少选中一条进行操作!');
    } else if (keys === 1) {
      setVisibleModal(value);
    } else {
      message.warning(`${value.modalType}只能选择一条进行操作!`);
    }
  };
  const confirm = params => {
    if (!keys) {
      message.warning('请至少选中一条进行操作!');
      return;
    }
    if (params === '执行' && keys !== 1) {
      message.warning('执行只能选择一条进行操作!');
      return;
    }

    setCopywriting(`您确定要对${keys}个任务进行${params}操作吗？`)
    setIsVisible(true)
    setModalTitle(params)
    // Modal.confirm({
    //   title: `确定要对${keys}个任务进行${params}操作吗？`,
    //   icon: <ExclamationCircleOutlined translate="string" />,
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     asyncOpTable(params);
    //   },
    // });
  };

  const handleOK = () => {
    asyncOpTable(modalTitle);
    setIsVisible(false)
  }

  return (
    <>
      <MessageConfirm 
        title={modalTitle}
        copywriting={copywriting}
        isVisible={isVisible}
        handleOK={handleOK}
        handleCancel={() => setIsVisible(false)}
      />
      <Form {...layout} form={form} className='task-manage'>
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item label="任务名称" name="jobName">
              <Select
                placeholder="请选择任务名称"
                allowClear
                onChange={onSearch}
                // showSearch
                // optionFilterProp="label"
                // filterOption={(value: string) => filterHandler(value)}
              >
                {jobNamesData?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="所属分组" name="jobGroup">
              <Select placeholder="请选择所属分组" allowClear onChange={onSearch}>
                {groupData?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Div>
          <Button size="small" type="link" onClick={() => confirm('执行')}>
            执行
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => operationHandler({ visibleModal: true, modalType: '参数执行' })}
          >
            参数执行
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => setVisibleModal({ visibleModal: true, modalType: '新增' })}
          >
            新增
          </Button>
          <Button
            size="small"
            type="link"
            onClick={() => operationHandler({ visibleModal: true, modalType: '编辑' })}
          >
            编辑
          </Button>
          <Button size="small" type="link" onClick={() => confirm('停止')}>
            停止
          </Button>
          <Button size="small" type="link" onClick={() => confirm('启动')}>
            启动
          </Button>
          <Button size="small" type="link" onClick={() => confirm('删除')}>
            删除
          </Button>
        </Div>
      </Form>
    </>
  );
};

export default getHocComp(FormContainer);
