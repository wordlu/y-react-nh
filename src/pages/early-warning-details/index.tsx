import React, { useEffect } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Tabs } from 'antd';

import Form from './components/form';
import PositionForm from './components/position-form';
import PositionTable from './components/position-table';
import BtnMenu from './components/btn-menu';
import MainTable from './components/main-table';
import Chart1 from './components/chart1';
import BtnAbsolute from './components/btn-absolute';
import EarlyWarningSubjectsModal from './components/early-warning-subjects-modal';
import MenuList from './components/menu-list';

import models from './models';

import {
  TabContainer,
  Container,
  Content,
  RightContainer,
  LeftContainer,
  ChartContainer,
  ChartBox,
  PositionTableContainer,
  Tip,
} from './style';

const tabs = [
  { key: '1', tab: '主体维度' },
  { key: '2', tab: '持仓维度' },
];

let index = 0;

const EarlyWarningDetails: React.FC = () => {
  useEffect(() => {
    models.mutations?.asyncInit && models.mutations.asyncInit();
  }, []);

  const handleTabChange = activeKey => {
    if (activeKey === tabs[1].key && index === 0) {
      models.mutations?.asyncHandlePositionInit && models.mutations.asyncHandlePositionInit();
    }
    index++;
  };

  return (
    <ConfigProvider locale={zh_CN}>
      <TabContainer>
        <Tabs
          defaultActiveKey={tabs[0].key}
          size="small"
          type="card"
          style={{ flex: 1, overflow: 'hidden' }}
          onChange={handleTabChange}
        >
          {tabs.map(item => (
            <Tabs.TabPane key={item.key} tab={item.tab}>
              {item.key === '1' && (
                <Container>
                  <Form model={models} />
                  {/* <BtnMenu model={models} /> */}
                  <Tip>
                    <span>提示：</span>双击企业名称，可查看该企业的各维度预警详情以及持仓信息。
                  </Tip>
                  <Content>
                    <LeftContainer>
                      <MainTable model={models} loadingKey="tableLoading" />
                      <MenuList model={models} />
                    </LeftContainer>
                    <RightContainer>
                      <ChartContainer>
                        <ChartBox>
                          <Chart1 model={models} loadingKey="chartLoading" />
                        </ChartBox>
                      </ChartContainer>
                      {/* <ChartContainer>
                        <ChartBox>
                          <Chart1 model={models} />
                        </ChartBox>
                      </ChartContainer> */}
                    </RightContainer>
                    <EarlyWarningSubjectsModal model={models} />
                    <BtnAbsolute model={models} />
                  </Content>
                </Container>
              )}
              {item.key === '2' && (
                <Container>
                  <PositionForm model={models} propKey="positionContext" />
                  <PositionTableContainer>
                    <PositionTable
                      model={models}
                      propKey="positionContext"
                      loadingKey="positionTableLoding"
                    />
                  </PositionTableContainer>
                </Container>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </TabContainer>
    </ConfigProvider>
  );
};

export default EarlyWarningDetails;
