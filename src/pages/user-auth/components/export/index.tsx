import React from "react";
import styled from "styled-components";
import { Button, Breadcrumb } from "antd";
import moment from 'moment';

import {downloadFile} from '@/utils/helper';
import { Container } from '@/constant/style';
import './index.css';


const BtnMenu:React.FC = ({formData,pageNo}) => {
  const exportExcel = ()=>{
    // const params = {
    //   ...formData,
    //   searchDate: moment(formData.searchDate).format('YYYYMMDD'),
    //   pageNo,
    // }
    // downloadFile(params,'/aaa')
  }

  return (
    <Container className="user-auth-export-excel">
      <Breadcrumb>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
        <Breadcrumb.Item>数据授权</Breadcrumb.Item>
      </Breadcrumb>
      {/* <Button size="small" type="link" onClick={exportExcel}>Excel导出</Button> */}
    </Container>
  )
};

export default BtnMenu;
