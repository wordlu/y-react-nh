import React from 'react';
import { PropType } from './type';
import {
  Container,
  Header,
  Content,
  BlueLine,
  Title,
  HeaderContent,
  SubTitle,
  DateTitle,
  MoreTitle,
} from './style';
import { getLastMonthAndDay } from '@/utils';
import { LoadingHoc } from '@ysstech-data/data-web';
import loadingModel from '@ysstech-data/common-models/dist/loading-model';

const date = getLastMonthAndDay('YYYY/MM');
const CommonBox = (props: PropType) => {
  const {
    children,
    title = '',
    subTitle = '单位：亿元、%',
    showDate = false,
    type = 'default',
    handleClickMore,
    isShowMore = false,
  } = props;
  return (
    <Container>
      <Header type={type}>
        <HeaderContent>
          <BlueLine></BlueLine>
          <Title>{title}</Title>
          {showDate && <DateTitle>{date}</DateTitle>}
        </HeaderContent>
        <HeaderContent>
          <SubTitle>{subTitle}</SubTitle>
          {isShowMore && <MoreTitle onClick={handleClickMore}>更多</MoreTitle>}
        </HeaderContent>
      </Header>
      <Content type={type}>{props.children}</Content>
    </Container>
  );
};
export default LoadingHoc(CommonBox, { loadingModel });
