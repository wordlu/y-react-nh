import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'antd';
import { Loading } from '@lugia/lugia-web';
import { SearchOutlined, FolderOpenOutlined, FileOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

import { financingRepurchaseService, bizdictService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada, format } from '@/utils/helper';

import {
  Container,
  LeftContainer,
  RightContainer,
  SelectContainer,
  TreeContainer,
  MainContainer,
  EmptyContainer,
  TabContainer,
} from '@/pages/liquidity-exposure/style';

import { FormContainer, ButtonContainer, TableContainer } from './style';

import DebounceSelect from '@/components/debounce-select';
import TableComponent from '@/components/table';
import PFTree from '@/components/pf-tree';
import { headers } from './header';

import '@/pages/liquidity-exposure/index.css';

interface UserValue {
  label: string;
  value: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const columns = [
  {
    title: '日期',
    dataIndex: 'bizDate',
    key: 'bizDate',
    width: 100,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'center',
    // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
  },
  {
    title: '测算场景',
    dataIndex: 'schemaName',
    key: 'schemaName',
    width: 120,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'left',
  },
  {
    title: '组合',
    dataIndex: 'pfName',
    key: 'pfName',
    width: 100,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'left',
  },
  {
    title: '未到期正回购余额(万元)',
    dataIndex: 'undueRepBalance',
    key: 'undueRepBalance',
    width: 150,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
    // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
  },
  {
    title: '标准券金额(万元)',
    dataIndex: 'stdSecValue',
    key: 'stdSecValue',
    ellipsis: true,
    showSorterTooltip: true,
    width: 130,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '压力测算缺口(万元)',
    dataIndex: 'gap',
    key: 'gap',
    width: 150,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '高流动性资产(万元)',
    dataIndex: 'topLiquidAsset',
    key: 'topLiquidAsset',
    width: 150,
    ellipsis: true,
    showSorterTooltip: true,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '压测后高流动性资产(万元)',
    dataIndex: 'sTopLiquidAsset',
    key: 'sTopLiquidAsset',
    ellipsis: true,
    showSorterTooltip: true,
    width: 170,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '一般流动性资产(万元)',
    dataIndex: 'liquidAsset',
    key: 'liquidAsset',
    ellipsis: true,
    showSorterTooltip: true,
    width: 150,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '压测后一般流动性资产(万元)',
    dataIndex: 'sLiquidAsset',
    key: 'sLiquidAsset',
    ellipsis: true,
    showSorterTooltip: true,
    width: 170,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '低流动性资产(万元)',
    dataIndex: 'lowLiquidAsset',
    key: 'lowLiquidAsset',
    ellipsis: true,
    showSorterTooltip: true,
    width: 150,
    align: 'right',
    // render: (text, record) => <p style={{ textAlign: 'right' }}>{format(text)}</p>,
  },
  {
    title: '抗压级别',
    dataIndex: 'levelName',
    key: 'levelName',
    ellipsis: true,
    showSorterTooltip: true,
    width: 100,
    align: 'center',
  },
];

const StressTesting: React.FC = () => {
  const [form] = Form.useForm();

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [height, setHeight] = useState<number>(0);
  const [tableHeight, setTableHeight] = useState<number>(0);

  // 最近交易日
  const [latestTradingDate, setLatestTradingDate] = useState<any>(null);

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);

  // 活动的tab
  const [currentPfId, setCurrentPfId] = useState<string | undefined>(undefined);

  // 抗压级别
  const [levelOption, setLevelOption] = useState<any[]>([]);

  // 组合是否合并
  const [mergeStatusOption, setMergeStatusOption] = useState<any[]>([]);

  // 是否禁用查询按钮
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const tabRef = useRef();
  const treeRef = useRef();

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
          // form.resetFields();
          setTimeout(() => {
            form.setFieldsValue({
              endDate: moment(data, 'YYYY-MM-DD'),
              schemaId: '370573304634974208',
              mergeStatus: '02',
            });
          }, 1000);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    (async function() {
      try {
        // const { code, msg, data } = await financingRepurchaseService.dictQuery2();
        const { code, msg, data } = await bizdictService.subList({ dictCode: '800002' });

        if (code === 200) {
          setLevelOption(data);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    (async function() {
      try {
        // const { code, msg, data } = await financingRepurchaseService.dictQuery3();
        const { code, msg, data } = await bizdictService.subList({ dictCode: '800003' });

        if (code === 200) {
          setMergeStatusOption(data);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    setHeight(document.getElementById('tree')?.offsetHeight || 0);

    const heights = document.getElementById('stress-testing-container')?.offsetHeight;
    setTableHeight(heights ? heights - 40 : 0);
  }, []);

  // 禁用日期
  const disabledDate = current => {
    return current && current > moment(latestTradingDate);
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

  // 点击查询按钮
  const onFinish = values => {
    // if (!checkedValues?.length) {
    //   message.error('请求参数缺失.请勾选组合.');
    //   return;
    // }

    // let pfInfos = checkedData?.map(item => {
    //   if (item.isPF) {
    //     return {
    //       code: item.pfId,
    //       name: item.title,
    //     };
    //   }
    // });

    // pfInfos = pfInfos.filter(item => item);

    const pfInfos: any[] = [];
    const savePfIdList: any = [];

    if (treeRef.current && treeRef.current?.checkedNodes) {
      treeRef.current.checkedNodes?.forEach(item => {
        if (item.pfId) {
          // @/componnets/tree/index.tsx
          // pfInfos.push({ code: item.pfId, name: item.title });
          // savePfIdList.push({ pfId: item.pfId, pfName: item.title });

          // antd 快速检索版本 @/components/tree/index1.tsx
          pfInfos.push({ code: item.pfId, name: item.title1 || item.title });
          savePfIdList.push({ pfId: item.pfId, pfName: item.title1 || item.title });
        }
      });
    }

    if (!pfInfos?.length) {
      message.error('请求参数缺失.请勾选组合.');
      return;
    }

    if (pfInfos.length > 50) {
      message.info('页面组合限定最多选择50个');
      return;
    }

    // localStorage.setItem('stressTesting', JSON.stringify({ checkedValues, checkedData }));

    const params = {
      pfInfos,
      endDate: moment(values.endDate).format('YYYYMMDD'),
      schemaId: values.schemaId,
      level: values.level,
      mergeStatus: values.mergeStatus,
    };

    onSearch(params, savePfIdList);
  };

  // 查询表格
  const onSearch = useCallback(
    _.throttle(async (params, savePfIdList) => {
      try {
        setTableLoading(true);
        setIsDisabled(true);
        setTableData([]);
        const { code, msg, data } = await financingRepurchaseService.calculateList(params);
        if (code === 200) {
          if (data?.length) {
            const datas = data.map(item => ({
              ...item,
              undueRepBalance: format(item.undueRepBalance),
              stdSecValue: format(item.stdSecValue),
              gap: format(item.gap),
              topLiquidAsset: format(item.topLiquidAsset),
              sTopLiquidAsset: format(item.sTopLiquidAsset),
              liquidAsset: format(item.liquidAsset),
              sLiquidAsset: format(item.sLiquidAsset),
              lowLiquidAsset: format(item.lowLiquidAsset),
            }));
            setTableData(datas || []);
          } else {
            setTableData([]);
          }

          saveMarkPfTree(savePfIdList);
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setTableLoading(false);
        setIsDisabled(false);
      }
    }, 2000),
    [treeRef.current?.treeId, treeRef.current?.checkedNodes]
  );

  const handleExport = async () => {
    if (!tableData?.length) {
      message.info('暂无数据可导出');
      return;
    }
    let schemaName = '';
    try {
      const { code, data, msg } = await financingRepurchaseService.getSchemaList({
        schemaId: form.getFieldValue('schemaId'),
      });
      if (code === 200 && data?.length) {
        schemaName = data[0].name;
      } else {
        console.log(msg);
      }
    } catch (err) {
      console.log(err);
    }

    const name =
      '压力测试' +
      moment(form.getFieldValue('endDate') || moment()).format('YYYYMMDD') +
      schemaName;

    const sheets = [
      {
        name: name,
        title: name,
        params: {
          schemaName: schemaName,
        },
        header: headers,
        data: tableData,
      },
    ];
    // downloadFile(
    //   {
    //     data: JSON.stringify({
    //       filename: name + '.xls',
    //       sheets: sheets,
    //       data: tableData,
    //     }),
    //   },
    //   '/yapi/api/abcAnalysis/stress/calculate/download'
    // );
    const data = objTransformFormDada({
      data: JSON.stringify({
        filename: name + '.xls',
        sheets: sheets,
      }),
    });
    // console.log(77777, data);
    financingRepurchaseService.calculateDownload(data);
  };

  // 组合树保存用户勾选记录
  const saveMarkPfTree = async savePfIdList => {
    let treeId = '';
    if (treeRef.current && treeRef.current?.treeId) {
      treeId = treeRef.current?.treeId;
    }

    try {
      const { code, msg, data } = await financingRepurchaseService.saveMarkPfTree({
        treeId,
        pfIdList: savePfIdList,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <LeftContainer>
          <PFTree ref={treeRef} isMark={true} />
        </LeftContainer>
        <RightContainer>
          <FormContainer>
            <Form
              form={form}
              {...layout}
              // layout={'inline'}
              initialValues={{
                // endDate: latestTradingDate,
                // schemaId: '370573304634974208',
                // mergeStatus: '02',
              }}
              onFinish={onFinish}
            >
              <Row gutter={24}>
                <Col span={9}>
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
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="压力测试方案"
                    name="schemaId"
                    rules={[
                      {
                        required: true,
                        message: '不能为空!',
                      },
                    ]}
                  >
                    <DebounceSelect
                      // mode="multiple"
                      showSearch
                      allowClear
                      placeholder="请输入查询"
                      fieldNames={{ label: 'name', value: 'code', options: 'options' }}
                      optionLabelProp="name"
                      fetchOptions={fetSchemaList}
                      // maxTagCount="responsive"
                      style={{ width: '100%' }}
                      size="small"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={7}>
                  <Form.Item label="抗压级别" name="level">
                    <Select
                      placeholder="请选择"
                      mode="multiple"
                      maxTagCount="responsive"
                      allowClear
                      size="small"
                    >
                      {levelOption?.map(item => (
                        <Select.Option children={item.name} value={item.code} />
                      ))}
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>
              <Row gutter={24}>
                <Col span={9}>
                  <Form.Item label="抗压级别" name="level">
                    <Select
                      placeholder="请选择"
                      mode="multiple"
                      maxTagCount="responsive"
                      allowClear
                      size="small"
                    >
                      {levelOption?.map(item => (
                        <Select.Option children={item.dictItemName} value={item.dictItemCode} />
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="组合是否合并"
                    name="mergeStatus"
                    rules={[
                      {
                        required: true,
                        message: '不能为空!',
                      },
                    ]}
                  >
                    <Select
                      placeholder="请选择"
                      // mode="multiple"
                      // maxTagCount="responsive"
                      allowClear
                      size="small"
                    >
                      {mergeStatusOption?.map(item => (
                        <Select.Option children={item.dictItemName} value={item.dictItemCode} />
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col span={5}> */}
                <Form.Item className="liquidity-exposure-btn">
                  <Space size="middle">
                    <Button disabled={isDisabled} size="small" type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button size="small" type="primary" onClick={handleExport}>
                      导出
                    </Button>
                  </Space>
                </Form.Item>
                {/* </Col> */}
              </Row>
            </Form>
          </FormContainer>
          <TableContainer id="stress-testing-container">
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
        </RightContainer>
      </Container>
    </ConfigProvider>
  );
};

export default StressTesting;
