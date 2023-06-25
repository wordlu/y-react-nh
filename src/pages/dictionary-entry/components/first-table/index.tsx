import React, { useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Space, Select, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import TableComponent from '@/components/table';
import { Container, TableContainer } from './style';
import './style.css'

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const { Option } = Select;

interface Item {
  "id": string
  "codeOfearlyWarningName":string
  "importance": string
  "isAttenuation": string
  "attenuationFactor": string
  "earlyWarningThreshold": string
}

interface EditableRowProps {
  index: number;
}

const EditableFormRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  inputType: string;
  children: React.ReactNode;
  dataIndex: keyof Item;
  dataIndex2: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
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
}) => {
  const getInput = (
    record, 
    dataIndex, 
    dataIndex2,
    title, 
    children, 
    optionData, 
    optionData2, 
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
              defaultValue={optionData[0]["code"]}
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
      case "input":     
        return (
          <Form.Item
            style={{ margin: 0 }}
            onBlur={(e) => changeRowInput(e, record, dataIndex)}
            rules={[{ required: true, message: '' }]}
            defaultValue={record[dataIndex]}
            name={dataIndex}
          >
            <Input 
              defaultValue={record[dataIndex]}
              style={{ height: '32px' }}/> 
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

  const changeRowSelect = (e, record, key) => {
    record[key] = e
    handleSave(record)
  }

  const changeRowInput = (e, record, key) => {
    const val = e.target.value
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
    )
  }
  return (
      <td>
        {childNode}
      </td>
  );
};

const App = forwardRef((props, ref) => {
  const { ewOptions } = props
  const [dataSource, setDataSource] = useState([]);
  const [selectedTableRows, setSelectedTableRows] = useState([]);
  const [count, setCount] = useState(2);

  useImperativeHandle(ref, () => ({
    dataSource: dataSource,
    setDataSource: setDataSource
  }))

  const cols = [
    {
      title: '子项编号',
      dataIndex: 'dictItemCode',
      key: 'dictItemCode',
      editable: true,
      datatype: 'input',
    },
    {
      title: '子项值',
      dataIndex: 'dictItemName',
      key: 'dictItemName',
      editable: true,
      datatype: 'input',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      editable: true,
      datatype: 'select',
      optionData: ewOptions ? ewOptions : [{}]
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      editable: true,
      datatype: 'input'
    },
  ];
  
  const defaultColumns: ({ editable?: boolean; dataIndex: string; dataIndex2: string; datatype: string })[] = [
    ...cols
  ];

  const handleAdd = () => {
    const newData: DataType = {
      "id": String(count),
      "dictItemName":"",
      "dictItemCode": "",
      "state": "",
      "remark": ""
      
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDel = () => {
    if (selectedTableRows.length === 0) {
      message.error("请选择需要删除的数据")
      return ;
    }
    const newData = dataSource.filter((item) => !selectedTableRows.includes(item.id));
    setDataSource(newData);
  }

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
          handleSave,
        };
      }
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedTableRows(selectedRowKeys)
      // console.log(selectedTableRows)
    },
  };

  return (
    <Container>
      <Form layout={'inline'} style={{marginLeft: '4px'}}>
        <Form.Item>
          <Space>
            <Button type="link" onClick={handleAdd} size="small">
              新增
            </Button>
            <Button type="link" style={{color: 'rgb(255, 77, 79)'}} onClick={handleDel} size="small">
              删除
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <TableContainer id="table" className="dict-entry-add-new-item">
        <TableComponent
          rowSelection={{
            ...rowSelection,
          }}
          scroll={{ x: 'fit-content', y: 'calc(100vh - 500px)' }}
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