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

import { base64toFile, downloadFile, objTransformFormDada, arrayIsEmpty } from '@/utils/helper';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};

type PickerType = 'month' | 'week';

const LiquidityExposure: React.FC = () => {
  const [form] = Form.useForm();

  const [option, setOption] = useState<any[] | null>(null);
  // const [selectValues, setSelectValues] = useState([]);
  const [selectValues, setSelectValues] = useState<null | string>(null);
  const [treeData, setTreeData] = useState<any[] | undefined>(undefined);

  const [checkedValues, setCheckedValues] = useState<any[]>([]);
  const [checkedNodes, setCheckedNodes] = useState({
    default: [],
    tabNodes: [],
  });

  // tree-复选值
  const [checkedData, setCheckedData] = useState<any>(null);

  // 最近交易日
  const [latestTradingDate, setLatestTradingDate] = useState<any>(null);

  // 查询tab数据
  const [exposureCount, setExposureCount] = useState<any[]>([]);

  // 活动的tab
  const [currentPfId, setCurrentPfId] = useState<any>({});

  const [height, setHeight] = useState<number>(0);
  const [type, setType] = useState<PickerType>('month');
  const [loading, setLoading] = useState<boolean>(false);
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

  // ctrl键盘
  const [isCtrl, setIsCtrl] = useState<boolean>(false);

  const tabRef = useRef();

  // 初始化是否请求
  const [isInit, setIsInit] = useState<boolean>(false);

  //更新tab数据
  const [tabCount, setTabCount] = useState<boolean>(false);

  // 初始化查询
  useEffect(() => {
    if (isInit) {
      onSearch({
        endDate: form.getFieldValue('endDate'),
        term: form.getFieldValue('term'),
        isInitialize: true,
      });
    }
  }, [isInit]);

  useEffect(() => {
    let treeKey = '';
    let checkedTreeLeaf = [];
    let checkedKeys = [];
    (async function() {
      try {
        const { code, msg, data } = await financingRepurchaseService.getMarkPfTree();
        if (code === 200) {
          if (data.treeKey) treeKey = data.treeKey;
          if (data.checkedTreeLeaf) checkedTreeLeaf = data.checkedTreeLeaf;
          if (data.checkedKeys) checkedKeys = data.checkedKeys;
        }
      } catch (err) {
        console.log(err);
      } finally {
        (async function() {
          try {
            const { code, msg, data } = await financingRepurchaseService.getPFTreeDownList();
            if (code === 200) {
              setOption(data);
              if (data?.length) {
                treeKey = treeKey ? treeKey : data[0].key;
                setSelectValues(treeKey);
                checkedTreeLeaf?.length && setCheckedData(checkedTreeLeaf);
                checkedKeys?.length && setCheckedValues(checkedKeys);

                // const treeKeyData = JSON.parse(localStorage.getItem('liquidityExposure') || '{}');
                // handleSelectSearch(treeKeyData, data[0].key);
                handleSelectSearch({}, treeKey, true);
              }
            } else {
              message.error(msg);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }
    })();

    (async function() {
      try {
        const { code, msg, data } = await financingRepurchaseService.getExchangeDay({
          day: moment().format('YYYYMMDD'),
          count: -1,
        });
        // console.log(88888, data);

        if (code === 200) {
          setLatestTradingDate(moment(data, 'YYYY-MM-DD'));
          form.resetFields();
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    setHeight(document.getElementById('tree')?.offsetHeight || 0);
  }, []);

  // tree 键盘事件
  useEffect(() => {
    const onKeyDown = e => {
      // console.log(2222, e, '我按下了down');
      if (e.keyCode === 17) {
        setIsCtrl(true);
      }
    };

    const onKeyUp = e => {
      // console.log(33333, e, '我弹起了up');
      if (e.keyCode === 17) {
        setIsCtrl(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return function() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // 组合树类型选择
  const handleSelect = v => {
    // console.log(v);
    // if (v.length > 2) {
    //   v.pop();
    //   message.info('最多选择两个组合');
    // }
    setSelectValues(v);
  };

  // 组合树类型查询
  const handleSelectSearch = async (value?: any, key?: string, init?: any) => {
    setLoading(true);
    // setCheckedValues([]);
    setTreeData([]);
    try {
      const { code, msg, data } = await financingRepurchaseService.getPFTree({
        key: key ? key : selectValues,
      });
      if (code === 200) {
        if (data) {
          const fn = array => {
            if (!array || !array.length) return;
            array.forEach(item => {
              item.icon = item.isPF ? <FileOutlined /> : <FolderOpenOutlined />;
              if (item.children && item.children.length) {
                fn(item.children);
              }
            });
          };
          await fn(data);
          setTreeData(data);
          // value?.checkedValues && setCheckedValues(value.checkedValues);
          // value?.checkedData && setCheckedData(value.checkedData);
          if (init) {
            setIsInit(true);
          }
        }
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // const onCheck = (checkedKeys, e) => {
  //   console.log(4444, checkedKeys, e, checkStrictly);
  //   setCheckedValues(checkedKeys.checked);
  //   setCheckedNodes({
  //     ...checkedNodes,
  //     default: e.checkedNodes,
  //   });
  // };

  // // 树-复选
  // const onCheck = (checkedKeys, e) => {
  //   // console.log(4444, checkedKeys, e, isCtrl);
  //   setCheckedData(e.checkedNodes);
  //   setCheckedValues(checkedKeys?.checked ? checkedKeys.checked : checkedKeys);
  // };

  const deepChecked = (treeLeaf: any[], treeKeys: any[], node: any, checked: boolean) => {
    // 上次选中-> 取消父节点选中，所有孩子取消选中
    // 所有孩子取消选中-> (找下孩子在keys和leaf是否存在，存在-> keys,leaf中删除)

    // 没选中-> 选中父节点、所有孩子
    // 所有孩子全部选中-> 孩子不在keys中push，存在的话不执行push
    const i = treeKeys.indexOf(node.key);
    if (checked) {
      i > -1 && treeKeys.splice(i, 1);
      i > -1 && treeLeaf.splice(i, 1);
    } else {
      i === -1 && treeKeys.push(node.key);
      i === -1 && treeLeaf.push(node);
    }

    if (!arrayIsEmpty(node?.children)) {
      node.children.forEach(item => {
        deepChecked(treeLeaf, treeKeys, item, checked);
      });
    }
  };

  // 点击树复选框
  const onCheck = (keys: any, e: any) => {
    let treeLeaf = checkedData;
    let treeKeys = checkedValues;

    if (isCtrl) {
      deepChecked(treeLeaf, treeKeys, e.node, !!e.node.checked);
    } else {
      treeKeys = keys.checked;
      treeLeaf = e.checkedNodes;
    }

    setCheckedValues([...treeKeys]);
    setCheckedData([...treeLeaf]);
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
    const pfIds = checkedData
      ?.map(item => {
        if (item.pfId) {
          return { pfId: item.pfId, pfName: item.title };
        } else {
          return undefined;
        }
      })
      ?.filter(item => item);

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
        // console.log(tabCount);
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
    try {
      const { code, msg, data } = await financingRepurchaseService.saveMarkPfTree({
        treeId: selectValues,
        pfIdList: pfIds,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 获取组合树用户勾选记录
  const getMarkPfTree = async () => {
    try {
      const { code, msg, data } = await financingRepurchaseService.getMarkPfTree({
        treeId: selectValues,
      });
      if (code === 200) {
        if (data?.checkedTreeLeaf) setCheckedData(data.checkedTreeLeaf);
        if (data?.checkedKeys) setCheckedValues(data.checkedKeys);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 组合树查询
  const treeSearch = value => {
    setCheckedValues([]);
    setCheckedData([]);

    handleSelectSearch(value);
    getMarkPfTree();
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

  // 树快速检索相关逻辑
  // -------------------------------------------------------------------------------------------------------
  // const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  // const [autoExpandParent, setAutoExpandParent] = useState(true);
  // const [dataList, setDataList] = useState([]);

  // useEffect(() => {
  //   const keyList = [];
  //   const generateList = data => {
  //     for (let i = 0; i < data.length; i++) {
  //       const node = data[i];
  //       const { key, title } = node;
  //       keyList.push({ key, title: title });

  //       if (node.children) {
  //         generateList(node.children);
  //       } else {
  //         setDataList(keyList);
  //       }
  //     }
  //   };
  //   if (treeData) generateList(treeData);
  // }, [treeData]);

  // const getParentKey = (key, tree) => {
  //   let parentKey: React.Key;
  //   for (let i = 0; i < tree.length; i++) {
  //     const node = tree[i];
  //     if (node.children) {
  //       if (node.children.some(item => item.key === key)) {
  //         parentKey = node.key;
  //       } else if (getParentKey(key, node.children)) {
  //         parentKey = getParentKey(key, node.children);
  //       }
  //     }
  //   }
  //   return parentKey!;
  // };

  // const onExpand = (newExpandedKeys: React.Key[]) => {
  //   setExpandedKeys(newExpandedKeys);
  //   setAutoExpandParent(false);
  // };

  // // 树快速检索
  // const handleSearchTree = e => {
  //   const { value } = e.target;
  //   const newExpandedKeys = dataList
  //     ?.map(item => {
  //       if (item.title.indexOf(value) > -1) {
  //         return getParentKey(item.key, treeData);
  //       }
  //       return null;
  //     })
  //     .filter((item, i, self) => item && self.indexOf(item) === i);
  //   setExpandedKeys(newExpandedKeys as React.Key[]);
  //   setAutoExpandParent(true);
  // };
  // ---------------------------------------------------------------------------------------------------

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <LeftContainer>
          <SelectContainer>
            <Select
              placeholder="组合树类型"
              // mode="multiple"
              // maxTagCount="responsive"
              allowClear
              size="small"
              value={selectValues}
              onChange={handleSelect}
            >
              {option?.map(item => (
                <Select.Option key={item.key} children={item.title} value={item.key} />
              ))}
            </Select>
            <Button
              type="primary"
              // disabled={!selectValues.length}
              disabled={!selectValues}
              size="small"
              icon={<SearchOutlined />}
              onClick={treeSearch}
            ></Button>
          </SelectContainer>
          {/* <SearchContainer>
            <Input.Search placeholder="快速检索" onChange={handleSearchTree} size="small" />
          </SearchContainer> */}

          <TreeContainer id="tree">
            <Loading loading={loading} isInherit={true}>
              {treeData?.length ? (
                <Tree
                  checkable
                  // multiple
                  showIcon
                  // checkStrictly={!isCtrl}
                  checkStrictly={true}
                  selectable={false}
                  defaultExpandAll
                  // defaultExpandedKeys={['0-0-0', '0-0-1']}
                  // defaultSelectedKeys={['0-0-0', '0-0-1']}
                  // defaultCheckedKeys={['0-0-0', '0-0-1']}
                  // onSelect={onSelect}
                  checkedKeys={checkedValues}
                  onCheck={onCheck}
                  autoExpandParent={true}
                  treeData={treeData}
                  // height={height}
                  className="tree"
                  // expandedKeys={expandedKeys}
                  // onExpand={onExpand}
                  // autoExpandParent={autoExpandParent}
                />
              ) : (
                <EmptyContainer>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </EmptyContainer>
              )}
            </Loading>
          </TreeContainer>
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
