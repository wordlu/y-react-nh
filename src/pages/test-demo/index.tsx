import React from 'react';

import { LineContainer, WrappedContainer } from '@/constant/style';
import AntdTable from '@ysstech-data/data-antd/dist/antd-table';
import testDemoModel from './models/test-model';
import ModelComp from './components/model-comp';
import ModelTestBtn from './components/model-test-btn';
import { TestDiv } from './constant/style';
import { Button } from 'antd';
export default function() {
  const data = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <WrappedContainer className="lugiad_pageBox">
      <ModelComp model={testDemoModel} propKey="text"></ModelComp>
      <LineContainer>
        <ModelTestBtn model={testDemoModel}></ModelTestBtn>
        <TestDiv></TestDiv>
        <AntdTable dataSource={data} columns={columns}></AntdTable>
      </LineContainer>
      <Button type="primary">123</Button>
    </WrappedContainer>
  );
}
