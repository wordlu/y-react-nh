import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Form, DatePicker, Select, Input, Button, message, Space, Modal, TextArea } from 'antd';
import m from 'moment';
import { Loading } from '@lugia/lugia-web';
import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import MessageConfirm from '@/components/message-confirm';
import Pagination from '@/components/pagination';
import DebounceSelect from '@/components/debounce-select';
import { Container } from '@/constant/style';
import { TableContainer } from './style';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import FirstTable from '../first-table';
import { financingRepurchaseService } from '@/config/di.config';

import './index.css';
import debounce from 'lodash/debounce';

const FinancingRepurchase: React.FC = ({
  asyncRoleAdd,
  asyncRoleUpdate,
  asyncRoleDelete,
  roleListsAll,
  asyncRoleTableAllSearch,
  updateIsShowModalInTime,
  handleSelect,
  selectRowsArray,
  selectedRowKeys,
}) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [showAddRoleModal, setShowAddRoleModal] = useState<boolean>(false);
  const [addRoleModalTitle, setAddRoleModalTitle] = useState<string>('新增');
  const [showDelRoleModal, setShowDelRoleModal] = useState<boolean>(false);
  // const [selectRowsArray, setSelectRowsArray] = useState([])

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    asyncRoleTableAllSearch && asyncRoleTableAllSearch({
      i: 0
    })
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // setSelectRowsArray(selectedRows)
      handleSelect({ selectedRows, selectedRowKeys });
    },
  };

  const handleAdd = () => {
    setAddRoleModalTitle('新增')
    setShowAddRoleModal(true)
  }

  const handleEdit = () => {
    if (selectRowsArray.length !== 1) {
      message.error('请选择一条数据！')
      return;
    }
    form1.setFieldsValue(selectRowsArray[0]);
    setAddRoleModalTitle('修改')
    setShowAddRoleModal(true)
  }

  const cols = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      ellipsis: true,
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      render: _ => <div>{
        _ ? m(_).format('YYYY-MM-DD h:mm:ss') : null
      }</div>,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      ellipsis: true,
      render: _ => <div>{
        _ ? m(_).format('YYYY-MM-DD h:mm:ss') : null
      }</div>,
    },
  ];

  const handleDel = () => {
    if (selectRowsArray.length < 1) {
      message.error('请选择数据！')
      return;
    }
    setShowDelRoleModal(true)
  }

  const searchRoleName = debounce((e) => {
    const params = {
      i: 0,
    }
    if (form.getFieldValue('roleNameValue')) {
      params.roleName = form.getFieldValue('roleNameValue')
    }
    asyncRoleTableAllSearch && asyncRoleTableAllSearch(params)
  }, 300)

  const closeAddModal = () => {
    form1.resetFields()
    setShowAddRoleModal(false)
  }

  const roleAdd = async (params) =>{
    try {
      const {
        code,
        msg,
        data,
        total,
      } = await financingRepurchaseService.roleAdd(params);
      if (code === 200) {
        message.success("新增成功！");
        setShowAddRoleModal(false);
        form1.resetFields();
        asyncRoleTableAllSearch && (await asyncRoleTableAllSearch({
          i: 0
        }))
      } else {
        message.error(code===803? '角色名称已存在' : msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const roleUpdate = async (params) => {
    try {
      const {
        code,
        msg,
        data,
        total,
      } = await financingRepurchaseService.roleUpdate(params);
      if (code === 200) {
        message.success("修改成功！");
        setShowAddRoleModal(false);
        form1.resetFields();
        asyncRoleTableAllSearch && (await asyncRoleTableAllSearch({
          i: 0
        }))
      } else {
        message.error(code===803? '角色名称已存在' : msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveRole = async () => {
    const form1Param = form1.getFieldsValue(true)

    form1.validateFields()
      .then(async values => {
        let params = null
        if (selectRowsArray.length === 1) {
          params = {
            "roleName": form1Param.roleName,
            "roleDesc": form1Param.roleDesc,
            "id": selectRowsArray[0]["id"]
          }
          // asyncRoleUpdate && (await asyncRoleUpdate(params))
          await roleUpdate(params);
        } else {
          params = {
            "roleName": form1Param.roleName,
            "roleDesc": form1Param.roleDesc,
          }
          // asyncRoleAdd && (await asyncRoleAdd(params))
          await roleAdd(params);
        }
        
        // asyncRoleTableAllSearch && (await asyncRoleTableAllSearch({
        //   i: 0
        // }))
        // setShowAddRoleModal(false)
        // form1.resetFields()
      })
      .catch(errorInfo => {
        
      });
  }

  const closeDelModal = () => {
    setShowDelRoleModal(false)
  }

  const deleteRole = async () => {
    const ids = selectRowsArray.map(it => it.id)
    const params = {
      'list': ids
    }
    asyncRoleDelete && (await asyncRoleDelete(params))
    asyncRoleTableAllSearch && (await asyncRoleTableAllSearch({
      i: 0
    }))
    setShowDelRoleModal(false)
  }

  return (
    <ConfigProvider locale={zh_CN}>
      <MessageConfirm 
        title='删除'
        isVisible={showDelRoleModal}
        handleOK={deleteRole}
        handleCancel={closeDelModal}
      />
      <Modal
        title={addRoleModalTitle}
        visible={showAddRoleModal}
        width={'50%'}
        bodyStyle={{ fontSize: '12px' }}
        onCancel={closeAddModal}
        onOk={saveRole}
        className='add-role-modal'
        maskClosable={false}
        destroyOnClose
      >
        <Form 
          form={form1}
          labelCol={{ span: 3 }}
          size="middle"
          className='add-role-model-form'
          autoComplete="off"
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入' }]}
            getValueFromEvent={(e)=>{
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input maxLength={32} placeholder="请输入"/>
          </Form.Item>
          <Form.Item
            label="角色描述"
            name="roleDesc"
            rules={[{ required: true, message: '请输入' }]}
            getValueFromEvent={(e)=>{
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input.TextArea
              rows={3}
              placeholder="请输入"
              maxLength={18}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Container>
        <Form
          form={form}
          labelCol={{ span: 16}}
          wrapperCol={{ span: 16 }}
          layout={'inline'}
          size="middle"
          className="add-role-form"
        >
          <Form.Item
            label="角色名称"
            name="roleNameValue"
            className='roleName-input'
          >
            <Input placeholder="请输入角色名称" onChange={searchRoleName}/>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="link" onClick={handleAdd} size="small">
                新增
              </Button>
              <Button type="link" onClick={handleEdit} size="small">
                修改
              </Button>
              <Button type="link" onClick={handleDel} size="small" className='del-text'>
                删除
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <TableContainer id="table">
          <TableComponent
            rowSelection={{
              ...rowSelection,
            }}
            scroll={{ y: 'calc(100vh - 310px)' }}
            bordered={true}
            pagination={false}
            dataSource={roleListsAll}
            columns={cols}
            rowKey={(record: any) => record.id}
          />
        </TableContainer>
      </Container>
    </ConfigProvider>
  );
};

export default getHocComp(FinancingRepurchase);
