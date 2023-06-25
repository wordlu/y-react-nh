/**
 *
 *  by wangmeng
 *
 */

import { createBrowserHistory } from 'history';

if (!window.cusHistory) {
  window.cusHistory = createBrowserHistory();
}

export default window.cusHistory;
