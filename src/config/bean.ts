import { isArray } from '@ysstech-data/type-utils';
interface Params {
  [key: string]: Symbol;
}
const Bean = {};

export const registeBean = (item, type) => {
  let params: Params = {};
  if (type === 'data') {
    const { name } = item;
    const dataBean = `${name}Data`;
    const optionBean = `${name}Option`;
    params = {
      [dataBean]: Symbol(dataBean),
      [optionBean]: Symbol(optionBean),
    };
  } else {
    const { name } = item;
    params = { [name]: Symbol(name) };
  }
  for (let key in params) {
    Bean[key] = params[key];
  }
};
export let BeanList = [];
export const generateBean = () => {
  const files = require.context('./constant', true, /(\.ts)$/);

  files.keys().forEach((key: string) => {
    if (key === './index.ts') {
      return;
    }

    if (isArray(files(key).default)) {
      files(key).default.forEach((item: any) => {
        BeanList = BeanList.concat(item);
        // console.log(item, 'inner');
        const { type } = item;
        switch (type) {
          case 'data':
            registeBean(item, type);
            break;
          case 'service':
            registeBean(item, type);
            break;
          default:
            console.error("cannot caught 'type' !");
        }
      });
    }
  });
};
generateBean();

export default Bean;
