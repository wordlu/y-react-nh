import React, { Fragment } from 'react';
import { Button } from '@lugia/lugia-web';
import { getHocComp } from '@/utils';
import { TestDemoModelProps } from '../../models/test-model/type';

const ModelComp = (innerProps: TestDemoModelProps) => {
  const { counter, increment } = innerProps;
  return (
    <div>
      <div>counter:{counter}</div>
      <Button onClick={increment}>Change</Button>
    </div>
  );
};
export default getHocComp(ModelComp);
