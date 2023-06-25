import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { earlyWarningProgramService, earlyWarningDetailsService } from '@/config/di.config';
import {
  ConfigProvider,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Select,
  Col,
  Row,
  Input,
  message,
} from 'antd';
import m from 'moment';
import { Loading } from '@lugia/lugia-web';

import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import DebounceSelect from '@/components/debounce-select';

const requiredMsg = '不能为空！';

const Search = forwardRef((props: any, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credit, setCredit] = useState([]);
  const [waring, setWaring] = useState([]);
  const [plan, setPlan] = useState([]);
  const [data, setData] = useState([]);
  const [parmes, setParmes] = useState({});
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [view, setView] = useState(false);
  const [form] = Form.useForm();
  const [email, setEmail] = useState([]);
  const [code, setCode] = useState([]);
  const [infoData, setInfoData] = useState({});
  const [height, setHeight] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const formItemLayout = {
    labelAlign: 'right',
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };

  const [earlyWarnPoolsData, setEarlyWarnPoolsData] = useState([]);
  const [earlyWarnPlansData, setEarlyWarnPlansData] = useState([]);

  const earlyWarnPoolRef = useRef();
  const earlyWarnPlanRef = useRef();

  useImperativeHandle(ref, () => ({
    showModal,
    selectedRowKeys,
    clearSelectedRowKeys: rowSelection.onChange,
    getList,
    updatePaginationPageNo,
  }));

  useEffect(() => {
    const heights = document.getElementById('early-warning-email-table')?.offsetHeight;
    setHeight(heights ? heights - 40 + 'px' : null);
  }, []);

  const columns = [
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'left',
      width: 140,
      render: _ => (
        <Space size="middle">
          <a
            onClick={() => {
              diable(_);
            }}
          >
            {_.state === 1 ? '禁用' : '启用'}
          </a>
          <a
            onClick={() => {
              editDetail(_);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              editDetail(_, 'view');
            }}
          >
            查看
          </a>
        </Space>
      ),
    },
    {
      title: '收件人',
      dataIndex: 'recipient',
      key: 'recipient',
      // align: 'center',
      width: 230,
      fixed: 'left',
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '抄送',
      dataIndex: 'carbonCopy',
      key: 'carbonCopy',
      // align: 'center',
      width: 230,
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '发送维度',
      dataIndex: 'sendDimension',
      key: 'sendDimension',
      // align: 'center',
      width: 80,
      render: _ => (
        <div>
          {props.dimension.length > 0 &&
            props.dimension.filter(item => {
              return item.code == _;
            })[0].message}
        </div>
      ),
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '维度勾选值',
      dataIndex: 'sendDimensionVal',
      key: 'sendDimensionVal',
      // align: 'center',
      width: 230,
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '预警池',
      dataIndex: 'warningPoolName',
      key: 'warningPoolName',
      // align: 'center',
      width: 150,
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '预警方案',
      dataIndex: 'warningSchemeName',
      key: 'warningSchemeName',
      // align: 'center',
      width: 150,
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '本日信用压力',
      dataIndex: 'oneDay',
      key: 'oneDay',
      // align: 'center',
      width: 120,
      render: _ => {
        const list = credit.filter(item => {
          return item.code == _;
        });
        return <div>{list.length > 0 && list[0].message}</div>;
      },
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '五日内信用压力',
      dataIndex: 'fiveDay',
      key: 'fiveDay',
      // align: 'center',
      width: 120,
      render: _ => {
        const list = credit.filter(item => {
          return item.code == _;
        });
        return <div>{list.length > 0 && list[0].message}</div>;
      },
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '三十日内信用压力',
      dataIndex: 'thirtyDay',
      key: 'thirtyDay',
      // align: 'center',
      width: 130,
      render: _ => {
        const list = credit.filter(item => {
          return item.code == _;
        });
        return <div>{list.length > 0 && list[0].message}</div>;
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      // align: 'center',
      width: 80,
      render: _ => {
        const list = props.state.filter(item => {
          return item.code == _;
        });
        return <div>{list.length > 0 && list[0].message}</div>;
      },
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '创建人',
      dataIndex: 'createId',
      key: 'createId',
      // align: 'center',
      width: 80,
      ellipsis: true,
      showSorterTooltip: true,
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      render: _ => <div>{m(_).format('YYYY-MM-DD')}</div>,
    },
    {
      title: '最近修改日期',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      render: _ => <div>{m(_).format('YYYY-MM-DD')}</div>,
    },
    {
      title: '截止日期',
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      render: _ => <div>{m(_).format('YYYY-MM-DD')}</div>,
    },
  ];

  const editDetail = async (e: any, v: string) => {
    const data = {
      ...e,
      carbonCopy: e.carbonCopy ? e.carbonCopy.split(',') : undefined,
      recipient: e.recipient ? e.recipient.split(',') : undefined,
    };
    setIsModalOpen(true);
    getDimension(e.sendDimension);
    form.setFieldsValue(data);
    setParmes(data);
    setInfoData(data);

    if (e.sendDimension && e.sendDimensionVal) {
      handleSearch(e.sendDimensionVal);
    }
    if (v) {
      setView(true);
    }

    setDefaultdebounceSelect(e);
  };

  const setDefaultdebounceSelect = e => {
    setTimeout(() => {
      // 预警池下拉数据
      if (
        e.warningPool &&
        e.warningPoolName &&
        earlyWarnPoolRef?.current &&
        earlyWarnPoolRef.current?.defaultOptions
      ) {
        earlyWarnPoolRef.current.defaultOptions([{ code: e.warningPool, name: e.warningPoolName }]);
      }

      // 预警方案下拉数据
      if (
        e.warningScheme &&
        e.warningSchemeName &&
        earlyWarnPlanRef?.current &&
        earlyWarnPlanRef.current?.defaultOptions
      ) {
        earlyWarnPlanRef.current.defaultOptions([
          { code: e.warningScheme, name: e.warningSchemeName },
        ]);
      }
    }, 10);
  };

  const updatePaginationPageNo = (currentPage: any) => {
    setPagination({
      ...pagination,
      pageNo: currentPage,
    });
  };

  useEffect(() => {
    getList();
  }, [props.searchData, pagination.pageNo, pagination.pageSize]);

  const diable = async e => {
    try {
      const { code, msg } = await earlyWarningProgramService.alertEmailState({
        state: e.state === 1 ? 2 : 1,
        ids: [e.id],
      });
      if (code === 200) {
        message.success(msg);
        getList();
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getList = async () => {
    setIsLoading(true);
    setData([]);
    try {
      const { code, msg, total, data } = await earlyWarningProgramService.alertEmailPage({
        ...props.searchData,
        page: pagination.pageNo,
        rows: pagination.pageSize,
      });
      if (code === 200) {
        setData(data || []);
        setPagination({
          ...pagination,
          page: 1,
          total: total,
        });
      } else {
        message.error(msg);
        setData([]);
        setPagination({
          ...pagination,
          total: 0,
        });
      }
    } catch (err) {
      setData([]);
      setPagination({
        ...pagination,
        total: 0,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    creditPressurelist();
  }, []);

  // 信用压力下拉数据
  const creditPressurelist = async () => {
    try {
      const { code, msg, data } = await earlyWarningProgramService.creditPressurelist();
      setCredit(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setParmes({});
      setView(false);
      setEmail([]);
      setCode([]);
    }
  }, [isModalOpen]);

  const showModal = () => {
    form.resetFields();
    setInfoData({});
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (!values.oneDay && !values.fiveDay && !values.thirtyDay) {
      message.warning('请选择一项信用压力！');
      return;
    }
    const parmes = {
      ...form.getFieldsValue(),
      carbonCopy: form.getFieldsValue().carbonCopy?.join(','),
      recipient: form.getFieldsValue().recipient?.join(','),
      oneDay: values.oneDay || '',
      fiveDay: values.fiveDay || '',
      thirtyDay: values.thirtyDay || '',
    };
    if (values) {
      try {
        const { code, data, msg } = await earlyWarningProgramService.alertEmail({
          alertEmailCode: infoData.alertEmailCode,
          ...parmes,
        });
        if (code === 200) {
          message.success(msg);
          getList();
          setIsModalOpen(false);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({});
  };

  // 获取收件人/抄送数据
  const handleSearch = async (e: any, option?: any) => {
    setEmail([]);
    try {
      const { code, msg, data } = await earlyWarningProgramService.recipient({
        institutionType: parmes.sendDimension || form.getFieldValue('sendDimension'),
        // institutionName: parmes.sendDimensionVal,
        // institutionName: option?.name,
        institutionName: e,
      });
      if (code === 200 && data) {
        setEmail(data?.map(item => ({ label: item, value: item })));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDimension = async e => {
    const datas = {
      ...parmes,
      sendDimensionVal: undefined,
      carbonCopy: undefined,
      recipient: undefined,
      sendDimension: e,
    };
    setParmes(datas);
    form.setFieldsValue(datas);

    const arr = [
      { code: -1, name: 'qb' },
      { code: 1, name: 'wtr' },
      { code: 2, name: 'tgr' },
      { code: 3, name: 'str' },
      { code: 4, name: 'zhmc' },
    ];

    const value = arr.filter(item => {
      return e === item.code;
    })[0]?.name;

    setCode([]);
    setEmail([]);

    try {
      const { code, data, msg } =
        value === 'zhmc'
          ? await earlyWarningDetailsService.zhmcList()
          : await earlyWarningProgramService.itemSimples({ dictCode: value });
      if (code === 200) {
        setCode(data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFormLayoutChange = (item: any, avlue: any) => {
    setParmes(avlue);
  };

  const onChange = (pageNo, pageSize) => {
    setPagination({
      ...pagination,
      pageNo,
      pageSize,
    });
  };

  // 预警池下拉框数据
  const getEarlyWarnPools = async () => {
    try {
      const { code, msg, data } = await earlyWarningDetailsService.getEarlyWarnPools();
      if (code === 200) {
        setEarlyWarnPoolsData(data || []);
      } else {
        // message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 预警方案下拉框数据
  const getEarlyWarnPlans = async () => {
    try {
      const { code, msg, data } = await earlyWarningDetailsService.getEarlyWarnPlans();
      if (code === 200) {
        setEarlyWarnPlansData(data || []);
      } else {
        // message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEarlyWarnPools();
    getEarlyWarnPlans();
  }, []);

  // 预警池/预警方案模糊查询
  const fetSchemaList = async (value: string, type: string) => {
    return new Promise(async function(resolve, reject) {
      if (!value) {
        resolve([]);
      } else {
        try {
          let key;
          switch (type) {
            case 'earlyWarnPool':
              key = 'getEarlyWarnPools';
              break;
            case 'earlyWarnPlan':
              key = 'getEarlyWarnPlans';
              break;
          }
          const { code, msg, data } = await earlyWarningDetailsService[key]({
            name: value,
          });
          if (code === 200) {
            resolve(data);
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const getPage = () => {
    const title = parmes.sendDimension
      ? props.dimension.filter(item => {
          return parmes.sendDimension === item.code;
        })[0]
      : props.dimension[0];
    return (
      <Form.Item
        labelCol={{ span: 6 }}
        label={title ? title.message : ''}
        name="sendDimensionVal"
        rules={[{ required: true, message: requiredMsg }]}
      >
        <Select
          showSearch
          disabled={view}
          placeholder="请选择"
          style={{ width: 240 }}
          options={code}
          fieldNames={{ label: 'name', value: 'code', options: 'options' }}
          optionLabelProp="name"
          optionFilterProp="name"
          onChange={handleSearch}
        />
      </Form.Item>
    );
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="early-warning-email-left" style={{ width: '75%', textAlign: 'right' }}>
        <div id="early-warning-email-table" className="early-warning-email-table">
          <Loading loading={isLoading} isInherit={true}>
            <TableComponent
              bordered={true}
              columns={columns}
              size="small"
              rowSelection={{
                selectedRowKeys,
                ...rowSelection,
              }}
              dataSource={data}
              scroll={{ x: 1300, y: height }}
              pagination={false}
              rowKey={(record: any) => record.id}
            />
          </Loading>
        </div>
        <div className="early-warning-email-pagination">
          <Pagination
            total={pagination.total}
            currentPage={pagination.pageNo}
            pageSize={pagination.pageSize}
            pageSizeOptions={[30, 50, 100]}
            onChange={onChange}
          />
        </div>
      </div>
      <Modal
        title="邮件详情"
        width={800}
        centered={true}
        visible={isModalOpen}
        maskClosable={false}
        okText={'提交'}
        footer={view ? null : undefined}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          autoComplete="off"
          form={form}
          name="wrap"
          onValuesChange={onFormLayoutChange}
          // colon={false}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="发送维度:"
                name="sendDimension"
                rules={[{ required: true, message: requiredMsg }]}
              >
                <Select
                  placeholder="请选择"
                  style={{ width: 240 }}
                  onChange={getDimension}
                  disabled={view}
                  options={props.dimension?.map((item: any) => ({
                    value: item.code,
                    label: item.message,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>{getPage()}</Col>
          </Row>
          <Form.Item
            {...formItemLayout}
            label="收件人:"
            name="recipient"
            rules={[{ required: true, message: requiredMsg }]}
          >
            <Select
              showSearch
              // onSearch={handleSearch}
              disabled={!parmes.sendDimension || !parmes.sendDimensionVal || view}
              mode="multiple"
              placeholder="请输入"
              options={email}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="抄送:"
            name="carbonCopy"
            // rules={[{ required: true, message: requiredMsg }]}
          >
            <Select
              disabled={!parmes.sendDimension || !parmes.sendDimensionVal || view}
              mode="multiple"
              placeholder="请输入"
              options={email}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="邮件标题:"
            name="title"
            rules={[{ required: true, message: requiredMsg }]}
            getValueFromEvent={(e)=>{
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input disabled={view} placeholder="请输入" maxLength={50} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="邮件正文:"
            name="body"
            rules={[{ required: true, message: requiredMsg }]}
            getValueFromEvent={(e)=>{
              return e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            }}
          >
            <Input.TextArea disabled={view} placeholder="请输入" maxLength={4000} />
          </Form.Item>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="预警池:"
                name="warningPool"
                rules={[{ required: true, message: requiredMsg }]}
              >
                <Select
                  className="email-debounce-select"
                  placeholder="请查询"
                  allowClear
                  showSearch
                  disabled={view}
                  maxTagCount="responsive"
                  fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                  optionLabelProp="name"
                  optionFilterProp="name"
                  options={earlyWarnPoolsData}
                ></Select>
                {/* <DebounceSelect
                  key="warningPool"
                  ref={earlyWarnPoolRef}
                  showSearch
                  allowClear
                  className="email-debounce-select"
                  disabled={view}
                  maxTagCount="responsive"
                  placeholder="请查询"
                  fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                  optionLabelProp="name"
                  fetchOptions={(value: string) => fetSchemaList(value, 'earlyWarnPool')}
                  style={{ width: '100%' }}
                /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="预警方案:"
                name="warningScheme"
                rules={[{ required: true, message: requiredMsg }]}
              >
                <Select
                  key="warningScheme"
                  className="email-debounce-select"
                  placeholder="请查询"
                  allowClear
                  showSearch
                  disabled={view}
                  maxTagCount="responsive"
                  fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                  optionLabelProp="name"
                  optionFilterProp="name"
                  options={earlyWarnPlansData}
                ></Select>
                {/* <DebounceSelect
                  key="warningScheme"
                  ref={earlyWarnPlanRef}
                  showSearch
                  allowClear
                  className="email-debounce-select"
                  maxTagCount="responsive"
                  disabled={view}
                  placeholder="请查询"
                  fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                  optionLabelProp="name"
                  fetchOptions={(value: string) => fetSchemaList(value, 'earlyWarnPlan')}
                  style={{ width: '100%' }}
                /> */}
              </Form.Item>
            </Col>
          </Row>
          <div style={{ marginBottom: 15, fontSize: 12, color: '#999' }}>
            以下3个信用压力设置需要至少选择一个：
          </div>
          <Form.Item
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            label="本日信用压力(大于等于):"
            name="oneDay"
          >
            <Select
              placeholder="请选择"
              allowClear
              disabled={view}
              options={credit?.map((item: any) => ({ value: item.code, label: item.message }))}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            label="五日内信用压力(大于等于):"
            name="fiveDay"
          >
            <Select
              placeholder="请选择"
              allowClear
              disabled={view}
              options={credit?.map((item: any) => ({ value: item.code, label: item.message }))}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
            label="三十日内信用压力(大于等于):"
            name="thirtyDay"
          >
            <Select
              placeholder="请选择"
              allowClear
              disabled={view}
              options={credit?.map((item: any) => ({ value: item.code, label: item.message }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
});

export default Search;
