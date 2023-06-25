import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { earlyWarningProgramService } from '@/config/di.config';
import { ConfigProvider, Form, Select, Col, Row, Button, Space, Input } from 'antd';

import DebounceSelect from '@/components/debounce-select';
import MessageConfirm from '@/components/message-confirm';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Search: React.FC = (props: any) => {
  const [email, setEmail] = useState([]);
  const [data, setData] = useState({});  
  const onFormLayoutChange = (item: any, value: any) => {
    setData(value);
    // setData({ ...value, recipient: value.recipient ? value.recipient.join(',') : undefined });
    // props.onSearch({
    //   ...value,
    //   recipient: value.recipient ? value.recipient.join(',') : undefined,
    // });
  };

  const getData = () => {
    props.onSearch(data);
  };

  const deleteData = () => {
    props.setModalConfirme(true)
  }

  const fetSchemaList = async (value: string, type: string) => {
    return new Promise(async function(resolve, reject) {
      if (!value) {
        resolve([]);
      } else {
        try {
          const { code, msg, data } = await earlyWarningProgramService.recipient({ email: value });
          if (code === 200) {
            const emailData = data?.map(item => ({ value: item, label: item }));
            resolve(emailData || []);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleSearch = (e: any) => {
    earlyWarningProgramService.recipient({ email: e }).then(res => {
      const { value } = res;
      if (value.list) {
        setEmail(value.list?.map(item => ({ value: item, label: item })));
      }
    });
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <MessageConfirm 
        title='删除'
        isVisible={props.isVisible}
        handleOK={props.deleteEmail}
        handleCancel={() => props.setModalConfirme(false)}
      />
      <Form
        {...layout}
        name="wrap"
        className="early-warning-email-form"
        onValuesChange={onFormLayoutChange}
        style={{ background: 'rgb(245, 247, 250)', paddingTop: '10px' }}
        autoComplete="off"
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item label="收件人" name="recipient">
              {/* <DebounceSelect
                // ref={debounceSelectRef}
                showSearch
                allowClear
                mode="multiple"
                maxTagCount="responsive"
                placeholder="请查询"
                // fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                // optionLabelProp="value"
                // labelInValue={true}
                fetchOptions={(value: string) => fetSchemaList(value, 'recipient')}
                style={{ width: '100%' }}
              /> */}
              <Input allowClear placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="发送维度" name="sendDimension">
              <Select
                allowClear
                placeholder="请选择"
                // style={{ width: 200 }}
                options={props.dimension.map((item: any) => ({
                  value: item.code,
                  label: item.message,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="状态" name="state">
              <Select
                allowClear
                placeholder="请选择"
                // style={{ width: 200 }}
                options={props.state.map((item: any) => ({
                  value: item.code,
                  label: item.message,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={getData}>
                  查询
                </Button>
                <Button onClick={props.add} type="primary">
                  新增
                </Button>
                <Button onClick={deleteData} type="primary" danger>
                  移除
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  );
};

export default Search;
