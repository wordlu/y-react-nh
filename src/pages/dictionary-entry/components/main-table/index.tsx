import React, { useEffect, useState } from 'react';
import { ConfigProvider, Form, DatePicker, Input, Row, Col, Button, message, Space, Modal, Select, Upload } from 'antd';
import { getHocComp } from '@/utils'; //所有传递了models值的组件
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import {ContainerMain, PaginationContainer} from './style'
import { bizdictService } from '@/config/di.config';
import { Container } from '@/constant/style';
import { objTransformFormDada } from '@/utils/helper';
import './style.css'
import { DatasetComponent } from 'echarts/components';
import m from 'moment';


const MainTable: React.FC = ({
  isShowModal,
  tableData,
  tableLoading,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  subTableList, //请求的单个子表格数据
  subTotal,
  subDictCode,
  handleChange,
  updateIsShowModalInTime,
  updateCurrentSceneInTime,
  asyncSubTableSearch,
  asyncBizdictEdit,
  asyncMainTableSearch,
  asyncOptionsSearch,
  asyncBizdictDel,
  asyncBizdictImport,
  asyncBizdictDictTemplate,
  asyncBizdictItemDel,
  asyncBizdictItemAdd,
  asyncBizdictExport,
  handleSelect,
  selectRowsArray,
  selectedRowKeys
}) => {
  const [form] = Form.useForm();
  const [tData, setTData] = useState([]);
  const [subTabledata, setSubTabledata] = useState([]); //表格展示数据
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: Item, type) => {
    return type + record.id === editingKey
  } 
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [delText, setDelText] = useState("")
  const [delRecord, setDelRecord] = useState([])
  const [userName, setUserName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  // const [selectRowsArray, setSelectRowsArray] = useState([])
  const [newSubItem, setNewSubItem] = useState(null) //为了更新
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false); //批量上传
  
  const [options, setOptions] = useState([
    {
        "code": 1,
        "name": "开启"
    },
    {
        "code": 2,
        "name": "停用"
    }
  ])

  //子表格
  const expandedRowRender = (record) => {
    const subColumns: TableColumnsType<ExpandedDataType> = [
      { 
        title: '子项编号', 
        dataIndex: 'dictItemCode',
        onCell: (record: Item) => ({
          record,
          inputType: 'text',
          dataIndex: 'dictItemCode',
          title: '子项编号',
          requierd: 1,
          editing: isEditing(record, "item"),
        }), 
        key: 'dictItemCode'
      },
      {
        title: '子项值',
        key: 'dictItemName',
        dataIndex: 'dictItemName',
        onCell: (record: Item) => ({
          record,
          inputType: 'text',
          dataIndex: 'dictItemName',
          title: '子项值',
          requierd: 1,
          editing: isEditing(record, "item"),
        }),
      },
      { 
        title: '状态', 
        dataIndex: 'state', 
        align: 'left',
        onCell: (record: Item) => ({
          record,
          inputType: 'number',
          dataIndex: 'state',
          title: '状态',
          requierd: 1,
          editing: isEditing(record, "item"),
        }), 
        key: 'state' ,
        render: (_, record) => (
          record.state === 1 ? "开启" : "停用"
        ),
      },
      { 
        title: '备注', 
        dataIndex: 'remark',
        width: 300,
        render: (text, record) => (
          <div title={text} style={{width: 300, overflow: 'hidden', textOverflow: 'ellipsis'}}>{text}</div>
        ),
        onCell: (record: Item) => ({
          record,
          inputType: 'text',
          dataIndex: 'remark',
          title: '备注',
          editing: isEditing(record, "item"),
        }), 
        key: 'remark' 
      },
      { title: '创建人', dataIndex: 'createId', key: 'createId' },
      { 
        title: '创建时间', 
        dataIndex: 'createTime', 
        key: 'createTime',
        render: _ => <div>{
          _ ? m(_).format('YYYY-MM-DD h:mm:ss') : null
        }</div>,
      },
      { title: '最后修改人', dataIndex: 'updateId', key: 'updateId', width: 100 },
      { 
        title: '最后修改时间', 
        width: 100,
        dataIndex: 'updateTime', 
        key: 'updateTime',
        render: _ => <div>{
          _ ? m(_).format('YYYY-MM-DD h:mm:ss') : null
        }</div>,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record) => (
          <Space size="middle">
            <Button size="small" type='link' onClick={() => handleClickSubEdit(_, record)}>编辑</Button>
            <Button size="small" type='link' onClick={() => handleClickSubSave(_, record)}>保存</Button>
            <Button size="small" type='link' onClick={() => handleClickSubDel(_, record)} style={{color: 'rgb(255, 77, 79)'}}>删除</Button>
          </Space>
        ),
      },
    ];

    const list = subTabledata.filter(it => it.id === record.dictCode)[0]
    let childList = []
    if (list) {
      childList = list.data
    }

    // 子表格
    return  <TableComponent
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      rowKey={(record: any) => record.id}
      bordered 
      columns={subColumns} 
      // dataSource={subTabledata[record.dictCode]}
      dataSource={childList} 
      pagination={false} 
    />;
  };

  // 编辑子项
  const handleClickSubEdit = async (e, record) => {
    form.setFieldsValue({ ...record });
    setEditingKey("item" + record.id);
  }

  // 保存子项
  const handleClickSubSave = async (e, record) => {
    if (editingKey !== "item" + record.id) {
      message.warning("请编辑数据！")
      return;
    }
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...subTabledata];
      const item = newData.filter(it => record.dictCode === it.id)[0]
      if (item) {
        const subItem = item["data"].filter(it => it.id === record.id)[0]
        const data = {
          ...subItem,
          ...row,
        }
        if (data?.remark?.length > 25) {
          message.warning("备注字段输入超过长度限制!")
          return;
        }
        const params ={
          // "id": data.id,
          "dictCode": data.dictCode,
          "dictItemCode": data.dictItemCode,
          "dictItemName": data.dictItemName,
          "remark": data.remark,
          "state": data.state
        }
        if (data.id.indexOf("newItem") < 0) {
          params.id = data.id
        }
        const subParams = {
          dictCode: record.dictCode
        }
        asyncBizdictItemAdd && (await asyncBizdictItemAdd(params))
        asyncSubTableSearch && (await asyncSubTableSearch(subParams))
        
        setEditingKey("") // 取消编辑状态
        setExpandedRowKeys([]) //收起展开行
        setSubTabledata([]) // 清空子表格数据
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  } 

  // 删除子项
  const handleClickSubDel = async (e, record) => {
    if (record.dictItemCode) {
      setDelText(`您确认要删除当前【${record.dictItemName}】吗?`)
      setDelRecord([record])
      setOpen(true)
    } else {
      // 删除未保存的子项
      let newArr = [...subTabledata]
      const newDataItem = newArr[0]['data'].filter(it => it.id !== record.id)
      newArr[0]['data'] = newDataItem
      setSubTabledata(newArr)
      // console.log(subTabledata)
    }
  }

  // 展开/收起表格
  const onExpandHandle = (expanded, record) => {
    setExpandedRowKeys([])
    setExpandedRowKeys([record.id])
    setSubTabledata([])
    const params = {
      dictCode: record.dictCode
    }
    if (!expanded) {
      //关闭时清空子表格数据
      setExpandedRowKeys([])
    } else {
      asyncSubTableSearch && (asyncSubTableSearch(params))
    }
    // console.log(params)
  }

  //主项表格
  const columns = [
    {
      title: '字典项',
      dataIndex: 'dictName',
      ellipsis: true,
      align: 'left',
      key: 'dictName',
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: 'dictName',
        title: '字典项',
        requierd: 1,
        editing: isEditing(record, "dict"),
      })
    },
    {
      title: '字典编码',
      dataIndex: 'dictCode',
      key: 'dictCode',
      ellipsis: true,
      width: 100,
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: 'dictCode',
        title: '字典编码',
        requierd: 1,
        editing: isEditing(record, "dict"),
      })
    },
    {
      title: '状态',
      dataIndex: 'state',
      ellipsis: true,
      align: 'left',
      key: 'state',
      width: 100,
      onCell: (record: Item) => ({
        record,
        inputType: 'number',
        dataIndex: 'state',
        title: '状态',
        requierd: 1,
        editing: isEditing(record, "dict"),
      }),
      render: (_, record) => (
        record.state === 1 ? "开启" : "停用"
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'left',
      key: 'remark',
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <div title={text} style={{maxWidth: 300}}>{text}</div>
      ),
      onCell: (record: Item) => ({
        record,
        inputType: 'text',
        dataIndex: 'remark',
        title: '备注',
        editing: isEditing(record, "dict"),
      })
    },
    {
      title: '创建人',
      ellipsis: true,
      dataIndex: 'createId',
      align: 'left',
      key: 'createId'
    },
    {
      title: '创建时间',
      ellipsis: true,
      dataIndex: 'createTime',
      align: 'left',
      key: 'createTime'
    },
    {
      title: '最后修改人',
      ellipsis: true,
      dataIndex: 'updateId',
      align: 'left',
      key: 'updateId',
      width: 100,
    },
    {
      title: '最后修改时间',
      ellipsis: true,
      dataIndex: 'updateTime',
      width: 100,
      align: 'left',
      key: 'updateTime'
    },
    // {
    //   title: 'id',
    //   ellipsis: true,
    //   dataIndex: 'id',
    //   align: 'center',
    //   key: 'id'
    // },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 300,
      render: (_, record) => (
        <Space size="small">
          <Button size="small" type='link' onClick={() => handleClickAddSubItem(_, record)}>添加子项</Button>
          <Button size="small" type='link' onClick={() => handleClickEdit(_, record)}>编辑</Button>
          <Button size="small" type='link' onClick={() => handleClickSave(_, record)}>保存</Button>
          {/* <Button size="small" type='link' onClick={() => handleClickDel(_, record)} style={{color: 'rgb(255, 77, 79)'}}>删除</Button> */}

        </Space>
      )
    },
  ];

  //添加子项
  const handleClickAddSubItem = async (e, record) => {
    const params = {
      dictCode: record.dictCode
    }
    asyncSubTableSearch && (await asyncSubTableSearch(params))
    
    // // 原有code-data数组
    // let newData = [...subTabledata]
    // const index = newData.findIndex((item) => record.dictCode === item.id);
    const newItem = {
      "id": subTableList.length + 1 + "newItem",
      "dictItemName":"",
      "dictItemCode": "",
      "state": 1,
      "remark": "",
      "dictCode": record.dictCode,
    };
    setNewSubItem(newItem)
    handleClickSubEdit(null, newItem)
    // let newArr = [...subTableList]
    // newArr.push(newItem)
    // // 已有当前数据
    // if (index > -1) {
    //   const item = newData[index]["data"];
    //   newData.splice(index, 1, {
    //     id: record.dictCode,
    //     data: newArr
    //   });
    // } else {
    //   newData.push({
    //     id: record.dictCode,
    //     data: newArr
    //   })
    // }
    // setSubTabledata(newData)

    //展开
    setExpandedRowKeys([])
    setExpandedRowKeys([record.id])
  }

  // 编辑主项
  const handleClickEdit = async (e, record) => {
    form.setFieldsValue({ ...record });
    setEditingKey("dict" + record.id);
  }

  // 保存主项
  const handleClickSave = async (e, record) => {
    if (editingKey !== "dict" + record.id) {
      message.warning("请编辑数据！")
      return;
    }
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...tData];
      const item = newData.filter(it => record.id === it.id)[0]
      if (item) {
        const data = {
          ...item,
          ...row,
        }
        if (data?.remark?.length > 25) {
          message.warning("备注字段输入超过长度限制!")
          return;
        }
        const params = {
          "id": data.id,
          "dictName": data.dictName,
          "dictCode": data.dictCode,
          "remark": data.remark,
          "state": data.state,
        }
        asyncBizdictEdit && (await asyncBizdictEdit(params))
        asyncMainTableSearch && (await asyncMainTableSearch())
        asyncOptionsSearch && (await asyncOptionsSearch())
        setEditingKey("")
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  // 行删除主项
  const handleClickDel = async (e, record) => {
    setDelText(`您要确定删除【${record.dictName}】吗？子项会级联进行删除操作`)
    setDelRecord([record])
    setOpen(true)
  }

  // 分页
  const onChange = async (page: string, pageSize: string) => {
    // console.log(page, pageSize);
    handleChange && (await handleChange({ pageNo: page, pageSize }));
    asyncMainTableSearch && asyncMainTableSearch();
  };

  const showModal = (record) => {
    setOpen(true)
    setUserName(record.username)
  };

  // 确认删除
  const handleOk = async () => {
    setConfirmLoading(true);
    if (delRecord[0] && delRecord[0]["dictName"]) {
      const params = {
        "state": 9,
        "dictCodes":delRecord.map(it => it.dictCode)
      }
      asyncBizdictDel && (await asyncBizdictDel(params))
      asyncMainTableSearch && (await asyncMainTableSearch())
      asyncOptionsSearch && (await asyncOptionsSearch())
    } else if (delRecord[0] && delRecord[0]["dictItemCode"]) {
      const params = {
        "state": 9,
        "dictCode": delRecord[0]["dictCode"],
        "dictItemCodes":delRecord.map(it => it.dictItemCode)
      }
      asyncBizdictItemDel && (await asyncBizdictItemDel(params))
      asyncMainTableSearch && (await asyncMainTableSearch())
      setExpandedRowKeys([]) //收起展开行
      setSubTabledata([]) // 清空子表格数据
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 100);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 多选
  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //     setSelectRowsArray(selectedRows)
  //   },
  // };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      handleSelect({ selectedRows, selectedRowKeys });
    },
  };

  // 新增弹窗
  const handleClickAddOpt = async (e, record) => {
    !isShowModal && updateIsShowModalInTime(true);
    updateCurrentSceneInTime("auth")
  }

  // 开启按钮
  const handleClickStartOpt = async () => {
    if (selectRowsArray.length === 0) {
      message.warning('请至少选中一条进行操作!');
      return;
    }
    const nums = selectRowsArray.filter(it => it.state !== 1)
    if (nums.length < 1) {
      message.warning('不能重复进行操作!');
      return;
    }
    const dictCodeArray = selectRowsArray.map(it => it.dictCode)
    const params = {
      "state": 1,
      "dictCodes": dictCodeArray
    }
    asyncBizdictDel && (await asyncBizdictDel(params))
    asyncMainTableSearch && (await asyncMainTableSearch())
  }

  // 停用按钮
  const handleClickStopOpt = async () => {
    if (selectRowsArray.length === 0) {
      message.warning('请至少选中一条进行操作!');
      return;
    }
    const nums = selectRowsArray.filter(it => it.state !== 2)
    if (nums.length < 1) {
      message.warning('不能重复进行操作!');
      return;
    }
    const dictCodeArray = selectRowsArray.map(it => it.dictCode)
    const params = {
      "state": 2,
      "dictCodes": dictCodeArray
    }
    asyncBizdictDel && (await asyncBizdictDel(params))
    asyncMainTableSearch && (await asyncMainTableSearch())
  }

  // 删除按钮
  const handleClickDeleteOpt = async () => {
    if (selectRowsArray.length === 0) {
      message.warning('请至少选中一条进行操作!');
      return;
    }
    const names = selectRowsArray.map(it => it.dictName).toString()
    setDelText(`您要确定删除【${names}】吗？子项会级联进行删除操作`)
    setDelRecord(selectRowsArray)
    setOpen(true)
  }

  // 导出
  const handleClickExport = async () => {
    asyncBizdictExport && (await asyncBizdictExport())
    asyncMainTableSearch && (await asyncMainTableSearch())
  };

  // 模板下载
  const handleClickTemplate = async () => {
    asyncBizdictDictTemplate && (await asyncBizdictDictTemplate())
    asyncMainTableSearch && (await asyncMainTableSearch())
  };

  // 批量导入
  const uploadProps = {
    name: 'file',
    // action: `${window.location.origin}/yapi/api/abcAnalysis/bizdict/data`,
    maxCount: 1,
    accept:
      'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    data: {
      // id: analysisData?.alertPoolId,
    },
    beforeUpload() {
      return false;
    },
    onChange: async function(info) {
      if (!info.fileList?.length) {
        message.error('请上传文件!');
        return;
      }
      try {
        setIsAnalysisLoading(true);
        const params = objTransformFormDada({ file: info.fileList[0].originFileObj });
        const { code, data, msg } = await bizdictService.bizdictImport(params);
        if (code === 200) {
          asyncMainTableSearch && (asyncMainTableSearch())
          asyncOptionsSearch && (asyncOptionsSearch())
          message.success(`导入成功.`);
        } else {
          message.error(msg);
          // message.error(`${info.file.name} 上传失败.`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAnalysisLoading(false);
      }
      
      // setIsAnalysisLoading(true);
      // if (info.file.status !== 'uploading') {
      //   // console.log(1111, info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //     asyncMainTableSearch && (asyncMainTableSearch())
      //   message.success(`导入成功.`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} 上传失败.`);
      // }
    },
  };

  useEffect(() => {
    const tableHeight = document.getElementById('table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  // 主表格监听
  useEffect(() => {
    setTData(tableData)
  }, [tableData]);

  // 子表格监听
  useEffect(() => {
    if (subDictCode && subDictCode !== '') {
      const newData = [{
        id: subDictCode,
        data: subTableList
      }]
      setSubTabledata(newData)
    }
  }, [subTableList]);

  // 添加子项的监听
  useEffect(() => {
    if (subTabledata[0] && subTabledata[0]["id"] === newSubItem["dictCode"]) {
      const newArr = [...subTabledata[0]["data"]]
      newArr.push(newSubItem)
      const data = [{
        id: newSubItem["dictCode"],
        data: newArr
      }]
      setSubTabledata([])
      setSubTabledata(data)
    }
  }, [newSubItem]);

  const EditableCell: React.FC = ({
    editing,
    dataIndex,
    requierd,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? 
    <Select>
      {options?.map(item => (
        <Select.Option key={item.code} children={item.name} value={item.code} />
      ))}
    </Select> 
    : 
    <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: requierd,
                message: `请输入${title} !`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div>
      <Container className="dic-opt-btn">
        <Button size="small" type="link" onClick={handleClickTemplate}>模板下载</Button>
        <Upload {...uploadProps} showUploadList={false}>
          <Button size="small" type="link">批量导入</Button>
        </Upload>
        <Button size="small" type="link" onClick={handleClickExport}>Excel导出</Button>
        <Button size="small" type="link" onClick={handleClickAddOpt}>新增</Button>
        <Button size="small" type="link" onClick={handleClickStartOpt} >开启</Button>
        <Button size="small" type="link" onClick={handleClickStopOpt}>停用</Button>
        {/* <Button size="small" type="link" onClick={handleClickDeleteOpt} style={{color: 'rgb(255, 77, 79)'}}>删除</Button> */}
      </Container>
      <ContainerMain>
        <Modal
          title="删除"
          visible={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{delText}</p>
        </Modal>
        <div
          id="table-container"
          style={{
            width: '100%',
            flex: 1,
            overflow: 'hidden',
          }}
        >
        <Form form={form} component={false}>
          <TableComponent
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowSelection={{
              ...rowSelection,
            }}
            loading={tableLoading}
            bordered
            columns={columns}
            dataSource={tData}
            pagination={false}
            scroll={{ x: 'max-content', y: 'calc(100vh - 288px)' }}
            size="small"
            rowKey={(record: any) => record.id}
            expandedRowRender={record => expandedRowRender(record)}
            onExpand={onExpandHandle}
            expandedRowKeys={expandedRowKeys}
          />
        </Form>
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
      </ContainerMain>
    </div>
  );
};

export default getHocComp(MainTable, { withLoading: true });
