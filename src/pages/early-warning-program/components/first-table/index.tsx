import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Space, Select, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import TableComponent from '@/components/table';
import { Container, TableContainer } from './style';
import { toFixedNum } from '@/utils/helper';
import './style.css'

const EditableContext = React.createContext<FormInstance<any> | null>(null);
const { Option } = Select;

const EditableFormRow: React.FC<any> = ({ index, ...props}) => {
  const [form] = Form.useForm();
  return (    
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  dataIndex2,
  record,
  inputType,
  optionData,
  optionData2,
  handleSave,
  isShow,
  defaultValue,
  datasource,
}) => {
  const getInput = (
    record, 
    dataIndex, 
    dataIndex2,
    title, 
    children, 
    optionData, 
    optionData2, 
    isShow,
    defaultValue,
    datasource
  ) => {
    switch (inputType) {
      case "select":
        return (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
          >
            <Select
              placeholder="请选择"
              disabled={isShow}
              defaultValue={getDefaultValue(record, defaultValue, datasource, dataIndex)}
              onChange={(e) => changeRowSelect(e, record, dataIndex, datasource)}
              style={{ width: '100%' }}>
              {
                optionData.map((p, index) => (
                  <Option value={p.code} key={p.code}>
                    {p.name}
                  </Option>
                ))
              }
            </Select>   
          </Form.Item>
        );

        case "multipleSelect":
          return (
            <Form.Item
              style={{ margin: 0 }}
              name={dataIndex}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择"
                disabled={isShow}
                defaultValue={getDefaultValue(record, defaultValue, datasource, dataIndex)}
                onChange={(e) => changeRowSelect(e, record, dataIndex)}
                style={{ width: '100%' }}>
                {
                  optionData.map((p, index) => (
                    <Option value={p.code} key={p.code}>
                      {p.name}
                    </Option>
                  ))
                }
              </Select>   
            </Form.Item>
          );
      
      case "select-two":
        return (
          <div className='row-div'>
            <Form.Item
              style={{ margin: 0 }}
              name={dataIndex}
            >
              <Select 
                defaultValue={getDefaultValue(record, defaultValue[0], datasource, dataIndex)}
                disabled={isShow}
                onChange={(e) => changeRowSelect(e, record, dataIndex)}
                style={{ width: '100%' }}
              >
                {
                  optionData.map((p, index) => (
                    <Option value={p.code} key={p.code}>
                      {p.name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              style={{ margin: 0 }}
              name={dataIndex2}
            >
              <Select 
                defaultValue={getDefaultValue(record, defaultValue[1], datasource, dataIndex2)}
                disabled={record.isAttenuation == 2 || isShow}
                onChange={(e) => changeRowSelect(e, record, dataIndex2)}
                style={{ width: '100%' }}>
                {
                  optionData2.map((p, index) => (
                    <Option value={p.code} key={p.code}>
                      {p.name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
        )
      
      case "input":     
        return (
          <Form.Item
            style={{ margin: 0 }}
            onBlur={(e) => changeRowInput(e, record, dataIndex)}
            rules={[{ required: true, message: '' }]}
            name={dataIndex}
          >
            {/* <Input 
              defaultValue={getDefaultValue(record, defaultValue, datasource, dataIndex)}
              disabled={isShow}
              style={{ height: '32px' }}/>  */}
            <InputNumber
              step={0.01}
              // precision={2}
              min={0}
              max={10000000000000}
              defaultValue={getDefaultValue(record, defaultValue, datasource, dataIndex)}
              disabled={isShow}
              style={{ height: '32px', width: '100%' }}
              parser={text => {
                if( !text || text === '0.00' || text === '0.0' ) return '0.00';
                return /^\d+$/.test(text) ? text : toFixedNum(parseFloat(text), 2);
              }}
            />
          </Form.Item>
        );

      default:
        return (
          <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
            {children}
          </div>
        );
    }
  };

  const getDefaultValue = (record, defaultValue, datasource, dataIndex) => {
    const data = datasource?.filter(it => it.id === record.id)[0]
    if (data) {
      return data[dataIndex]
    }
    return defaultValue
  }

  const changeRowSelect = (e, record, key, datasource) => {
    let val = e
    // 是否计算衰减因子
    if (key === 'isAttenuation' && e === '2') {
      record['attenuationFactor'] = ''
    }
    if (key === 'isAttenuation' && e === '1') {
      record['attenuationFactor'] = '0.9900'
    }
    //预警名称去重
    if (key === 'codeOfearlyWarningName') {
      const namesArr = datasource.map(it => it.codeOfearlyWarningName)
      if (namesArr.includes(e)) {
        val = ''
        message.error('一级预警名称不能重复')
      }
    }
    record[key] = val
    handleSave(record, key)
  }

  const changeRowInput = (e, record, key) => {
    // const val = toFixedNum(e.target.value, 2)
    let val = e.target.value
    if (val < 0) {
      val = '0'
    }
    if (val > 10000000000000) {
      val = '10000000000000'
    }
    if(!val) val = '0.00'
    record[key] = val
    handleSave(record)
  }

  let childNode = children;  
  if (editable) {
    childNode = getInput(
      record, 
      dataIndex, 
      dataIndex2,
      title, 
      children, 
      optionData, 
      optionData2,
      isShow,
      defaultValue,
      datasource
    )
  }
  return (
      <td>
        {childNode}
      </td>
  );
};

const App = forwardRef((props, ref) => {
  const { tableData, ewOptions, isShow } = props
  const [dataSource, setDataSource] = useState(tableData);
  const [selectedTableRows, setSelectedTableRows] = useState([]);
  const [count, setCount] = useState(2);
  const [changeItem, setChangeItem] = useState([])

  useImperativeHandle(ref, () => ({
    dataSource: dataSource,
    changeItem: changeItem,
    resetTable: resetTable, 
    rowSelection: rowSelection,
  }))

  const resetTable = (data) => {
    setDataSource([])
    const arr = [...data]
    setTimeout(() => {
      setDataSource(arr ? arr : []);
    });
  }

  const cols = [
    {
      title: '一级预警名称',
      dataIndex: 'codeOfearlyWarningName',
      key: 'codeOfearlyWarningName',
      width: 300,
      editable: true,
      datatype: 'select',
      optionData: ewOptions ? ewOptions : [{}],
      defaultValue: '6001000',
    },
    {
      title: '重要性',
      dataIndex: 'importance',
      width: 300,
      key: 'importance',
      datatype: 'multipleSelect',
      editable: true,
      optionData: [{
        name: "零星",
        code: "0"
      }, {
        name: "一星",
        code: "1"
      }, {
        name: "二星",
        code: "2"
      }, {
        name: "三星",
        code: "3"
      }],
      defaultValue: '3',
    },
    {
      title: '是否衰减计算/衰减因子',
      dataIndex: 'isAttenuation',
      dataIndex2: 'attenuationFactor',
      editable: true,
      datatype: 'select-two',
      key: 'isAttenuation',
      optionData: [{
        "name": "是",
        "code": "1"
      }, {
        "name": "否",
        "code": "2"
      }],
      optionData2: [{
        "name": "0.99",
        "code": "0.9900"
      }, {
        "name": "0.999",
        "code": "0.9990"
      }],
      defaultValue: ['1', '0.999']
    },
    {
      title: '预警阈值',
      dataIndex: 'earlyWarningThreshold',
      editable: true,
      datatype: 'input',
      key: 'earlyWarningThreshold',
      defaultValue2: '0',
    }
  ];
  
  const defaultColumns: ({ editable?: boolean; dataIndex: string; dataIndex2: string; datatype: string })[] = [
    ...cols
  ];

  const handleAdd = () => {
    const newData: DataType = {
      "id": String(count)+'newItem',
      "codeOfearlyWarningName":"",
      "importance": "3",
      "isAttenuation": "2",
      "attenuationFactor": "",
      "earlyWarningThreshold": "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);

    const newArr = [...changeItem]
    newArr.push(newData.id)
    setChangeItem(newArr)
  };

  const handleDel = () => {
    if (selectedTableRows?.length === 0) {
      message.error("请选择数据！")
    }

    if(props.isOnlyOne(selectedTableRows?.length)){
      message.error("请至少保留一条数据！")
      return;
    }
    
    const newData = dataSource.filter((item) => !selectedTableRows.includes(item.id));
    setDataSource(newData);
    rowSelection.onChange([]);

    selectedTableRows.forEach(item => {
      if (!changeItem?.filter(it => it === item)[0]) {
        const newArr = [...changeItem]
        newArr.push(item)
        setChangeItem(newArr)
      }
    })
    
  }

  const handleSave = (row: DataType, key) => {
    if (!changeItem?.filter(it => it === row.id)[0]) {
      const newArr = [...changeItem]
      newArr.push(row.id)
      setChangeItem(newArr)
    }
    
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    setDataSource(newData);
    //重新渲染表格
    if (key === 'isAttenuation' || key === 'codeOfearlyWarningName') {
      setDataSource([]);
      setTimeout(() => {
        setDataSource(newData);
      })
    }
  };

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => {
        return {
          record,
          optionData: col.optionData,
          optionData2: col.optionData2,
          inputType: col.datatype,
          dataIndex: col.dataIndex,
          dataIndex2: col.dataIndex2,
          title: col.title,
          editable: col.editable,
          defaultValue: col.defaultValue,
          isShow: isShow,
          datasource: dataSource,
          handleSave,
        };
      }
    };
  });

  const rowSelection = {
    selectedRowKeys: selectedTableRows,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedTableRows(selectedRowKeys)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: isShow,
      name: record.name,
    }),
  };

  return (
    <Container>
      {!isShow && (
        <Form layout={'inline'} style={{marginLeft: '4px'}}>
          <Form.Item>
            <Space>
              <Button type="primary" onClick={handleAdd} size="small">
                新增
              </Button>
              <Button type="primary" onClick={handleDel} size="small">
                删除
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
      
      <TableContainer id="table">
        <TableComponent
          rowSelection={{
            ...rowSelection,
          }}
          rowClassName={() => 'editable-row'}
          bordered={true}
          pagination={false}
          components={components}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record: any) => record.id}
        />
      </TableContainer>
    </Container>
  );
});

export default App;