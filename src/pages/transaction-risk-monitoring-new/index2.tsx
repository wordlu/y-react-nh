import React, { useEffect, useState, useRef, useCallback } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import {
  ConfigProvider,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Row,
  Col,
  Button,
  message,
  Tree,
  Space,
  Tabs,
  Empty,
  Input,
} from 'antd';
import { Loading } from '@lugia/lugia-web';
import { SearchOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

import TabContent from './components/tab-content';
import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import PFTree from '@/components/pf-tree';
import { financingRepurchaseService } from '@/config/di.config';

import {
  Container,
  LeftContainer,
  RightContainer,
  SelectContainer,
  SearchContainer,
  TreeContainer,
  FormContainer,
  MainContainer,
  EmptyContainer,
  TabContainer,
  TableContainer,
  PaginationContainer,
} from './style';
import './index.css';

import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { FlexWrapper } from '@/constant/style';
import { template } from 'lodash';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};

type PickerType = 'month' | 'week';

const pageSizeOptions = [30, 50, 100];

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 90,
    align: 'center',
    // ellipsis: true,
    // showSorterTooltip: false,
  },
  {
    title: '组合',
    dataIndex: 'pf',
    key: 'pf',
    width: 120,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'left',
  },
  {
    title: '指标',
    dataIndex: 'indexName',
    key: 'indexName',
    width: 120,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'left',
  },
  {
    title: '指标值',
    dataIndex: 'indexValue',
    key: 'indexValue',
    width: 100,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'right',
  },
  {
    title: '要求',
    dataIndex: 'requirement',
    key: 'requirement',
    width: 100,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'center',
  },
  {
    title: '债卷代码',
    dataIndex: 'bondCode',
    key: 'bondCode',
    ellipsis: true,
    showSorterTooltip: true,
    width: 100,
    align: 'center',
  },
  {
    title: '债卷名称',
    dataIndex: 'bondName',
    key: 'bondName',
    width: 100,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'center',
  },
  {
    title: '发行人',
    dataIndex: 'publisher',
    key: 'publisher',
    width: 120,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'left',
  },
  {
    title: '违规描述',
    dataIndex: 'violationDescription',
    key: 'violationDescription',
    ellipsis: true,
    showSorterTooltip: true,
    width: 180,
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

const LiquidityExposure: React.FC = () => {
  const [form] = Form.useForm();

  const [selectValues, setSelectValues] = useState<null | string>(null);

  // 最近交易日
  const [latestTradingDate, setLatestTradingDate] = useState<any>(null);

  // 日期
  const [date, setDate] = useState<any[]>([]);

  // 查询tab数据
  const [exposureCount, setExposureCount] = useState<any[]>([]);

  // 活动的tab
  const [currentPfId, setCurrentPfId] = useState<string | undefined>(undefined);

  const [height, setHeight] = useState<number>(0);
  const [type, setType] = useState<PickerType>('month');

  // const [isShowTab, setIsShowTab] = useState(false);
  const [data, setData] = useState({
    // 回购明细表
    repurchaseList: [],
    // 流动性日历表
    flowabilityCalendarList: [],
    // 流动性日历图
    flowabilityCalendarChart: [],
  });
  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [checkStrictly, setCheckStrictly] = useState(true);

  const tabRef = useRef();

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);

  const [tableHeight, setTableHeight] = useState<number>(0);

  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });

  const treeRef = useRef(null);

  useEffect(() => {
    (async function() {
      try {
        const { code, msg, data } = await financingRepurchaseService.getExchangeDay({
          day: moment().format('YYYYMMDD'),
          count: -1,
        });
        // console.log(88888, data);

        if (code === 200) {
          setLatestTradingDate(moment(data, 'YYYY-MM-DD'));
          const dateArr = data ? [moment(data).subtract(7, 'days'), moment(data)] : [];
          setDate(dateArr);
          form.resetFields();
          onSearch({
            pageNo: pagination.pageNo,
            pageSize: pagination.pageSize,
            date: dateArr,
          });
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    setHeight(document.getElementById('tree')?.offsetHeight || 0);
    const heights = document.getElementById('transaction-risk-monitoring-new-container')
      ?.offsetHeight;
    setTableHeight(heights ? heights - 40 : 0);
  }, []);

  const handleTermSelect = v => {
    // console.log(v);
    setType(v);
  };

  // 禁用日期
  const disabledDate = current => {
    return current && current > moment(latestTradingDate);
  };

  // 点击查询按钮
  const onFinish = values => {
    // if (!checkedValues.length) {
    //   message.error('请求参数缺失.请勾选组合.');
    //   return;
    // }
    setDate(values.date);

    // localStorage.setItem('liquidityExposure', JSON.stringify({ checkedValues, checkedData }));

    onSearch({
      ...values,
      pageSize: pagination.pageSize,
      pageNo: 1,
    });
  };

  // 查询
  const onSearch = async values => {
    const pfIds: any[] = [];

    if (treeRef.current && treeRef.current?.checkedNodes) {
      treeRef.current.checkedNodes?.forEach(item => {
        if (item.pfId) {
          // @/componnets/tree/index.tsx
          // pfIds.push({ pfId: item.pfId, pfName: item.title });

          // antd 快速检索版本 @/components/tree/index1.tsx
          pfIds.push({ pfId: item.pfId, pfName: item.title1 || item.title });
        }
      });
    }

    const params = {
      startDate: moment(values.date[0] ? values.date[0] : undefined).format('YYYYMMDD'),
      endDate: moment(values.date[1] ? values.date[1] : undefined).format('YYYYMMDD'),
      pfIds,
      pageSize: values.pageSize ? values.pageSize : pagination.pageSize,
      pageNo: values.pageNo ? values.pageNo : pagination.pageNo,
    };

    setTableData([]);

    // console.log(22222, params);
    try {
      setTableLoading(true);
      const { code, msg, data, total } = await financingRepurchaseService.riskMonitoring(params);
      if (code === 200) {
        setTableData(data || []);
        setPagination({
          pageNo: params.pageNo,
          pageSize: params.pageSize,
          total,
        });
        // saveMarkPfTree(params.pfIds);
        // setExposureCount(data || []);
        // data?.length && setCurrentPfId(data[0].pfId);
        // if (tabRef?.current && tabRef.current.handleClickFold) {
        //   tabRef.current.handleClickFold();
        // }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTableLoading(false);
    }
  };

  const handleChangeTab = key => {
    // console.log('------tab-----', key);
    setCurrentPfId(key);

    // const obj = {
    //   tabName: '组合一',
    //   repurchaseList: [
    //     {
    //       id: 1,
    //       delyDate: '20220830',
    //       kind: '回购种类一号',
    //       inTerm: '1M',
    //       inInterestRate: '5',
    //       inDayStock: '5000000.00',
    //       outTerm: '1M',
    //       outInterestRate: '5',
    //       outDayStock: '5000000.00',
    //     },
    //     {
    //       id: 2,
    //       delyDate: '20220831',
    //       kind: '回购种类二号',
    //       inTerm: '1M',
    //       inInterestRate: '5',
    //       inDayStock: '5000000.00',
    //       outTerm: '1M',
    //       outInterestRate: '5',
    //       outDayStock: '5000000.00',
    //     },
    //   ],
    //   flowabilityCalendarList: [
    //     {
    //       date: '20220810',
    //       netting: '100',
    //       bankInDate: '1',
    //       bankOutDate: '1',
    //       bankNetting: '2',
    //       shInDate: '2',
    //       shOutDate: '2',
    //       shNetting: '2',
    //       szInDate: '3',
    //       szOutDate: '3',
    //       szNetting: '3',
    //     },
    //     {
    //       date: '20220812',
    //       netting: '-19',
    //       bankInDate: '1',
    //       bankOutDate: '1',
    //       bankNetting: '2',
    //       shInDate: '2',
    //       shOutDate: '2',
    //       shNetting: '2',
    //       szInDate: '3',
    //       szOutDate: '3',
    //       szNetting: '3',
    //     },
    //   ],
    //   flowabilityCalendarChart: [
    //     {
    //       date: '20220810',
    //       netting: '100',
    //     },
    //     {
    //       date: '20220812',
    //       netting: '-19',
    //     },
    //   ],
    // };
    // setTabLoading(true);
    // try {
    //   setData(obj);
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setTimeout(() => {
    //     setTabLoading(false);
    //   }, 2000);
    // }
  };

  const downLoadCurrentFile = url => {
    let file = null;
    if (url) {
      file = base64toFile(url);
    }

    // console.log(99999, file, currentPfId);

    const params = {
      data: JSON.stringify({
        pfIds: [currentPfId],
        endDate: moment(form.getFieldValue('endDate')).format('YYYYMMDD'),
        term: form.getFieldValue('term'),
      }),
    };

    if (file) params.file = file;
    // console.log(66666, params);
    const data = objTransformFormDada(params);
    // console.log(data);
    financingRepurchaseService.riskMonitoringExportExcel(data);
  };

  // 分页
  const onChange = (pageNo, pageSize) => {
    setPagination({
      ...pagination,
      pageNo,
      pageSize,
    });
    onSearch({
      pageNo,
      pageSize,
      date,
    });
  };

  const handleExport = () => {
    if (!tableData.length) {
      message.info('暂无数据可导出');
      return;
    }
    if (date?.length && date?.length === 2) {
      const data = objTransformFormDada({
        startDate: moment(date[0] ? date[0] : moment()).format('YYYYMMDD'),
        endDate: moment(date[1] ? date[1] : moment()).format('YYYYMMDD'),
        list: JSON.stringify(tableData),
      });

      financingRepurchaseService.riskMonitoringExportExcel(data);
    }
  };

  // 组合树保存用户勾选记录
  const saveMarkPfTree = async pfIds => {
    try {
      const { code, msg, data } = await financingRepurchaseService.saveMarkPfTree({
        treeId: selectValues,
        pfIdList: pfIds,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <LeftContainer>
          <PFTree ref={treeRef} isMark={false} />
        </LeftContainer>
        <RightContainer>
          <FormContainer>
            <Form layout={'inline'} form={form} initialValues={{ date }} onFinish={onFinish}>
              <Form.Item
                label="起止日期"
                name="date"
                rules={[
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  size="small"
                  style={{ width: 250 }}
                  // disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item className="liquidity-exposure-btn">
                <Space>
                  <Button type="primary" size="small" htmlType="submit">
                    查询
                  </Button>
                  <Button type="primary" size="small" onClick={handleExport}>
                    导出
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </FormContainer>
          <TableContainer id="transaction-risk-monitoring-new-container">
            <Loading loading={tableLoading} isInherit={true}>
              <TableComponent
                bordered={true}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
                scroll={{ x: '100%', y: tableHeight }}
                size="small"
                // loading={loading}
                rowKey={(record: any) => record.id}
              />
            </Loading>
          </TableContainer>
          <PaginationContainer>
            <Pagination
              total={pagination.total}
              currentPage={pagination.pageNo}
              pageSize={pagination.pageSize}
              pageSizeOptions={pageSizeOptions}
              onChange={onChange}
            />
          </PaginationContainer>
        </RightContainer>
      </Container>
    </ConfigProvider>
  );
};

export default LiquidityExposure;
