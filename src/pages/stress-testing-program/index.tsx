import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider,
  Form,
  DatePicker,
  Select,
  Row,
  Col,
  Button,
  message,
  Space,
  Modal,
  Input,
  InputNumber,
} from 'antd';
import { Loading } from '@lugia/lugia-web';

import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import DebounceSelect from '@/components/debounce-select';
import { Container } from '@/constant/style';
import { financingRepurchaseService, bizdictService } from '@/config/di.config';
import { toFixedFn2 } from '@/utils/helper';
import { FormContainer } from './style';

import './index.css';

interface UserValue {
  label: string;
  value: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const pageSizeOptions = [30, 50, 100];

const rules = [{ required: true, message: '不能为空!' }];

const StressTestingProgram: React.FC = () => {
  const [height, setHeight] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [tableData, setTableData] = useState<any[] | null>(null);

  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });

  const [schemaId, setSchemaId] = useState<string | null>(null);

  const [currentData, setCurrentData] = useState<any>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [option, setOption] = useState<any>([]);

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const debounceSelectRef = useRef();

  const columns = [
    {
      title: '操作',
      key: 'action',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <div>
          <a
            style={{ cursor: 'default', color: record.defaultStatus ? '#1890ff' : '#00000040' }}
            href="javascript:void(0);"
            onClick={() => handleEdit(record)}
          >
            编辑
          </a>
          <span
            style={{
              color: record.defaultStatus ? '#ff4d4f' : '#00000040',
              marginLeft: '5px',
              cursor: 'default',
            }}
            onClick={() => handleDelete(record)}
          >
            删除
          </span>
        </div>
      ),
    },
    {
      title: '方案名称',
      dataIndex: 'schemaName',
      key: 'schemaName',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'left',
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '折算率下调比例(%)',
      dataIndex: 'conversionRateDown',
      key: 'conversionRateDown',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'center',
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '指数',
      dataIndex: 'indexName',
      key: 'indexName',
      width: 100,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'center',
      // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
    },
    {
      title: '指数下跌比例(%)',
      dataIndex: 'indexDown',
      key: 'indexDown',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'center',
      // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
    },
    {
      title: '收益率曲线上移(BP)',
      dataIndex: 'yldRateUp',
      key: 'yldRateUp',
      ellipsis: true,
      showSorterTooltip: true,
      width: 130,
      align: 'center',
    },
    {
      title: '违约率(%)',
      dataIndex: 'defaultRate',
      key: 'defaultRate',
      width: 100,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
      ellipsis: true,
      showSorterTooltip: true,
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
      showSorterTooltip: true,
      width: 150,
      align: 'left',
    },
    {
      title: '修改人',
      dataIndex: 'modifier',
      key: 'modifier',
      ellipsis: true,
      showSorterTooltip: true,
      width: 100,
      align: 'left',
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      ellipsis: true,
      showSorterTooltip: true,
      width: 150,
      align: 'left',
    },
    // {
    //   title: '是否持仓',
    //   dataIndex: 'defaultStatus',
    //   key: 'defaultStatus',
    //   width: 100,
    //   align: 'center',
    //   render: (text: any, record: any) => (text ? <span>是</span> : <span>否</span>),
    // },
  ];

  // 编辑/新增
  const handleEdit = record => {
    setCurrentData(record ? record : {});
    setIsShowModal(record.defaultStatus === 0 ? false : true);
    form1.setFieldsValue(record ? record : {});
  };

  // 删除
  const handleDelete = record => {
    if (!record?.defaultStatus) return;
    Modal.confirm({
      title: '删除提示',
      // icon: <ExclamationCircleOutlined />,
      content: '确定要删除吗?',
      okText: '确定',
      // okType: 'danger',
      cancelText: '取消',
      async onOk() {
        try {
          const { code, msg, data } = await financingRepurchaseService.schemaDelete({
            id: record?.id,
          });
          if (code === 200) {
            message.success(msg);
            onSearch({
              schemaId,
              startPage: pagination.pageNo,
              pageSize: pagination.pageSize,
            });
            if (debounceSelectRef?.current && debounceSelectRef.current.handleSearch) {
              debounceSelectRef.current.handleSearch();
            }
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    onSearch({
      startPage: pagination.pageNo,
      pageSize: pagination.pageSize,
    });
    getDictQuery();
    const heights = document.getElementById('stress-testing-program-container')?.offsetHeight;
    setHeight(heights ? heights - 40 + 'px' : null);
  }, []);

  const title = useMemo(() => (currentData?.id ? '编辑' : '新增'), [currentData?.id]);

  // 指数数据
  const getDictQuery = async () => {
    try {
      // const { code, data, msg } = await financingRepurchaseService.dictQuery();
      const { code, data, msg } = await bizdictService.subList({ dictCode: '800001' });
      if (code === 200) {
        setOption(data);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 方案名称模糊查询
  const fetSchemaList = async (value: string): Promise<UserValue[]> => {
    return new Promise(async function(resolve, reject) {
      try {
        const { code, data, msg } = await financingRepurchaseService.getSchemaList({
          schemaName: value,
        });
        if (code === 200) {
          resolve(data);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  // 查询
  const onSearch = async (values?: any) => {
    setLoading(true);
    setSchemaId(form.getFieldValue('schemaId'));
    setTableData([]);
    try {
      const { code, data, total, msg } = await financingRepurchaseService.list(values);

      if (code === 200) {
        setTableData(data || []);
        setPagination({
          pageNo: values.startPage,
          pageSize: values.pageSize,
          total,
        });
        // console.log(99999, {
        //   pageNo: values.pageNo ? values.startPage : pagination.pageNo,
        //   pageSize: values.pageSize ? values.pageSize : pagination.pageSize,
        //   total,
        // });
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 查询表单
  const onFinish = values => {
    onSearch({
      ...values,
      startPage: 1,
      pageSize: pagination.pageSize,
    });
  };

  // 分页
  const onChange = (pageNo, pageSize) => {
    setPagination({
      ...pagination,
      pageNo,
      pageSize,
    });
    onSearch({
      schemaId,
      startPage: pageNo,
      pageSize,
    });
  };

  const checkValues = values => {
    if (Number(values.conversionRateDown) > 100 || Number(values.conversionRateDown) < 0) {
      form1.setFieldsValue({
        conversionRateDown: '0.00',
      });
      return false;
    } else if (Number(values.indexDown) > 0 || Number(values.indexDown) < -100) {
      form1.setFieldsValue({
        indexDown: '0.00',
      });
      return false;
    } else if (Number(values.yldRateUp) > 1000 || Number(values.yldRateUp) < 0) {
      form1.setFieldsValue({
        yldRateUp: '0.00',
      });
      return false;
    } else if (Number(values.defaultRate) > 10 || Number(values.defaultRate) < 0) {
      form1.setFieldsValue({
        defaultRate: '0.00',
      });
      return false;
    }
    return true;
  };

  // 提交
  const handleSubmit = async values => {
    const checkedValues = checkValues(values);
    if (!checkedValues) return false;
    try {
      const params = {
        ...values,
        id: currentData?.id,
      };
      const { code, data, msg } = currentData.id
        ? await financingRepurchaseService.edit(params)
        : await financingRepurchaseService.schemaAdd(params);
      if (code === 200) {
        message.success(msg);
        handleCancel();
        onSearch({
          schemaId,
          startPage: pagination.pageNo,
          pageSize: pagination.pageSize,
        });
        if (!currentData.id) {
          if (debounceSelectRef?.current && debounceSelectRef.current.handleSearch) {
            debounceSelectRef.current.handleSearch();
          }
        }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 关闭弹框
  const handleCancel = () => {
    setIsShowModal(false);
    setCurrentData(null);
    form1.resetFields();
  };

  const onInputBlur = e => {
    const value = e.target.value.trim();
    form1.setFieldsValue({ ...form1.getFieldsValue(true), schemaName: value });
  };

  const onInputNumberBlur = (e, name) => {
    let val = undefined;
    if (e.target.value && String(Number(e.target.value)) !== 'NaN') {
      const number = e.target.value ? Number(e.target.value).toFixed(2) : 0;
      val = String(number);
    }
    form1.setFieldsValue({ ...form1.getFieldsValue(true), [name]: val });
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <FormContainer>
          <Form
            {...layout}
            form={form}
            className="stress-testing-program-form"
            // initialValues={{}}
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="方案名称" name="schemaId">
                  <DebounceSelect
                    // mode="multiple"
                    ref={debounceSelectRef}
                    showSearch
                    allowClear
                    placeholder="请输入查询"
                    fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                    optionLabelProp="name"
                    fetchOptions={fetSchemaList}
                    // maxTagCount="responsive"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button type="primary" onClick={handleEdit}>
                      新增
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </FormContainer>
        <div className="stress-testing-program-container" id="stress-testing-program-container">
          <Loading loading={loading} isInherit={true}>
            <TableComponent
              bordered={true}
              columns={columns}
              dataSource={tableData}
              pagination={false}
              // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
              scroll={{ x: '100%', y: height }}
              size="small"
              // loading={loading}
              rowKey={(record: any) => record.id}
            />
          </Loading>
        </div>
        <div className="stress-testing-program-pagination">
          <Pagination
            total={pagination.total}
            currentPage={pagination.pageNo}
            pageSize={pagination.pageSize}
            pageSizeOptions={pageSizeOptions}
            onChange={onChange}
          />
        </div>

        <Modal
          className="stress-testing-program-modal"
          centered
          title={title}
          visible={isShowModal}
          maskClosable={false}
          footer={null}
          onCancel={handleCancel}
        >
          <Form
            {...layout}
            form={form1}
            autoComplete="off"
            initialValues={{}}
            onFinish={handleSubmit}
          >
            <Form.Item label="方案名称" name="schemaName" rules={rules}>
              <Input
                placeholder="请输入"
                maxLength={100}
                style={{ width: 192 }}
                onBlur={onInputBlur}
              />
            </Form.Item>
            <Form.Item label="折算率下调比例" name="conversionRateDown" rules={rules}>
              <InputNumber
                placeholder="请输入"
                stringMode
                min="0"
                max="100"
                addonAfter="%"
                step="0.01"
                onBlur={e => onInputNumberBlur(e, 'conversionRateDown')}
                // parser={value => toFixedFn2(value ? value : '', 2)}
                // parser={(value) => Number(value)?.toFixed(2)}
              />
            </Form.Item>
            <Form.Item label="指数下跌比例" required>
              <Input.Group compact>
                <Form.Item name="index" rules={rules}>
                  <Select
                    placeholder="请选择指数"
                    style={{ width: 120 }}
                    options={option}
                    allowClear
                    fieldNames={{
                      label: 'dictItemName',
                      value: 'dictItemCode',
                      options: 'options',
                    }}
                    optionLabelProp="dictItemName"
                  />
                </Form.Item>
                <Form.Item name="indexDown" rules={rules}>
                  <InputNumber
                    placeholder="请输入"
                    stringMode
                    min="-100"
                    max="0"
                    addonAfter="%"
                    step="0.01"
                    // parser={value => toFixedFn2(value ? value : '', 2)}
                    onBlur={e => onInputNumberBlur(e, 'indexDown')}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item label="收益率曲线上移" name="yldRateUp" rules={rules}>
              <InputNumber
                placeholder="请输入"
                stringMode
                min="0"
                max="1000"
                addonAfter="BP"
                step="0.01"
                // parser={value => toFixedFn2(value ? value : '', 2)}
                onBlur={e => onInputNumberBlur(e, 'yldRateUp')}
              />
            </Form.Item>
            <Form.Item label="违约率" name="defaultRate" rules={rules}>
              <InputNumber
                placeholder="请输入"
                stringMode
                min="0"
                max="10"
                addonAfter="%"
                step="0.01"
                // parser={value => toFixedFn2(value ? value : '', 2)}
                onBlur={e => onInputNumberBlur(e, 'defaultRate')}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
                <Button type="primary" onClick={handleCancel}>
                  返回
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </ConfigProvider>
  );
};

export default StressTestingProgram;
