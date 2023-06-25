import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Row, Col, DatePicker, Input, Button, Select } from 'antd';
import moment from 'moment';

import { getHocComp } from '@/utils';

import './index.css';

const Container = styled.div`
  background: #eef1f6;
  padding: 5px;
`;

const FormContainer: React.FC = ({
  asyncMainTableSearch, //刷新主表格
  updateIsShowModalInTime,
  BizdictOptions, //下拉框
  handleChange,
  setDictCode,
}) => {
  const [form] = Form.useForm();

  const onSearch = async value => {
    updateIsShowModalInTime && updateIsShowModalInTime(false);
    setDictCode && ( await setDictCode(value));
    handleChange && (await handleChange({  pageNo: 1, }));
    asyncMainTableSearch && asyncMainTableSearch(value);
  };
  return (
    <Container>
      <Form
        form={form}
        onFinish={onSearch}
        className="dict-form-search"
      >
        <Form.Item
          label="字典项"
          name="dictCode"
        >
          {/* <Input placeholder="请输入用户名" /> */}
          <Select
            className='dic-sel'
            placeholder="请选择"
            allowClear
          >
            {BizdictOptions?.map(item => (
              <Select.Option key={item.dictCode} children={item.dictName} value={item.dictCode} />
            ))}
          </Select>
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          className='search-btn'
        >
          查询
        </Button>
      </Form>
    </Container>
  );
};

export default getHocComp(FormContainer);
