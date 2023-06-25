import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { Dropdown, Menu, Space, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getHocComp } from '@/utils';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { earlyWarningDetailsService } from '@/config/di.config';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  // background: #fff;
  background: #eef1f6;
  height: 38px;
  box-shadow: -1px 1px 6px #e9e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
`;

const Text = styled.a`
  // border: 1px solid #e9e1e1;
  // box-shadow: -1px 1px 6px #e9e1e1;
  // color: #ccc;
  color: rgb(96, 98, 102);
  // padding-left: 5px;
  cursor: default;
`;

const MenuList: React.FC = ({ formData, selectExcelParams, pageNo, pageSize, tableData }) => {
  const exportExcel = () => {
    // const data = objTransformFormDada({
    //   data: JSON.stringify({
    //     ...formData,
    //     searchDate: moment(formData.searchDate).format('YYYYMMDD'),
    //     pageNo,
    //     pageSize,
    //     // mainName:JSON.stringify(formData.mainName),
    //     // mainName: formData.mainName,
    //   }),
    // });
    if (!tableData?.length) {
      message.info('暂无数据可导出');
      return;
    }

    const data = objTransformFormDada({
      data: JSON.stringify(tableData),
      searchDate: moment(formData.searchDate).format('YYYYMMDD'),
      earlyWarnPool: selectExcelParams.earlyWarnPoolLabel,
      earlyWarnPlan: selectExcelParams.earlyWarnPlanLabel,
    });

    earlyWarningDetailsService.excel(data);
    // const params = {
    //   ...formData,
    //   searchDate: moment(formData.searchDate).format('YYYYMMDD'),
    //   pageNo,
    //   pageSize,
    //   // mainName:JSON.stringify(formData.mainName),
    //   mainName:formData.mainName,
    // };
    // downloadFile({data:JSON.stringify(params)}, '/api/EarlyWarnDetailsController/export/excel');
  };

  const menu = useMemo(
    () => (
      <Menu>
        {[
          {
            label: (
              // <a href="javascript:;" onClick={exportExcel}>
              //   Excel导出
              // </a>
              <div onClick={exportExcel}>Excel导出</div>
            ),
            key: '0',
          },
          {
            label: (
              <a href="/abcAnalysis/publicSentiment/set-alert-pool" target="_blank">
                预警池设置
              </a>
            ),
            key: '1',
          },
          {
            label: (
              <a href="/abcAnalysis/publicSentiment/early-warning-program" target="_blank">
                预警方案
              </a>
            ),
            key: '2',
          },
        ].map(item => (
          <Menu.Item key={item.key} children={item.label} />
        ))}
      </Menu>
    ),
    [formData]
  );

  return (
    <Container>
      <Dropdown overlay={menu} trigger={['click', 'hover']}>
        <Text onClick={e => e.preventDefault()}>
          {/* <Space> */}
          {/* 菜单 */}
          <DownOutlined />
          {/* </Space> */}
        </Text>
      </Dropdown>
    </Container>
  );
};

export default getHocComp(MenuList);
