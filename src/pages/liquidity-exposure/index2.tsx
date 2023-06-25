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
} from './style';
import './index.css';

import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};

type PickerType = 'month' | 'week';

const LiquidityExposure: React.FC = () => {
  const [form] = Form.useForm();

  // 最近交易日
  const [latestTradingDate, setLatestTradingDate] = useState<any>(null);

  // 查询tab数据
  const [exposureCount, setExposureCount] = useState<any[]>([]);

  // 活动的tab
  const [currentPfId, setCurrentPfId] = useState<any>({});

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
  const [tabLoading, setTabLoading] = useState<boolean>(false);

  const [checkStrictly, setCheckStrictly] = useState(true);

  const tabRef = useRef();

  //更新tab数据
  const [tabCount, setTabCount] = useState<boolean>(false);

  const treeRef = useRef(null);

  const [isInitGetMark, setIsInitGetMark] = useState(false);
  const [isInitGetDefaultFormValue, setIsInitGetDefaultFormValue] = useState(false);

  // 页面初始化查询表格
  useEffect(() => {
    if (isInitGetMark && isInitGetDefaultFormValue) {
      onSearch({
        endDate: form.getFieldValue('endDate'),
        term: form.getFieldValue('term'),
        isInitialize: true,
      });
    }
  }, [isInitGetMark, isInitGetDefaultFormValue]);

  // 初始化查询
  const onInitGetMark = isInitGetMark => {
    setIsInitGetMark(isInitGetMark);
  };

  useEffect(() => {
    getExchangeDay();

    setHeight(document.getElementById('tree')?.offsetHeight || 0);
  }, []);

  // 获取期限
  const getExchangeDay = async () => {
    try {
      const { code, msg, data } = await financingRepurchaseService.getExchangeDay({
        day: moment().format('YYYYMMDD'),
        count: -1,
      });
      // console.log(88888, data);

      if (code === 200) {
        setLatestTradingDate(moment(data, 'YYYY-MM-DD'));
        form.resetFields();
        setIsInitGetDefaultFormValue(true);
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTermSelect = v => {
    // console.log(v);
    setType(v);
  };

  // 禁用日期
  const disabledDate = current => {
    return current && current > moment(latestTradingDate);
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

    if (!pfIds?.length) {
      if (!values.isInitialize) {
        message.error('请求参数缺失.请勾选组合.');
      }
      return;
    } else if (pfIds?.length > 10) {
      if (!values.isInitialize) {
        message.error('最多可选10个组合，请重新勾选');
      }
      return;
    } else if (!values?.endDate || !values?.term) {
      if (!values.isInitialize) {
        message.error('请求参数缺失.请选择截止日期或期限');
      }
      return;
    }

    const params = {
      pfIds,
      endDate: moment(values.endDate).format('YYYYMMDD'),
      term: values.term,
    };

    try {
      setTabLoading(true);
      setExposureCount([]);
      setCurrentPfId({});
      const { code, msg, data } = await financingRepurchaseService.exposureCount(params);
      if (code === 200) {
        setExposureCount(data || []);
        // setIsShowTab(true);
        data?.length && setCurrentPfId({ pfId: data[0].pfId, pfName: data[0].tabName });
        if (tabRef?.current && tabRef.current.handleClickFold) {
          tabRef.current.handleClickFold();
        }
        saveMarkPfTree(pfIds);
        if (tabCount) {
          setTabCount(false);
        } else {
          setTabCount(true);
        }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTabLoading(false);
    }
  };

  // 组合树保存用户勾选记录
  const saveMarkPfTree = async pfIds => {
    let treeId = '';
    if (treeRef.current && treeRef.current?.treeId) {
      treeId = treeRef.current?.treeId;
    }

    try {
      const { code, msg, data } = await financingRepurchaseService.saveMarkPfTree({
        treeId,
        pfIdList: pfIds,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeTab = key => {
    const currentPf = exposureCount?.filter(item => item.pfId === key);
    if (currentPf?.length) {
      setCurrentPfId({
        pfId: key,
        pfName: currentPf[0].tabName,
      });
    }

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
    financingRepurchaseService.exposureCountExportExcel(data);
  };

  const handleExport = () => {
    // const endDate = form.getFieldValue('endDate');
    // const term = form.getFieldValue('term');
    // if (!(currentPfId && endDate && term)) return;
    if (!exposureCount?.length) {
      message.info('暂无数据可导出');
      return;
    }
    if (tabRef?.current && tabRef.current.saveImage) {
      tabRef.current.saveImage();
    } else {
      downLoadCurrentFile(null);
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <LeftContainer>
          <PFTree ref={treeRef} isMark={true} onInitGetMark={onInitGetMark} />
        </LeftContainer>
        <RightContainer>
          <FormContainer>
            <Form
              form={form}
              // {...layout}
              layout={'inline'}
              initialValues={{ endDate: latestTradingDate, term: 'month' }}
              onFinish={onSearch}
            >
              <Form.Item
                label="截止日期"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]}
              >
                <DatePicker
                // disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                label="期限"
                name="term"
                rules={[
                  {
                    required: true,
                    message: '不能为空!',
                  },
                ]}
              >
                <Select size="small" onChange={handleTermSelect}>
                  <Select.Option value="month">月</Select.Option>
                  <Select.Option value="week">周</Select.Option>
                </Select>
                {/* <Space>
                  <Select size="small" defaultValue={'month'} onChange={handleTermSelect}>
                    <Select.Option value="month">月</Select.Option>
                    <Select.Option value="week">周</Select.Option>
                  </Select>
                  <Form.Item name="term" noStyle>
                    <DatePicker picker={type} />
                  </Form.Item>
                </Space> */}
              </Form.Item>
              <Form.Item className="liquidity-exposure-btn">
                <Space>
                  <Button size="small" type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button size="small" type="primary" onClick={handleExport}>
                    导出
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </FormContainer>
          {/* {isShowTab && (
            <Tabs
              defaultActiveKey={checkedNodes.tabNodes[0]?.key}
              style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}
              size="small"
              onChange={handleChangeTab}
            >
              {checkedNodes.tabNodes?.map(item => (
                <Tabs.TabPane tab={item.title} key={item.key}>
                  <Loading loading={tabLoading} isInherit={true}>
                    <TabContent key={item.key} id={item.key} data={data} />
                  </Loading>
                </Tabs.TabPane>
              ))}
            </Tabs>
          )} */}
          <TabContainer>
            <Loading loading={tabLoading} isInherit={true}>
              <div style={{ display: 'flex', height: '100%' }}>
                {exposureCount.length ? (
                  <Tabs
                    // defaultActiveKey={currentPfId}
                    activeKey={currentPfId?.pfId}
                    style={{ flex: 1, overflow: 'hidden' }}
                    size="small"
                    destroyInactiveTabPane={true}
                    onChange={handleChangeTab}
                  >
                    {exposureCount.map(item => (
                      <Tabs.TabPane
                        style={{ overflowY: 'auto', overflowX: 'hidden' }}
                        tab={item.tabName}
                        key={item.pfId}
                      >
                        {/* <Loading loading={tabLoading} isInherit={true}> */}
                        <TabContent
                          ref={tabRef}
                          key={item.pfId}
                          id={item.pfId}
                          data={item?.list}
                          getUrl={url => downLoadCurrentFile(url)}
                          tabCount={tabCount}
                        />
                        {/* </Loading> */}
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                ) : (
                  <EmptyContainer>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </EmptyContainer>
                )}
              </div>
            </Loading>
          </TabContainer>
        </RightContainer>
      </Container>
    </ConfigProvider>
  );
};

export default LiquidityExposure;
