import React, { useEffect, useState } from 'react';
import {Form, Input, Row, Col, Button, message, Modal, Radio, List, Checkbox, Space } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import {ContainerMain, PaginationContainer} from './style'
import { Container } from '@/constant/style';
import './style.css'
import { DatasetComponent } from 'echarts/components';
import type { CheckboxChangeEvent, CheckboxValueType } from 'antd/es/checkbox';
import { params } from './../../../../../dll/DevDLL';
import { template } from 'lodash';
import debounce from 'lodash/debounce';
import { financingRepurchaseService } from '@/config/di.config';

const MainTable: React.FC = ({
  isShowModal,
  userLists,
  roleLists,
  smartbiObj,
  templateLists,
  currentName,
  updateRoleLists,
  updateTemplateLists,
  updateIsShowModalInTime,
  updateCurrentSceneInTime,
  asyncRoleTableSearch,
  asyncTemplateTableSearch,
  asyncAuthorizeUsers,
  asyncRoleTemplateAssocition,
  asyncQueryEnvariable,
  asyncSaveEnvariable,
  updateRoleListsInTime,
  updateTemplateListsInTime,
}) => {

  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [userArray, setUserArray] = useState([]);
  const [isSetSmartBi, setIsSetSmartBi] = useState(false);
  const [roleArray, setRoleArray] = useState([]); 
  const [templateArray, setTemplateArray] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [currentRole, setCurrentRole] = useState(null); 
  const [isEditSmartbi, setIsEditSmartbi] = useState(0);
  const [searchUserNameValue, setSearchUserNameValue] = useState('')
  const [searchRoleNameValue, setSearchRoleNameValue] = useState('')
  const [isShowDeleteTemplateModal, setIsShowDeleteTemplateModal] = useState(false);
  const [templateInfo, setTemplateInfo] = useState(null);
  const [isShowAddTemplate, setIsShowAddTemplate] = useState(false);

  const showModal = (record) => {
    setOpen(true)
    setUserName(record.username)
  };

  useEffect(() => {
    if (currentName === 'user') {
      let searchData = userLists;
      if (searchUserNameValue && searchUserNameValue.length > 0) {
        searchData = userLists.filter(it => it.userName.includes(searchUserNameValue))
      }
      setUserArray(searchData);
    }
  }, [userLists]);

  useEffect(() => {
    if (currentName === 'role') {
      let searchRoleData = roleLists;
      if (searchRoleNameValue && searchRoleNameValue.length > 0) {
        searchRoleData = roleLists.filter(it => it.rowName.includes(searchRoleNameValue))
      }
      setRoleArray(searchRoleData);
    }
  }, [roleLists]);

  useEffect(() => {
    // if (currentName === 'template') {
      setTemplateArray(templateLists);
    // }
  }, [templateLists]);

  // 搜索用户名：清空角色和模板数据
  useEffect(()=>{
    setRoleArray([]);
    setTemplateArray([]);
    setSearchRoleNameValue('');
    updateRoleListsInTime();
    updateTemplateListsInTime();
  }, [searchUserNameValue])

  // 搜索角色：清空模板数据
  useEffect(()=>{
    setTemplateArray([]);
    updateTemplateListsInTime();
  }, [searchRoleNameValue])

  // 切换菜单进入缓存数据bug处理
  useEffect(()=>{
    setRoleArray([]);
    setTemplateArray([]);
  },[])

  const handleCancel = () => {
    setOpen(false);
  };

  // 报告多选
  const onChangeGroup = (checkedValues: CheckboxValueType[]) => {
    // console.log('checked = ', checkedValues);
  };

  // 角色多选
  const onChangeRole = (e: CheckboxChangeEvent) => {
    const id = e.target.value
    const checked = e.target.checked
    const newArr = [...roleArray]
    newArr.forEach(item => {
      if (item.id === id) {
        item.status = String(Number(checked))
      }
    })
    setRoleArray(newArr)
    // console.log(newArr)
  };

  // 报告多选
  const onChangeTemplate = (e: CheckboxChangeEvent) => {
    const id = e.target.value
    const checked = e.target.checked
    const newArr = [...templateArray]
    newArr.forEach(item => {
      if (item.id === id) {
        item.status = String(Number(checked))
      }
    })
    setTemplateArray(newArr)
    // console.log(newArr)
  };

  // 角色设置
  const handleClickSetRole = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    updateCurrentSceneInTime("auth")
  } 

  // 模板同步
  const templateSyncClick = async () => {
    message.error("暂时未开通此功能")
  }

  // smartBI环境设置
  const setSmartBiClick = async () => {
    form1.setFieldsValue(smartbiObj ? smartbiObj : {})
    setIsSetSmartBi(true)
  }

  const closeSetSmartBi = () => {
    setIsEditSmartbi(0)
    setIsSetSmartBi(false)
  }

  // 查询角色
  const queryRole = async (item) => {
    // console.log(123)
    setCurrentUser(item)
    const params = {
      i: 1,
      userId: item.userId,
    }
    updateRoleLists && updateRoleLists()
    updateTemplateLists && updateTemplateLists() //清空报告
    setCurrentRole({}) // 清空角色背景
    asyncRoleTableSearch && (await asyncRoleTableSearch(params))
  }

  // 查询报告
  const queryTemplate = (item) => {
    setCurrentRole(item)
    const params = {
      sbiRoleId: item.id
    }
    
    updateTemplateLists && updateTemplateLists()
    asyncTemplateTableSearch && asyncTemplateTableSearch(params)
  }

  // 前端搜索用户名
  const searchUserName = (e) => {
    const values = e.target.value.toLowerCase();
    searchUserNameEvent(values)
  }
  const searchUserNameEvent = debounce((values) => {
    setSearchUserNameValue(values)
    const searchData = userLists.filter(it => {
      return it.userName.toLowerCase().includes(values) || it.loginName.toLowerCase().includes(values)
    })
    setUserArray(searchData)
  }, 300)

  // 前端搜索角色名
  const searchRoleName = (e) => {
    const values = e.target.value.toLowerCase();
    searchRoleNameEvent(values)
    setSearchRoleNameValue(values)
  }
  const searchRoleNameEvent = debounce((values) => {
    // setSearchRoleNameValue(values)
    const searchData = roleLists.filter(it => it.rowName.toLowerCase().includes(values))
    setRoleArray(searchData)
  }, 500)

  // 选择角色保存
  const saveUserRole = async () => {
    if (!currentUser || !currentUser.userId) {
      message.warning("请设置报告模板角色！")
      return;
    }
    const selectedRoleArr = roleArray.filter(it => it.status === '1').map(it => it.id)
    const params = {
      "sbiRoleIdList": selectedRoleArr,
      "userId": String(currentUser?.userId)
    }
    asyncAuthorizeUsers && asyncAuthorizeUsers(params)
  }

  // 选择报告保存
  const saveRoleTemplate = async () => {
    if (!currentRole || !currentRole.id) {
      message.warning("请设置报告信息！")
      return;
    }
    const selectedTemplateArr = templateArray.filter(it => it.status === '1').map(it => it.id)
    const params = {
      "templateList": selectedTemplateArr,
      "sbiRoleId": String(currentRole?.id)
    }
    asyncRoleTemplateAssocition && asyncRoleTemplateAssocition(params)
  }

  const editSmartbi = () => {
    setIsEditSmartbi(1)
  }

  const saveSmartbi = async () => {
    const formParams = form1.getFieldsValue(true)
    asyncSaveEnvariable && (await asyncSaveEnvariable(formParams))
    asyncQueryEnvariable && (await asyncQueryEnvariable())
    setIsEditSmartbi(0)
  }

  const deleteTemplate = (item) => {
    setTemplateInfo(item);
    setIsShowDeleteTemplateModal(true);
  }

  const handleOkDeleteTemplate =async () => {
    try {
      const {
        code,
        msg,
        data,
        total,
      } = await financingRepurchaseService.deleteTemplate({tId: templateInfo?.id});
      if (code === 200 && data) {
        message.success("业务办理成功.")
        setIsShowDeleteTemplateModal(false);
        setTemplateInfo(null);
        currentRole?.id && queryTemplate(currentRole);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelDelete = () => {
    setIsShowDeleteTemplateModal(false);
  }

  const addTemplate = () => {
    setIsShowAddTemplate(true);
  }

  const handleCancelAdd = () => {
    setIsShowAddTemplate(false);
  }

  const handleSubmitAddTemplate = async (values) => {
    try{
      const { code, data, msg } = await financingRepurchaseService.createTemplate(values);
      if(code === 200 && data){
        message.success(msg);
        setIsShowAddTemplate(false);
        currentRole?.id && queryTemplate(currentRole);
      }else{
        message.error(code === 803? '报告模板ID已存在' : msg);
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='report-content-area'>
      <Modal
        title={'SmartbI环境设置'}
        visible={isSetSmartBi}
        width={'50%'}
        footer={null}
        bodyStyle={{ fontSize: '12px' }}
        onCancel={closeSetSmartBi}
        className='smart-bi-modal'
      >
        <Form 
          form={form1}
          labelCol={{ span: 3 }}
          // wrapperCol={{ span: 16 }}
          size="middle"
        >
          <div className='btns'>
            {isEditSmartbi === 1 && (
              <Button type="link" onClick={saveSmartbi}>保存</Button>
            )}
            {isEditSmartbi === 0 && (
              <Button type="link" onClick={editSmartbi}>编辑</Button>
            )}
          </div>
          <Form.Item
            label="登录用户"
            name="userName"
          >
            <Input disabled={!isEditSmartbi} />
          </Form.Item>
          <Form.Item
            label="登录密码："
            name="passWord"
          >
            <Input disabled={!isEditSmartbi} />
          </Form.Item>
          <Form.Item
            label="访问地址："
            name="callAddress"
          >
            <Input disabled={!isEditSmartbi} />
          </Form.Item>
          <Form.Item
            label="目录ID"
            name="directoryId"
          >
            <Input disabled={!isEditSmartbi} />
          </Form.Item>
        </Form>
      </Modal>
      <ContainerMain>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          size="middle"
          className="report-content-form"
        >
          <div className="main-div-item">
            <div className='div-item-title'>用户列表</div>
            <div className='main-search-form'>
              <Form.Item
                label="用户名"
                name="userName"
                className='user-name-input'
              >
                <Input placeholder="请查询" onChange={searchUserName}/>
              </Form.Item>
              <Button type="link" onClick={saveUserRole}>保存</Button>
            </div>
            <div className='report-main-content'>
              <List
                bordered
                size="small"
                dataSource={userArray}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      background: item.userId === currentUser?.userId ?  '#e8f0f7' : '#fff',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                    actions={[<Button size='small' type='link' onClick={e => {
                      e.preventDefault();
                      queryRole(item)
                    }} >角色</Button>]}
                  >
                    {item.userName} ({item.loginName})
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="main-div-item">
            <div className='div-item-title'>报告模板角色</div>
            <div className='main-search-form'>
              <Form.Item
                label="角色名称"
                // name="roleName"
                className='user-name-input'
              >
                <Input placeholder="请查询" value={searchRoleNameValue} onChange={searchRoleName}/>
              </Form.Item>
              <Button type="link" onClick={handleClickSetRole} >角色设置</Button>
              <Button type="link" onClick={saveRoleTemplate}>保存</Button>
            </div>
            <div className='report-main-content'>
              <Form.Item
                name="roleListItem"
                className='role-list-item'
              >
                {roleArray?.map(item => (
                  <div 
                    className='role-list-item-checkbox' 
                    style={{
                      background: item.id === currentRole?.id ?  '#e8f0f7' : '#fff',
                    }}
                  >
                    <Checkbox 
                      name="role" 
                      value={item.id} 
                      checked={item.status === '1'}
                      // defaultChecked={item.status}
                      onChange={onChangeRole}
                    >
                      {item.rowName}
                    </Checkbox>
                    <Button size='small' type='link' onClick={e => queryTemplate(item)}>
                      报告
                    </Button>
                  </div>
                ))}
              </Form.Item>
            </div>
          </div>
          <div className="main-div-item">
            <div className='div-item-title title-report-info'>报告信息</div>
            <div className='main-search-form'>
              {/* <Button type="link" onClick={templateSyncClick}>报告模板同步</Button> */}
              <Button type="link" onClick={setSmartBiClick}>SmartbI环境设置</Button>
              <Button size="small" type="link" onClick={addTemplate}>新增</Button>
            </div>
            <div className='report-main-content'>
              <Form.Item
                name="templateListItem"
                className='template-list-item'
              >
                {templateArray?.map(item => (
                  <div className='role-list-item-checkbox'>
                    <Checkbox 
                      name="role" 
                      value={item.id} 
                      // defaultChecked={item.status}
                      checked={item.status === '1'}
                      onChange={onChangeTemplate}
                    >
                      {item.rowName}
                    </Checkbox>
                    <Button size='small' danger type="text" onClick={() => deleteTemplate(item)}>
                      删除
                    </Button>
                  </div>
                ))}
              </Form.Item>
            </div>
          </div>
        </Form>
        {/* 删除模板 */}
        <Modal
          title={'删除'}
          maskClosable={false}
          visible={isShowDeleteTemplateModal}
          onOk={handleOkDeleteTemplate}
          onCancel={handleCancelDelete}
        >
          <div style={{ textAlign: 'center' }}>
            您确定要删除【{templateInfo?.rowName}】模板吗？
          </div>
        </Modal>
        {/* 新增模板 */}
        <Modal
          title={'新增'}
          maskClosable={false}
          visible={isShowAddTemplate}
          footer={null}
          destroyOnClose
          onCancel={handleCancelAdd}
        >
          <Form 
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            autoComplete="off"
            onFinish={handleSubmitAddTemplate}
          >
            <Form.Item 
              label="模板id" 
              name="tId" 
              rules={[{ required: true, message: '请输入' }]}
              getValueFromEvent={(e)=>{
                return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
              }}
            >
              <Input placeholder="请输入" allowClear maxLength={200}/>
            </Form.Item>
            <Form.Item 
              label="模板名称" 
              name="tName" 
              rules={[{ required: true, message: '请输入' }]}
              getValueFromEvent={(e)=>{
                return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
              }}
            >
              <Input placeholder="请输入" allowClear maxLength={32}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button onClick={handleCancelAdd}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </ContainerMain>
    </div>
  );
};

export default getHocComp(MainTable, { withLoading: true });
