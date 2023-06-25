// 处理地址栏search
export const searchObj = search => {
  const obj = {};
  if (typeof search == 'string') {
    const index = search.indexOf('?');
    const str = search.slice(index > -1 ? index + 1 : 0);

    str.split('&').forEach(item => {
      if (item.indexOf('=')) {
        const itemArr = item.split('=');
        if (itemArr[0] && itemArr[1]) {
          obj[itemArr[0]] = itemArr[1];
        }
      }
    });
    return obj;
  }
  return obj;
};

// 下载表格
export const downloadFile = (params: any, url: string, isFile?: boolean) => {
  if (params) {
    var form = document.createElement('form');
    form.style.display = 'none';
    form.id = 'downLoad';
    if (isFile) {
      form.enctype = 'multipart/form-data';
      //form.encding = 'multipart/form-data';
    }

    Object.keys(params).forEach(item => {
      var input1 = document.createElement('input');
      input1.type = 'hidden';
      input1.name = String(item);
      // console.log(5555555,params[item]);
      input1.value = params[item];
      form.appendChild(input1);
    });

    form.method = 'POST';
    form.action = url;
    if (document.querySelectorAll('#downLoad').length > 0) {
      document.body.removeChild(document.getElementById('downLoad'));
    }
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
      document.body.removeChild(document.getElementById('downLoad'));
    }, 10);
  } else {
    return false;
  }
};

// 模糊查询正则
// var reg = /.?1.*2.*3.?/;
export const getReg = str => {
  if (str && typeof str === 'string') {
    const regS = '.?';
    const regE = '.?';
    let regStr = '';
    for (var i = 0; i < str.length; i++) {
      if (i < str.length - 1) {
        regStr += str[i] + '.*';
      } else {
        regStr += str[i];
      }
    }
    return { isReg: true, reg: regS + regStr + regE };
  } else {
    return { isReg: false };
  }
};

// json 转 FormData
export function objTransformFormDada(parmas) {
  const formData = new FormData();
  if (!parmas || Object.keys(parmas).length === 0) return formData;
  Object.keys(parmas).map(function(item) {
    formData.append(item, parmas[item]);
  });
  return formData;
}

// 将base64转换文件流
export function base64toFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
}

const toFixedFn = val => {
  if (!val) return '';
  const n = parseFloat(val) ? parseFloat(val) : 0.0;
  let str = String(n);
  if (str.indexOf('.') < 0) {
    str = str + '.0000';
  } else {
    const i = String(n).indexOf('.');
    const arr = String(n).split('.');

    if (i !== 0) {
      const length = arr[1] ? arr[1].length : 0;
      // console.log(8888, length, arr[1]);
      if (length < 5) {
        for (let j = length; j < 4; j++) {
          str = str + '0';
        }
      } else {
        str = arr[0] + '.' + arr[1].slice(0, 4);
      }
    } else {
      str = '0.0000';
    }
  }
  return str;
};

// 保留小数点几位
export function toFixedFn2(val: string, number: number) {
  if (!val) return '';
  let strFractional = '.';
  if (number) {
    for (let t = 0; t < number; t++) {
      strFractional = strFractional + '0';
    }
  }
  const n = parseFloat(val) ? parseFloat(val) : 0.0;
  let str = String(n);
  if (str.indexOf('.') < 0) {
    str = str + strFractional;
  } else {
    const i = String(n).indexOf('.');
    const arr = String(n).split('.');

    if (i !== 0) {
      const length = arr[1] ? arr[1].length : 0;
      // console.log(8888, length, arr[1]);
      if (length < number + 1) {
        for (let j = length; j < number; j++) {
          str = str + '0';
        }
      } else {
        str = arr[0] + '.' + arr[1].slice(0, number);
      }
    } else {
      str = '0.0000';
    }
  }
  // console.log(88888,str);
  return str;
}

// 保留小数点几位
export function toFixedNum(val: string, number: number) {
  if (!val) return '';
  let strFractional = '.';
  if (number) {
    for (let t = 0; t < number; t++) {
      strFractional = strFractional + '0';
    }
  }
  // 解决parseFloat超过21位bug
  let num = val
  if (val?.length > 20) {
    num = val.substring(0, 21)
  }
  const n = parseFloat(num) ? parseFloat(num) : 0.0;
  let str = String(n);
  if (str.indexOf('.') < 0) {
    str = str + strFractional;
  } else {
    const i = String(n).indexOf('.');
    const arr = String(n).split('.');

    if (i !== 0) {
      const length = arr[1] ? arr[1].length : 0;
      // console.log(8888, length, arr[1]);
      if (length < number + 1) {
        for (let j = length; j < number; j++) {
          str = str + '0';
        }
      } else {
        str = arr[0] + '.' + arr[1].slice(0, number);
      }
    } else {
      str = '0.0000';
    }
  }
  // console.log(88888,str);
  return str;
}

// 千分位的分割，并保留俩位小数
export function format(num: any) {
  return num && num !== '-' && typeof Number(num) === 'number'
    ? Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    : num;
}

// obj转&拼接
export function addQueryString(params: any) {
  let str = '';
  for (var Key in params) {
    str += Key + '=' + params[Key] + '&';
  }
  return str.substr(0, str.length - 1);
}

export function checkUpData(data: any[]) {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data;
}

// 数组是否为空
export function arrayIsEmpty(data: any[]) {
  return checkUpData(data).length === 0;
}
