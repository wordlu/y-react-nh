import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Form, DatePicker, Select, Row, Col, Button, message, Space } from 'antd';
import moment from 'moment';
import { Loading } from '@lugia/lugia-web';

import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import DebounceSelect from '@/components/debounce-select';
import { Container } from '@/constant/style';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

import { financingRepurchaseService } from '@/config/di.config';

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

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    render: (text, record, index) => `${index+1}`
  },
  {
    title: '操作时间',
    dataIndex: 'pf',
    key: 'pf'
  },
  {
    title: '日志记录',
    dataIndex: 'indexName',
    key: 'indexName'
  },
  
];

const FinancingRepurchase: React.FC = () => {
  const [form] = Form.useForm();

  const [tableData, setTableData] = useState<any[] | null>(null);

  const [height, setHeight] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<any>({
    date: [],
    pfIds: [],
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState<any>({
    total: 0,
    pageNo: 1,
    pageSize: 30,
  });

  useEffect(() => {
    const heights = document.getElementById('financing-repurchase-container')?.offsetHeight;
    setHeight(heights ? heights - 200 + 'px' : null);
    getExchangeDay();
  }, []);

  // 获取交易日
  const getExchangeDay = async () => {
    try {
      const { code, data, msg } = await financingRepurchaseService.getExchangeDay({
        date: moment().format('YYYYMMDD'),
        count: -1,
      });
      if (code === 200) {
        const values = {
          date: data ? [moment(data).subtract(7, 'days'), moment(data)] : [],
          pfIds: [],
        };
        setFormValues(values);
        form.setFieldsValue(values);
        let pfIds;
        if (values.pfIds) {
          pfIds = values.pfIds?.map(item => ({ pfId: item?.value, pfName: item?.label }));
        }
        onSearch({
          startDate: moment(values.date[0] ? values.date[0] : undefined).format('YYYYMMDD'),
          endDate: moment(values.date[1] ? values.date[1] : undefined).format('YYYYMMDD'),
          pfIds,
          pageSize: pagination.pageSize,
          pageNo: pagination.pageNo,
        });
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 触发查询按钮
  const getFormValues = values => {
    setFormValues({ ...values });
    let pfIds;
    if (values.pfIds) {
      pfIds = values.pfIds?.map(item => ({ pfId: item?.value, pfName: item?.label }));
    }
    onSearch({
      startDate: moment(values.date[0] ? values.date[0] : undefined).format('YYYYMMDD'),
      endDate: moment(values.date[1] ? values.date[1] : undefined).format('YYYYMMDD'),
      pfIds,
      pageSize: pagination.pageSize,
      pageNo: pagination.pageNo,
    });
  };

  // 查询
  const onSearch = async params => {
    setLoading(true);
    try {
      const { data, code, msg, total } = await financingRepurchaseService.riskMonitoring(params);
      if (code === 200) {
        setTableData(data);
        setPagination({
          pageNo: params.pageNo,
          pageSize: params.pageSize,
          total,
        });
      } else {
        message.error(msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // 分页
  const onChange = (pageNo, pageSize) => {
    if (formValues.date) {
      setPagination({
        ...pagination,
        pageNo,
        pageSize,
      });

      let pfIds;
      if (formValues.pfIds) {
        pfIds = formValues.pfIds?.map(item => ({ pfId: item?.value, pfName: item?.label }));
      }

      onSearch({
        startDate: moment(formValues.date[0] ? formValues.date[0] : undefined).format('YYYYMMDD'),
        endDate: moment(formValues.date[1] ? formValues.date[1] : undefined).format('YYYYMMDD'),
        pfIds,
        pageNo,
        pageSize,
      });
    }
  };

  // 禁用日期
  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  // 组合模糊查询
  const fetchPfList = async (value: string): Promise<UserValue[]> => {
    return new Promise(async function(resolve, reject) {
      try {
        const {
          code,
          data,
          msg,
        } = await financingRepurchaseService.riskMonitoringFuzzySearchForPF({ pfName: value });
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

  // 导出
  const exportExcel = () => {
    if (!tableData?.length) {
      message.info('暂无数据可导出');
      return;
    }

    const data = objTransformFormDada({
      startDate: moment(formValues.date[0] ? formValues.date[0] : undefined).format('YYYYMMDD'),
      endDate: moment(formValues.date[1] ? formValues.date[1] : undefined).format('YYYYMMDD'),
      pfIds: JSON.stringify(formValues.pfIds),
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize,
    });

    financingRepurchaseService.riskMonitoringExportExcel(data);
    // downloadFile(
    //   {
    //     startDate: moment(formValues.date[0] ? formValues.date[0] : undefined).format('YYYYMMDD'),
    //     endDate: moment(formValues.date[1] ? formValues.date[1] : undefined).format('YYYYMMDD'),
    //     pfIds: formValues.pfIds,
    //     pageNo: pagination.pageNo,
    //     pageSize: pagination.pageSize,
    //   },
    //   '/flowabilityRiskManagement/riskMonitoringExportExcel'
    // );
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <div className='export'><Button type='text' className='export-log-btn'>日志导出</Button></div>
        <div className="financing-repurchase-container" id="financing-repurchase-container">
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
        <div className="financing-repurchase-pagination">
          <Pagination
            total={pagination.total}
            currentPage={pagination.pageNo}
            pageSize={pagination.pageSize}
            pageSizeOptions={pageSizeOptions}
            onChange={onChange}
          />
        </div>
      </Container>
    </ConfigProvider>
  );
};

export default FinancingRepurchase;
