import { PropChild } from '@/constant/type';

export type CardParams = {
  title?: string;
  width?: string | number;
  height: string | number;
  padding?: string | number;
  margin?: string | number;
  children?: PropChild;
};

export type CardBoxParams = {
  width?: string | number;
  height: string | number;
  margin?: string | number;
};

export type CardContentParams = {
  padding?: string | number;
  titleText?: string;
};
