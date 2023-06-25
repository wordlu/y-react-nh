import { getHocComp } from '@/utils';
import React, { useEffect } from 'react';
import { TestDemoModelMutations, TestDemoModelTextState } from '../../models/test-model/type';
interface InnerProps extends TestDemoModelTextState, TestDemoModelMutations {}
const ModelComp = (innerProps: InnerProps) => {
  const { name, asyncTestIncrement } = innerProps;
  useEffect(() => {
    asyncTestIncrement();
  }, []);
  return <div>{name}</div>;
};
export default getHocComp(ModelComp);
