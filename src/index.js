import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { render } from '@lugia/lugiax-router';
import '@lugia/lugia-web/dist/css/global.css';

import '@ysstech-lugia/icon/dist/index.css.css';
import 'antd/dist/antd.css';
import Root from './root.js';

// 如果不是single-spa模式
if (!window.singleSpaNavigate) {
  render(() => {
    return <Root />;
  }, 'root');
}

// single-spa模式
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('singleApp'), // 指定要挂载到哪个dom元素上面
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];
