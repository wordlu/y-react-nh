import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import moment from 'moment';

import {downloadFile} from '@/utils/helper';
import { getHocComp } from '@/utils';

const Div = styled.div`
  justify-content: flex-end;
  display: flex;
  background: #fff;
  background: rgb(245,247,250);
  padding: 5px;
  width: 100%;
  margin-top: 5px;

  .ant-btn > span {
    font-size: 12px;
  }

  button {
    cursor: default;
  }
`;

const BtnMenu:React.FC = ({formData,pageNo}) => {
  const exportExcel = ()=>{
    const params = {
      ...formData,
      searchDate: moment(formData.searchDate).format('YYYYMMDD'),
      pageNo,
    }
    downloadFile(params,'/aaa')
  }

  return <Div>
    <Button size="small" type="link" onClick={exportExcel}>Excel导出</Button>
  </Div>
};

export default getHocComp(BtnMenu);
