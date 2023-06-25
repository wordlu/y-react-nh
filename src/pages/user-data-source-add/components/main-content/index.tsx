import React, { useEffect, useState } from "react"
import { Container, NavTitle, Content, ContentItem, Footer } from './style'
import { Button, Form, Select, Input, Row, Col, Modal, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'; 
import type { UploadProps } from 'antd';
import { getHocComp } from '@/utils';
import './style.css'
import MainTable from '../main-table'
import models from '../../models'
import { sm4utils } from '@utils/sm4/SM4'
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { params } from './../../../../../dll/DevDLL';

const MainContent: React.FC = ({
  currentRecord,
  datasourceOptions,
  asyncDoGetDataSourceById,
  datasourceDetail,
  asyncDoAddDataSource,
  asyncDoDelDataSource,
  asyncOptionsSearch,
  asyncDoUpdateDataSource,
  asyncDoUpdateData,
  asyncDoResetTableData

}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delModel, setDelModel] = useState(false);
  const [editSource, setEditSource] = useState(false)
  const [opt, setOpt] = useState(0)

  const [form3] = Form.useForm();
  const [form2] = Form.useForm();
  const [form4] = Form.useForm();

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

	const sKey="86C63180C2806ED1F47B859DE501215B"
  // const search_sql = "select * from table1"
  const sm4 = new sm4utils(sKey);
  // const search_sql_sm4=sm4.encryptData_ECB(search_sql);
	// const search_sql1=sm4.decryptData_ECB(search_sql_sm4);
  // console.log(search_sql_sm4, search_sql1)
  
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
    showModal()
  }

  // 编辑用户数据源
  const editSourceClick = async () => {
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
  const on_execute_click = async (data) => {
    const form3Param = form3.getFieldsValue(true)
    const sql = form3Param.sql
    let params = null
    if (sql && sql !== "") {
      // const sql = "update biz_risk_management_violation_index_details set pf_name = '2' where id = 1;"
      const search_data_sm4=sm4.encryptData_ECB(sql);
      params = {data: search_data_sm4}
    } else {
      if (fileList && fileList.length > 0) {
        params = {file: fileList[0].originFileObj}
      } else {
        message.error("请输入sql或上传文件!")
        return false
      }
    }
    const obj = objTransformFormDada(params);
    asyncDoUpdateData && (await asyncDoUpdateData(obj));

    if (fileList) {
      setFileList([])
    }
  }

  const [fileList, setFileList] = useState([])
  const handleChange = (info) => {
    setFileList(info.fileList)
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
            <Upload 
              className="uploaded"
              multiple={false}
              accept=".txt, .sql"
              maxCount={1}
              fileList={fileList}
              beforeUpload={() => {
                 return false;
              }}
              onChange={(info) => { handleChange(info) }}
            >
              <Button type="primary" icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
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
        title="用户数据源新增"
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