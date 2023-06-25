import React, { useEffect, useState } from 'react';
import { Button, Empty } from 'antd';
import { Loading } from '@lugia/lugia-web';

import TagMenu from './components/tag-menu';
import { getHocComp } from '@/utils';

import { Container, Title, ShowTotal, ResetBtn, EmptyContainer } from './style';

interface Select {
  [id: string]: string[];
}

const Screen: React.FC = (props: any) => {
  const {
    screenContext: { selectData, screenList, screenLoading },
    tableContext: { allTotal, total },
    handleChangeSelect,
    isFold,
    asyncGetScreenInit,
    resetSelectData,
  } = props;

  const [state, setState] = useState<Select>({});

  useEffect(() => {
    asyncGetScreenInit();
  }, []);

  const onClick = () => {
    resetSelectData();
  };

  return (
    <Container style={{ opacity: isFold ? 0 : 1, transition: '1s' }}>
      <Title>筛选</Title>
      <ShowTotal>
        <span style={{ fontSize: '12px' }}>
          已筛选{total}条{/* ，共{allTotal}条 */}
        </span>
        <ResetBtn onClick={onClick}>重置</ResetBtn>
      </ShowTotal>
      <div style={{ flex: 1 }}>
        <Loading loading={screenLoading} isInherit={true}>
          {screenList && screenList.length ? (
            selectData &&
            screenList.map(item => (
              <TagMenu
                item={item}
                selectArr={selectData[item.id] ?? []}
                handleChangeSelect={handleChangeSelect}
              />
            ))
          ) : (
            <EmptyContainer>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </EmptyContainer>
          )}
        </Loading>
      </div>
    </Container>
  );
};

// export default getHocComp(Screen, { withLoading: true });
export default getHocComp(Screen);
