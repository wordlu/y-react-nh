import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import TableComponent from '@/components/table';

import {
  ChartContainer,
  BlockContainer,
  TitleContainer,
  ContentContainer,
  FoldText,
  Title,
} from './style';

const column = {
  repurchase: [
    {
      title: '日期',
      dataIndex: 'delyDate',
      key: 'delyDate',
      width: 90,
    },
    {
      title: '品种',
      dataIndex: 'kind',
      key: 'kind',
      width: 90,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '资金融入-期限',
      dataIndex: 'inTerm',
      key: 'inTerm',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '资金融入-利率',
      dataIndex: 'inInterestRate',
      key: 'inInterestRate',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '资金融入-日终存量',
      dataIndex: 'inDayStock',
      key: 'inDayStock',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '资金融出-期限',
      dataIndex: 'outTerm',
      key: 'outTerm',
      width: 100,
    },
    {
      title: '资金融出-利率',
      dataIndex: 'outInterestRate',
      key: 'outInterestRate',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '资金融出-日终存量',
      dataIndex: 'outDayStock',
      key: 'outDayStock',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
  ],
  flowabilityCalendar: [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 90,
    },
    {
      title: '总轧差',
      dataIndex: 'netting',
      key: 'netting',
      width: 90,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '银行间-融入到期',
      dataIndex: 'bankInDate',
      key: 'bankInDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '银行间-融出到期',
      dataIndex: 'bankOutDate',
      key: 'bankOutDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '银行间-轧差',
      dataIndex: 'bankNetting',
      key: 'bankNetting',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '上交所-融入到期',
      dataIndex: 'shInDate',
      key: 'shInDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '上交所-融出到期',
      dataIndex: 'shOutDate',
      key: 'shOutDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '上交所-轧差',
      dataIndex: 'shNetting',
      key: 'shNetting',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '深交所-融入到期',
      dataIndex: 'szInDate',
      key: 'szInDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '深交所-融出到期',
      dataIndex: 'szOutDate',
      key: 'szOutDate',
      width: 120,
      ellipsis: true,
      showSorterTooltip: false,
    },
    {
      title: '深交所-轧差',
      dataIndex: 'szNetting',
      key: 'szNetting',
      width: 100,
      ellipsis: true,
      showSorterTooltip: false,
    },
  ],
};

echarts.use([TitleComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

const TabContent = forwardRef(({ id, data, getUrl }, ref) => {
  const [chart, setChart] = useState(null);

  useImperativeHandle(ref, () => ({
    saveImage,
    handleClickFold,
  }));

  useEffect(() => {
    const chartDom = document.getElementById('chart' + id);
    const myChart = echarts.init(chartDom);

    let xAxisData = [];
    let yAxisData = [];
    if (data && data.flowabilityCalendarChart?.length) {
      data.flowabilityCalendarChart.forEach(item => {
        xAxisData.push(item.date);
        yAxisData.push(Number(item.netting));
      });
    }

    const option = {
      title: {
        text: '总轧差',
        // textVerticalAlign:'middle',
        textAlign: 'center',
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
        },
      },
      grid: {
        top: 50,
        bottom: xAxisData?.length > 10 ? 85 : 60,
        left: '7%',
        right: '5%',
      },
      legend: {
        show: true,
        data: ['总轧差'],
        top: 'bottom',
        left: 'center',
        selectedMode: false,
      },
      xAxis: {
        type: 'category',
        axisTick: {
          // alignWithLabel:true,
          interval: 0,
        },
        axisLabel: {
          showMaxLabel: true,
          interval: 0,
          rotate: xAxisData?.length > 10 ? 45 : 0,
          margin: 10,
        },
        data: xAxisData,
      },
      yAxis: {
        type: 'value',
        name: '万元',
        nameLocation: 'middle',
        nameGap: 40,
      },
      series: [
        {
          name: '总轧差',
          data: yAxisData,
          type: 'bar',
        },
      ],
    };

    option && myChart.setOption(option);
    setChart(myChart);
  }, [id]);

  const [isFoldFlowabilityCalendar, setIsFoldFlowabilityCalendar] = useState(false);
  const [isFoldRepurchase, setIsFoldRepurchase] = useState(false);

  const handleClickFold = (key?: string) => {
    if (key === 'repurchase') {
      setIsFoldRepurchase(!isFoldRepurchase);
    } else if (key === 'flowabilityCalendar') {
      setIsFoldFlowabilityCalendar(!isFoldFlowabilityCalendar);
    } else {
      setIsFoldRepurchase(false);
      setIsFoldFlowabilityCalendar(false);
    }
  };

  const saveImage = () => {
    if (chart) {
      const url = chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
      });

      getUrl && getUrl(url);
    }
  };

  return (
    <div key={id}>
      <div>
        <TitleContainer>
          <Title>流动性日历</Title>
          <FoldText onClick={() => handleClickFold('flowabilityCalendar')}>
            {isFoldFlowabilityCalendar ? '展开' : '收起'}
          </FoldText>
        </TitleContainer>

        <ContentContainer isFold={isFoldFlowabilityCalendar}>
          <ChartContainer id={'chart' + id}></ChartContainer>

          <TableComponent
            bordered={true}
            columns={column.flowabilityCalendar}
            dataSource={data.flowabilityCalendarList}
            pagination={false}
            // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
            scroll={{ x: '100%' }}
            size="small"
            // loading={loading}
            rowKey={(record: any) => record.id}
          />
        </ContentContainer>
      </div>

      <BlockContainer>
        <TitleContainer>
          <Title>回购明细</Title>
          <FoldText onClick={() => handleClickFold('repurchase')}>
            {isFoldRepurchase ? '展开' : '收起'}
          </FoldText>
        </TitleContainer>

        <ContentContainer isFold={isFoldRepurchase}>
          <TableComponent
            bordered={true}
            columns={column.repurchase}
            dataSource={data.repurchaseList}
            pagination={false}
            // scroll={{ x: 'max-content', y: height ? height : 'calc(100vh - 220px)' }}
            // scroll={{ x: '100%', y: '300px' }}
            scroll={{ x: '100%' }}
            size="small"
            // loading={loading}
            rowKey={(record: any) => record.id}
          />
        </ContentContainer>
      </BlockContainer>
    </div>
  );
});

export default TabContent;
