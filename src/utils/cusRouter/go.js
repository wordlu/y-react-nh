/**
 *
 *  by wangmeng
 *
 */

import history from './history';

function getUrl(inParam) {
  return typeof inParam === 'string' ? inParam : inParam.url;
}

export default inParam => {
  const url = getUrl(inParam);
  if (url) {
    history.push(url);
  }
};
