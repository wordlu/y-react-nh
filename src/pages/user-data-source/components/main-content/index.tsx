import React, { useEffect, useState } from "react"
import { Container, NavTitle, Content, ContentItem, Footer } from './style'
import { Button, Form, Select, Input, Row, Col, Modal } from 'antd'; 
import { getHocComp } from '@/utils';
import './style.css'
import MainTable from '../main-table'
import models from '../../models'
import { sm4utils } from '@utils/sm4/SM4'

const MainContent: React.FC = ({
  currentRecord,
  datasourceOptions,
  asyncDoExecute,
  asyncDoGetDataSourceById,
  datasourceDetail,
  asyncDoAddDataSource,
  asyncDoDelDataSource,
  asyncOptionsSearch,
  asyncDoUpdateDataSource,
  asyncDoResetTableData
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delModel, setDelModel] = useState(false);
  const [editSource, setEditSource] = useState(false)
  const [opt, setOpt] = useState(0)
  const [modelTitle, setModelTitle] = useState("")
  

  const [form3] = Form.useForm();
  const [form2] = Form.useForm();
  const [form4] = Form.useForm();

	const sKey="86C63180C2806ED1F47B859DE501215B"
  const sm4 = new sm4utils(sKey);
  
  const onFinish = (values: any) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  const { TextArea } = Input;

  // 新增数据源
  const handleOk = async () => {
    let form4Status = false
    await form4
      .validateFields()
      .then(vallues => {
        form4Status = true;
      })
      .catch(err => {
        console.log(err);
      });
    if (form4Status) {
      setConfirmLoading(true);
      let form4Param = form4.getFieldsValue(true)
      if (opt == 0) {
        const data_jsontext = JSON.stringify(form4Param)
        const data_sm4=sm4.encryptData_ECB(data_jsontext);
        const params = {data: data_sm4}
        // console.log(params)
        asyncDoAddDataSource && (await asyncDoAddDataSource(params));
      } else {
        const form2Param = form2.getFieldsValue(true)
        form4Param.id = form2Param.datasource
        const data_jsontext = JSON.stringify(form4Param)
        const data_sm4=sm4.encryptData_ECB(data_jsontext);
        const params = {data: data_sm4}
        // console.log(params)
        asyncDoUpdateDataSource && (await asyncDoUpdateDataSource(params));
      }
      
      // 更新下拉框数据
      form2.resetFields();
      asyncOptionsSearch && (await asyncOptionsSearch());
      setOpen(false);
      setConfirmLoading(false);
    } else {
      message.warning('校验没通过');
    }
   
  };

  const handleCancel = () => {
    setOpt(0)
    setOpen(false);
  };

  // 用户数据源下拉选择
  const queryDatasource = async () => {
    const form2Param = form2.getFieldsValue(true)
    const params = {
      id: form2Param.datasource
    }
    asyncDoGetDataSourceById && (await asyncDoGetDataSourceById(params));
  };

  // 新增数据源
  const addSourceClick = async () => {
    setModelTitle("新增")
    form4.resetFields();
    setEditSource(false)
    showModal()
  }

  // 编辑用户数据源
  const editSourceClick = async () => {
    setModelTitle("设置")
    let form2Status = false
    await form2
      .validateFields()
      .then(vallues => {
        form2Status = true;
      })
      .catch(err => {
        console.log(err);
      });
    if (form2Status) {
      form4.setFieldsValue(datasourceDetail);
      setEditSource(true)
      setOpt(1)
      showModal()
    }
  }
  
  // 删除数据源弹窗
  const delSourceClick = async () => {
    let form2Status = false
    await form2
      .validateFields()
      .then(vallues => {
        form2Status = true;
      })
      .catch(err => {
        console.log(err);
      });
    if (form2Status) {
      setDelModel(true)
    }
  }

  // 确认删除数据源
  const handleDelOk = async () => {
    setConfirmLoading(true);
    const form2Param = form2.getFieldsValue(true)
    const params = {
      id: form2Param.datasource
    }
    asyncDoDelDataSource && (await asyncDoDelDataSource(params));
    // 更新下拉框数据
    form2.resetFields();
    asyncOptionsSearch && (await asyncOptionsSearch());
    setDelModel(false);
    
    setConfirmLoading(false);
  };
  
  // 取消删除数据源
  const handleDelCancel = () => {
    setDelModel(false);
  };

  const showModal = () => {
    setOpen(true)
  };

  //重置
  const on_reset_click = async () => {
    form3.resetFields()
    asyncDoResetTableData && (await asyncDoResetTableData());
  } 

  // 执行
  const on_execute_click = async () => {
    const form3Param = form3.getFieldsValue(true)
    const form2Param = form2.getFieldsValue(true)
    const data = {
      "id": form2Param.datasource,
      "sql": form3Param.sql,
      // "sql": "SELECT * from biz_risk_management_violation_index_details",
      "pageNo": 1,
      "pageSize": 30
    }
    const data_jsontext = JSON.stringify(data)
    const search_data_sm4=sm4.encryptData_ECB(data_jsontext);
    const params = {data: search_data_sm4}
    asyncDoExecute && (await asyncDoExecute(params));

  }

  return (
    <Container>
      <NavTitle>
        <Form
          model={models}
          form={form2}
          name="basic"
          wrapperCol={{ span: 12 }}
          className="opt-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="titles">
            <Form.Item
              label="用户数据源"
              name="datasource"
              rules={[{ required: true, message: '请选择用户数据源' }]}
            >
              <Select 
                className="datasource-sel"
                placeholder="请选择数据源"
                onChange={queryDatasource}
              >
                {datasourceOptions?.map(item => (
                  <Select.Option children={item.name} value={item.code} />
                ))}
              </Select>
            </Form.Item>
            <div className="source-btn-area">
              <Button type="primary" onClick={addSourceClick}>
                新增
              </Button>
              <Button type="primary" onClick={editSourceClick}>
                设置
              </Button>
              <Button type="primary" danger onClick={delSourceClick}>
                删除
              </Button>
            </div>
          </div>
        </Form>
        {/* <Button>导出Excel</Button> */}
      </NavTitle>
      <Content>
        <Form
          model={models}
          className="sql-area"
          form={form3}
        >
          <ContentItem>
            <div className="source-sql-text">
            <Form.Item
              name="sql"
            >
              <TextArea rows={20} placeholder="请输入sql语句" />
            </Form.Item>
            </div>
          </ContentItem>
          <ContentItem>
            <div className="source-tree-area">
              <MainTable model={models}/>
            </div>
          </ContentItem>
        </Form>
      </Content>
      <Footer>
          <Button type="primary" onClick={on_execute_click}>执行</Button>
          <Button onClick={on_reset_click}>重置</Button>
      </Footer>

      <Modal
        title="删除"
        visible={delModel}
        onOk={handleDelOk}
        confirmLoading={confirmLoading}
        onCancel={handleDelCancel}
      >
        <p>您确定要删除数据源吗？</p>
      </Modal>
      
      <Modal
        title={"用户数据源" + modelTitle}
        className="model-form"
        visible={open}
        onOk={handleOk}
        width={400}
        okText="提交"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          model={models}
          name="basic"
          form={form4}
          labelCol={{span: 4}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="连接名"
            width="80"
            labelAlign="right"
            name="name"
            className="titles"
            rules={[{ required: true, message: '请输入连接名' }]}
          >
            <Input placeholder="请输入连接名" disabled={editSource}></Input>
          </Form.Item>
          <Form.Item
            label="IP地址"
            name="ip"
            className="titles"
            rules={[{ required: true, message: '请输入IP地址' }]}
          >
            <Input placeholder="请输入IP地址"></Input>
          </Form.Item>
          <Form.Item
            label="端口号"
            name="port"
            className="titles"
            rules={[{ required: true, message: '请输入端口号' }]}
          >
            <Input placeholder="请输入端口号"></Input>
          </Form.Item>
          <Form.Item
            label="用户名"
            name="useName"
            className="titles"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名"></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            className="titles"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder="请输入密码" type="password"></Input>
          </Form.Item>
          <Form.Item
            label="实例"
            name="instance"
            className="titles"
            rules={[{ required: true, message: '请输入实例' }]}
          >
            <Input placeholder="请输入实例"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  )
}

export default getHocComp(MainContent);