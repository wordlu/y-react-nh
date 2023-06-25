import React from 'react';
import { CardBox, CardTitle, CardContent } from './style';
import { CardParams } from './type';

export default (props: CardParams) => {
  const { title, width, height, padding = '16px', margin = 0 } = props;
  return (
    <CardBox width={width} height={height} margin={margin}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent padding={padding} titleText={title}>
        {props.children}
      </CardContent>
    </CardBox>
  );
};
