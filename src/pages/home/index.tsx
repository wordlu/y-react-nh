import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, message } from 'antd';
import moment from 'moment';
import { Loading } from '@lugia/lugia-web';

import TableComponent from '@/components/table';
import Pagination from '@/components/pagination';
import { earlyWarningDetailsService, earlyWarningProgramService } from '@/config/di.config';

import { Container } from '@/constant/style';

import { PaginationContainer, TableContainer } from './style';

const pageSizeOptions = [30, 50, 100];

const EarlyWarningDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [height, setHeight] = useState(0);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 30,
  });

  const [bizdictData, setBizdictData] = useState([]);

  const [formData, setFormData] = useState({
    searchDate: moment().subtract(1, 'days'),
    earlyWarnPlan: '',
  });

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'comName',
      key: 'comName',
      width: 120,
      ellipsis: true,
      showSorterTooltip: true,
      sorter: (a, b) => a.comName.localeCompare(b.comName), // 中文排序
    },
    {
      title: 'Logistic值',
      dataIndex: 'logistic',
      key: 'logistic',
      width: 80,
      align: 'right',
      // ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: 'Z-score',
      dataIndex: 'zScore',
      key: 'zScore',
      width: 60,
      align: 'right',
      // ellipsis: true,
      // showSorterTooltip: false,
      // sorter: (a, b) => a.name.localeCompare(b.name), // 中文排序
    },
    {
      title: '是否价格预警',
      dataIndex: 'priceStatus',
      key: 'priceStatus',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        const data = bizdictData?.filter(item => item.code === text) || [];
        return data.length ? data[0].name : '';
      },
    },
    {
      title: '是否舆情预警',
      dataIndex: 'opinionsStatus',
      key: 'opinionsStatus',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        const data = bizdictData?.filter(item => item.code === text) || [];
        return data.length ? data[0].name : '';
      },
    },
    {
      title: '外部评级',
      dataIndex: 'rateLevel',
      key: 'rateLevel',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
      // sorter: (a, b) => a.externalGradeLevel - b.externalGradeLevel, // 数字排序
    },
    {
      title: '本日信用压力',
      dataIndex: 'crsScoreName',
      key: 'crsScoreName',
      width: 100,
      showSorterTooltip: false,
      // sorter: (a, b) => a.gradeOrgan.localeCompare(b.gradeOrgan),
    },
    {
      title: '五日内信用压力',
      dataIndex: 'crsScore5DName',
      key: 'crsScore5DName',
      width: 120,
    },
    {
      title: '三十日内信用压力',
      dataIndex: 'crsScore30DName',
      key: 'crsScore30DName',
      width: 120,
    },
    {
      title: '是否持仓',
      dataIndex: 'positionStatus',
      key: 'positionStatus',
      width: 100,
      // align: 'center',
      render: (text: any, record: any) => (text === '01' ? <span>是</span> : <span>否</span>),
    },
  ];

  useEffect(() => {
    const tableHeight = document.getElementById('home-table-container')?.offsetHeight;
    setHeight(tableHeight ? tableHeight - 40 : 400);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          code,
          msg,
          earlyWarnCaseId,
          earlyWarnCaseName,
        } = await earlyWarningProgramService.getDetails({
          earlyWarnCaseId: '',
        });
        if (code === 200 && earlyWarnCaseId) {
          setFormData({
            ...formData,
            earlyWarnPlan: earlyWarnCaseId,
          });
          handleSearch({
            ...formData,
            earlyWarnPlan: earlyWarnCaseId,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    const getBizdict = async () => {
      try {
        const { code, data, msg } = await earlyWarningDetailsService.bizdictPosition();
        if (code === 200) {
          setBizdictData(data || []);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getBizdict();
  }, []);

  const onChange = async (page, pageSize) => {
    setPagination({
      pageNo: page,
      pageSize,
    });

    handleSearch({
      pageNo: page,
      pageSize,
    });
  };

  const handleSearch = async params => {
    const obj = {
      searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format('YYYYMMDD'),
      earlyWarnPlan: params.earlyWarnPlan ? params.earlyWarnPlan : formData.earlyWarnPlan,
      pageNo: params.pageNo ? params.pageNo : pagination.pageNo,
      pageSize: params.pageSize ? params.pageSize : pagination.pageSize,
    };
    setLoading(true);
    try {
      const { code, msg, data, total } = await earlyWarningDetailsService.getSubjectDetailInfo(obj);
      if (code === 200) {
        setTableData(data || []);
        setTotal(total || 0);
      } else {
        setTableData([]);
        setTotal(0);
        message.error(msg);
      }
    } catch (err) {
      setTableData([]);
      setTotal(0);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <Container>
        <TableContainer id="home-table-container">
          <Loading loading={loading} isInherit={true}>
            <TableComponent
              bordered={true}
              columns={columns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: 'max-content', y: height }}
              size="small"
              rowKey={(record: any) => record.id}
            />
          </Loading>
        </TableContainer>
        <PaginationContainer>
          <Pagination
            total={total}
            currentPage={pagination.pageNo}
            pageSize={pagination.pageSize}
            pageSizeOptions={pageSizeOptions}
            onChange={onChange}
          />
        </PaginationContainer>
      </Container>
    </ConfigProvider>
  );
};

export default EarlyWarningDetails;
