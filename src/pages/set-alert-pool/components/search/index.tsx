import React from 'react';
import { Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { getHocComp } from '@/utils';
import { go } from '@utils/cusRouter';
import { SearchContainer, Back } from './style';

const Search: React.FC = (props: any) => {
  const onSearch = async (value: string) => {
    props.handleSearch && (await props.handleSearch({ search: value }));
    props?.asyncGetTableInit();
  };

  const handleGoBack = () => {
    props.clearDetail && props.clearDetail();
    go({ url: '/abcAnalysis/publicSentiment/set-alert-pool' });
  };

  return (
    <SearchContainer>
      {props?.isShowBack && (
        <Back onClick={handleGoBack}>
          <LeftOutlined />
          返回
        </Back>
      )}

      <Input.Search
        // placeholder="企业名称/债券代码/债券简称 进行搜索"
        placeholder="企业名称 进行搜索"
        onSearch={onSearch}
        style={{ width: 400 }}
        enterButton
        allowClear
      />
    </SearchContainer>
  );
};

export default getHocComp(Search);
