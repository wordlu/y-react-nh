interface GATEWAY {
  baseFunction: string;
  bondWarning: string;
  financingRepurchase: string;
}

// 网关
export const gateWay: GATEWAY = {
  baseFunction: '/abc/api/baseFunction', // 基础服务
  bondWarning: '/abc/api/bondWarning', // 债券风险预警
  financingRepurchase: '/abc/api/financingRepurchase', // 融资回购
};
