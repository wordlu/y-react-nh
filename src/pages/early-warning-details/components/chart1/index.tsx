import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GraphicComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { getHocComp } from '@/utils';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  GraphicComponent,
]);

const Container = styled.div`
  width: 100%;
  height: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
`;

const ChartConteiner: React.FC = ({ mainChart1 }) => {
  useEffect(() => {
    // if (mainChart1?.length) {
    const chartDom = document.getElementById('early-warning-details-chart1');

    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '信用压力分布',
        left: 'center',
        textStyle: {
          fontSize: 14,
        },
        // top: '10px',
      },
      tooltip: {
        trigger: 'item',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            silent: true,
            invisible: mainChart1.length > 0,
            style: {
              fill: '#9d9d9d',
              fontWeight: 'bold',
              text: '暂无数据',
              fontSize: '14px',
            },
          },
        ],
      },
      legend: {
        type: 'scroll',
        bottom: '1%',
        left: 'center',
        selectedMode: false,
        width: '90%',
      },
      color:['#91cc75','#5470c6','#fac858','#fc8452','#ee6666'],
      series: [
        {
          // name: '信用压力分布',
          type: 'pie',
          radius: ['40%', '70%'],
          left: 'center',
          // top:30,
          avoidLabelOverlap: false,
          // width:'70%',
          // height:'70%',
          // emphasis: {
            // label: {
            //   show: true,
            //   fontSize: '40',
            //   fontWeight: 'bold',
            // },
          // },
          data: mainChart1,
          label: {
            // show: false,
            // position: 'outer',
            // alignTo: 'edge',
            // margin: 0,
            // position: 'outer',
            // alignTo:'labelLine',
            
          },
        },
      ],
    };

    option && myChart.setOption(option);
    // }

    // myChart.resize();
  }, [mainChart1]);

  return (
    // <Container>
    <div id="early-warning-details-chart1" style={{ width: '100%', flex: 1, height: '100%' }}></div>
    // </Container>
  );
};

export default getHocComp(ChartConteiner, { withLoading: true });
