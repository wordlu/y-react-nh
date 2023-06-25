import { ReactNode, ReactNodeArray } from 'react';
import { RegisterResult } from '@lugia/lugiax-core';
export interface ModelProps {
  model: RegisterResult;
  propKey?: string;
}

export type PropChild = ReactNode | ReactNodeArray;

export type DataItem = {
  [params: string]: any;
};

export type DataListType = DataItem[];

export type Enum = {
  [key: string]: string;
};

export type ColumnItem = {
  [params: string]: any;
};

export type ScrollType = {
  x?: number;
  y?: number;
};
