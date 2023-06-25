import React from 'react';
import { Button, message } from 'antd';
import styled from 'styled-components';

import { getHocComp } from '@/utils';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { setAlertPoolService } from '@/config/di.config';

const Div = styled.div`
  justify-content: flex-end;
  display: flex;
  background: #fff;
  background: rgb(245, 247, 250);
  padding: 5px;
  width: 100%;

  .ant-btn > span {
    font-size: 12px;
  }

  button {
    cursor: default;
  }
`;

interface Props {
  screenContext: any;
  tableContext: any;
  search: string;
  isSetPool: boolean;
  handleSetPool: (isSetPool: boolean) => void;
  asyncDoAnalysis: (params: any) => void;
}

const BtnCombination: React.FC<Props> = ({
  search,
  isSetPool,
  screenContext,
  tableContext,
  handleSetPool,
  asyncDoAnalysis,
}) => {
  const exportExcel = () => {
    if (!tableContext.tableData?.length) {
      message.info('暂无数据可导出');
      return;
    }
    const data = objTransformFormDada({
      data: JSON.stringify({
        subjectMessage: search,
        // screen: JSON.stringify(screenContext.searchSelect),
        screen: screenContext.searchSelect,
        pageNo: tableContext.currentPage,
        pageSize: tableContext.pageSize,
      }),
    });

    setAlertPoolService.setAlertPoolExcel(data);

    // const params = {
    //   search,
    //   // screen: JSON.stringify(screenContext.searchSelect),
    //   screen: screenContext.searchSelect,
    //   pageNo: tableContext.currentPage,
    //   pageSize: tableContext.pageSize,
    // };
    // console.log(1111, params);
    // downloadFile({ data: JSON.stringify(params) }, '/api/setAlertPool/export/excel');
  };

  return (
    <Div>
      <Button size="small" type="link" onClick={exportExcel}>
        导出列表
      </Button>
      <Button size="small" type="link" onClick={() => asyncDoAnalysis({ flag: '0' })}>
        关注
      </Button>
      <Button size="small" type="link" onClick={() => asyncDoAnalysis({ flag: '1' })}>
        取消关注
      </Button>
      {/* <Button size="small" type="link" onClick={()=>handleSetPool(!isSetPool)}>预警池设置</Button> */}
      <Button size="small" type="link" onClick={() => handleSetPool(true)}>
        预警池设置
      </Button>
    </Div>
  );
};

export default getHocComp(BtnCombination);
