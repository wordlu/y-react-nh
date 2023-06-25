import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, DatePicker, Input, Button, Select } from 'antd';
import moment from 'moment';

import { getHocComp } from '@/utils';

import './index.css';

const Container = styled.div`
  // background: rgb(245, 247, 250);
  background: #eef1f6;
  padding: 5px;
  // border-bottom: 1px solid rgb(245, 247, 250);
`;

const dateFormat = 'YYYY-MM-DD';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const defaultFormData = {
  username: ""
};

const FormContainer: React.FC = ({
  formData,
  searchSelectData,
  asyncHandleSearch,
  updateIsShowModalInTime,
  updateCurrentRowInTime,
  handleChange,
}) => {
  const [form] = Form.useForm();

  const onSearch = async value => {
    updateIsShowModalInTime && updateIsShowModalInTime(false);
    handleChange && (await handleChange({  pageNo: 1, }));
    // updateCurrentRowInTime && updateCurrentRowInTime({});
    asyncHandleSearch && asyncHandleSearch(value);
  };

  return (
    <Container>
      <Form
        {...layout}
        form={form}
        initialValues={defaultFormData}
        onFinish={onSearch}
        className="user-auth-form"
      >
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item
              label="用户名"
              name="userName"
            >
              <Input placeholder="请输入用户名" allowClear/>
            </Form.Item>
          </Col>
          <Col span={3} style={{ textAlign: 'center' }}>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
              >
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default getHocComp(FormContainer);
