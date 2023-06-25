import { PropChild } from '@/constant/type';
export type PropType = {
  children?: PropChild;
  title: string;
  subTitle?: string;
  showDate?: Boolean;
  type?: TypeEnumStr;
  isShowMore?: Boolean;
  handleClickMore?: () => void;
};
//deep为深蓝色
export type TypeEnumStr = 'default' | 'deep';
