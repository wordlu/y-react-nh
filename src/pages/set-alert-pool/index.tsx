import React, { useEffect, useState } from 'react';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Loading } from '@lugia/lugia-web';

import DeatailContainer from './components/detail';
import Screen from './components/screen';
import Search from './components/search';
import Fold from './components/fold';
import RightContainer from './components/right-container';
import SetPoolModal from './components/set-pool-modal';
import { searchObj } from '@/utils/helper';

import models from './models/set-alert-pool';

import { Container } from '@/constant/style';
import { ContentContainer, LeftContainer, ScreenContainer, LoadingContainer } from './style';

const SetAlertPool: React.FC = () => {
  const [init, setInit] = useState(false);

  const [isFold, setIsFold] = useState(false);

  const [isSetPool, setIsSetPool] = useState(false);

  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    const queryObj = searchObj(window.location.search);
    if (queryObj?.id) {
      setIsShowDetail(true);
    }
    setInit(true);
  }, []);

  const handleFoldChange = () => {
    setIsFold(!isFold);
  };

  const handleSetPool = (isShow: boolean) => {
    setIsSetPool(isShow);
  };

  return (
    <ConfigProvider locale={zh_CN}>
      {init ? (
        <>
          {isShowDetail ? (
            <DeatailContainer />
          ) : (
            <Container>
              {/* 查询 */}
              <Search model={models} />
              <ContentContainer>
                <LeftContainer isFold={isFold}>
                  <ScreenContainer>
                    {/* 筛选 */}
                    {/* <Screen model={models} isFold={isFold} loadingKey="screenContext" /> */}
                    <Screen model={models} isFold={isFold} />
                    {/* 折叠图标 */}
                    <Fold isFold={isFold} handleFoldChange={handleFoldChange} />
                  </ScreenContainer>
                </LeftContainer>
                <RightContainer isSetPool={isSetPool} handleSetPool={handleSetPool} />
                <SetPoolModal model={models} isShow={isSetPool} handleSetPool={handleSetPool} />
              </ContentContainer>
            </Container>
          )}
        </>
      ) : (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
    </ConfigProvider>
  );
};

export default SetAlertPool;
