import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import styled from 'styled-components';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  GraphicComponent,
]);

const Container = styled.div`
  padding-left: 7%;
`;

const BarChart1 = forwardRef(({ index, chartData, getUrl }, ref) => {
  const [chart, setChart] = useState(null);

  useImperativeHandle(ref, () => ({
    saveImage,
  }));

  const saveImage = () => {
    if (chart) {
      const url = chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff',
      });

      getUrl && getUrl(url);
      // const img = new Image();
      // img.src = chart.getDataURL({
      //   pixelRatio: 2,
      //   backgroundColor: '#fff',
      // });
      // document.getElementById('index'+index).appendChild(img)
      // console.log(1111,url);
    }
  };

  useEffect(() => {
    // if (chartData.baseData) {
    const baseData = chartData.baseData?.length ? chartData.baseData : [];
    const sData = chartData.sData?.length ? chartData.sData : [];
    const xData = chartData.xData?.length ? chartData.xData : [];
    const chartDom = document.getElementById('early-warning-details-bar-chart' + index);
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: '预警图',
        left: 'center',
        top: '5px',
        textStyle: {
          fontSize: '14px',
        },
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            silent: true,
            invisible: chartData.baseData?.length > 0,
            style: {
              fill: '#9d9d9d',
              fontWeight: 'bold',
              text: '暂无数据',
              fontSize: '14px',
            },
          },
        ],
      },
      tooltip: {},
      legend: {
        data: ['压力上升', '压力下降'],
        left: 'center',
        bottom: 0,
        itemGap: 100,
        selectedMode: false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: (function() {
          return ['本次', '前一', '前二', '前三'];
        })(),
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitNumber: 4,
        interval: 25,
        axisLabel: {
          formatter: function(value, index) {
            let texts = [];
            if (value < 25) {
              texts.push('安全');
            } else if (value < 50) {
              texts.push('关注');
            } else if (value < 75) {
              texts.push('中低风险');
            } else if (value < 100) {
              texts.push('中高风险');
            } else {
              texts.push('高危');
            }

            return texts;
          },
        },
      },
      series: [
        {
          name: '',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
          },
          data: baseData,
          tooltip: {
            // trigger: 'item',
            formatter: function(data) {
              return '';
            },
          },
        },
        {
          name: '压力上升',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'rgba(255, 0, 0, .3)',
            color: 'rgba(255, 0, 0, .6)',
          },
          label: {
            show: true,
            position: 'top',
            formatter: function(data) {
              return data.value + '%';
            },
          },
          data: sData,
          tooltip: {
            trigger: 'item',
            formatter: function(data) {
              const value = baseData[data.dataIndex];
              return (
                data.name +
                '<br />' +
                data.seriesName +
                '<br />' +
                '当前评分:' +
                (Number(data.value) + value) +
                '%' +
                '<br />' +
                '上次评分:' +
                value +
                '%'
              );
            },
          },
        },
        {
          name: '压力下降',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'rgba(0, 153, 0, .3)',
            color: 'rgba(0, 153, 0, .6)',
          },
          label: {
            show: true,
            position: 'bottom',
            formatter: function(data) {
              return data.value + '%';
            },
          },
          data: xData,
          tooltip: {
            trigger: 'item',
            formatter: function(data) {
              const value = baseData[data.dataIndex];
              return (
                data.name +
                '<br />' +
                data.seriesName +
                '<br />' +
                '当前评分:' +
                value +
                '%' +
                '<br />' +
                '上次评分:' +
                (value + Number(data.value)) +
                '%'
              );
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
    setChart(myChart);
    // }
  }, [chartData]);

  return (
    <Container>
      <div
        id={'early-warning-details-bar-chart' + index}
        style={{ width: '90%', height: '300px' }}
      ></div>
    </Container>
  );
});

export default BarChart1;
