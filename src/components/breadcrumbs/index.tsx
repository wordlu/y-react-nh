import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';

import routingConfig from '@/config/router/cusRouting.config';

import { go } from '@/utils/cusRouter';

const Breadcrumbs: React.FC = () => {
  if (!routingConfig?.length) return <></>;

  const hrefArr = location.pathname.split('/').filter(item => item);
  const hrefArrLength = hrefArr.length;
  if (hrefArrLength < 1) return <></>;

  let menu: any[] = [];

  const fn = (arr, count, length) => {
    if (count > length) return;
    count += 1;
    menu.push({
      url: arr[0].value,
      text: arr[0].text,
    });
    if (arr[0].children) {
      const arr1 = arr[0].children.filter(item => item.value.indexOf(hrefArr[count - 1])>-1);

      if (arr1.length) fn(arr1, count, length);
    }
  };

  const routerData = routingConfig.filter(item => item?.value === '/' + hrefArr[0]);
  fn(routerData, 1, hrefArrLength);

  // console.log('---menu---', menu,routerData);

  const onHref = (url, index) => {
    if (index !== 0) go(url);
  };

  return (
    <Breadcrumb>
      {menu.map((item, index) => (
        <Breadcrumb.Item>
          <a href="javascript:void(0);" onClick={() => onHref(item.url, index)}>
            {item.text}
          </a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
