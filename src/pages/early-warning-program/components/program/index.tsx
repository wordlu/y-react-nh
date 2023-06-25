import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, Form, Input, InputNumber, Button, Select, message, Modal, Space } from 'antd';
import { Loading } from '@lugia/lugia-web';
import { LeftOutlined } from '@ant-design/icons';

import ProgramModal from '../program-modal';

import { go } from '@utils/cusRouter';
import { toFixedNum } from '@/utils/helper';
import { getHocComp } from '@/utils';
import TableComponent from '@/components/table';
import './style.css'

import FirstTable from '../first-table';
import SecondTable from '../second-table';

import { useRef } from 'react'

import {
  TableContainer,
  TablesForm,
  Container,
  Title,
  FormContainer,
  FormContent,
  FormHead,
  HeadItem1,
  HeadItem2,
  FormItemRow,
  Footer,
  FormGroup,
  FormGroupTitle,
  ModalText,
  ModalTextLeft,
  ModalContent,
  LoadingContainer,
  Back,
} from './style';

const tags = [
  {
    name: '价格预警',
    id: '1',
  },
  {
    name: '财务预警',
    id: '2',
  },
  {
    name: '舆情预警',
    id: '3',
  },
];

const financialTags = [
  {
    name: 'Logistic回归预警',
    id: '1'
  }, 
  {
    name: 'Z-score回归预警',
    id: '2'
  },
  {
    name: '财务指标',
    id: '3'
  }
]

const defaultPriceChange = {
  zzgzChange: false,
  cjjgChange: false,
  fxllChange: false,
  zqjgChange: false,
  scfxChange: false,
};

const defaultFinanceChange = {
  jjx1Change: false,
  f1Change: false,
  f2Change: false,
  f3Change: false,
  f4Change: false,
  yyzbChange: false,
  lcsyChange: false,
  xsqlChange: false,
  zqyyChange: false,
  qyysChange: false,
  jjx2Change: false,
  gwyfChange: false,
  hsqyChange: false,
};

const LogisticArr = ['jjx1Change', 'f1Change', 'f2Change', 'f3Change', 'f4Change', 'f5Change']
const zscoreArr = ['yyzbChange', 'lcsyChange', 'xsqlChange', 'zqyyChange', 'qyysChange', 'qyysChange', 'jjx2Change', 'gwyfChange', 'hsqyChange']

const form2ObjName = {
  logistic: {
    jjx1: '截距项',
    f1: 'F1系数',
    f2: 'F2系数',
    f3: 'F3系数',
    f4: 'F4系数',
    f5: 'F5系数'
  },
  zscore: {
    yyzb: '营运资本与总资产之比系数',
    lcsy: '留存收益与总资产之比系数',
    xsql: '息税前利润与总资产之比系数',
    zqyy: '总权益与总债务之比系数',
    qyys: '企业营收与总资产之比系数',
    jjx2: '截距项',
    gwyf: '高违约风险阈值',
    hsqy: '灰色区域阈值',
  },
  cwzb: {
    zzw_1: {
      name: '总债务/EBITDA',
      before: '超过',
      after: ''
    },
    zzcbcl_2: {
      name: '总资产报酬率',
      before: '小于',
      after: '%'
    },
    zzbhbl_3: {
      name: '总资本回报率',
      before: '小于',
      after: '%'
    },
    trzbhbl_4: {
      name: '投入资本回报率',
      before: '小于',
      after: '%'
    },
    jsyyyzh_5: {
      name: '净收益营运指数',
      before: '小于',
      after: ''
    },
    sxfybz_6: {
      name: '三项费用比重',
      before: '超过',
      after: '%'
    },
    cbfyl_8: {
      name: '成本费用率',
      before: '超过',
      after: '%'
    },
    yyfyl_9: {
      name: '营业费用率',
      before: '超过',
      after: '%'
    },
    glfyl_10: {
      name: '管理费用率',
      before: '超过',
      after: '%'
    },
    cwfyl_11: {
      name: '财务费用率',
      before: '超过',
      after: '%'
    },
    cbfylrl_12: {
      name: '成本费用利润率',
      before: '小于',
      after: '%'
    },
    cbfyyylrl_13: {
      name: '成本费用营业利润率',
      before: '小于',
      after: '%'
    },
    yylrl_14: {
      name: '营业利润率',
      before: '小于',
      after: '%'
    },
    ldbl_15: {
      name: '流动比率',
      before: '小于',
      after: ''
    },
    ldblxj_16: {
      name: '流动比率下降',
      before: '超过',
      after: '%'
    },
    sdbl_17: {
      name: '速动比率',
      before: '小于',
      after: ''
    },
    sdblxj_18: {
      name: '速动比率下降',
      before: '超过',
      after: '%'
    },
    bssdbl_19: {
      name: '保守速动比率',
      before: '小于',
      after: ''
    },
    zcfzl_20: {
      name: '资产负债率',
      before: '超过',
      after: '%'
    },
    qycs_21: {
      name: '权益乘数',
      before: '超过',
      after: ''
    },
    cqbl_22: {
      name: '产权比率',
      before: '超过',
      after: '%'
    },
    cqfz_23: {
      name: '长期负债/总资产',
      before: '超过',
      after: ''
    },
    cqfz_24: {
      name: '长期负债/归属母公司的净资产',
      before: '超过',
      after: ''
    },
    cqzw_25: {
      name: '长期债务/营运资金',
      before: '超过',
      after: ''
    },
    gsmgsdjzc_26: {
      name: '归属母公司的净资产/固定资产',
      before: '小于',
      after: ''
    },
    zchbl_27: {
      name: '资本化比率_含少数股权的净资产',
      before: '超过',
      after: '%'
    },
    gdzcjzl_28: {
      name: '固定资产净值率',
      before: '小于',
      after: '%'
    },
    zbgdhbl_29: {
      name: '资本固定化比率(含少数股权的净资产)',
      before: '超过',
      after: '%'
    },
    qsjzbl1_30: {
      name: '清算价值比率1',
      before: '小于',
      after: '%'
    },
    gdzcbz_31: {
      name: '固定资产比重',
      before: '超过',
      after: '%'
    },
    yxjzzwl_32: {
      name: '有形净值债务率',
      before: '超过',
      after: '%'
    },
    jzw_33: {
      name: '净债务/归属母公司的净资产',
      before: '超过',
      after: '%'
    },
    xjbl_34: {
      name: '现金比率',
      before: '小于',
      after: ''
    },
    dqfz_35: {
      name: '短期负债/负债总额',
      before: '超过',
      after: '%'
    },
    jyhdjxj_36: {
      name: '经营活动净现金/总债务',
      before: '小于',
      after: '%'
    },
    jyhdjxj_37: {
      name: '经营活动净现金/短期债务',
      before: '小于',
      after: '%'
    },
    jyhdjxj_38: {
      name: '(经营活动净现金+短期投资)/短期债务',
      before: '小于',
      after: '%'
    },
    jyhdjxj_39: {
      name: '经营活动净现金/利息支出',
      before: '小于',
      after: '%'
    },
    jyhdjxj_40: {
      name: '经营活动净现金/销售收入',
      before: '小于',
      after: '%'
    },
    jyhdjxj_41: {
      name: '经营活动净现金/归属母公司的净利润',
      before: '小于',
      after: '%'
    },
    jyhdjxj_42: {
      name: '经营活动净现金/含少数股东损益的净利润',
      before: '小于',
      after: '%'
    },
    jyhdjxj_43: {
      name: '经营活动净现金/长期负债',
      before: '小于',
      after: '%'
    },
    jyhdjxj_44: {
      name: '经营活动净现金/总负债',
      before: '小于',
      after: '%'
    },
    jyhdjxj_45: {
      name: '经营活动净现金/总资产',
      before: '小于',
      after: '%'
    },
    jyhdjxj_46: {
      name: '经营活动净现金/总净现金流量',
      before: '小于',
      after: '%'
    },
    jyhdjxj_47: {
      name: '经营活动净现金/营业利润',
      before: '小于',
      after: '%'
    },
    yszkzzl_48: {
      name: '应收账款周转率',
      before: '小于',
      after: '%'
    },
    yszkzzts_49: {
      name: '应收账款周转天数',
      before: '超过',
      after: '天'
    },
    chzzl_50: {
      name: '存货周转率',
      before: '小于',
      after: '%'
    },
    chzzts_51: {
      name: '存货周转天数',
      before: '超过',
      after: '天'
    },
    chzzgcl_52: {
      name: '存货资产构成率',
      before: '超过',
      after: '%'
    },
    gdzczzl_53: {
      name: '固定资产周转率',
      before: '小于',
      after: '%'
    },
    zzczzl_54: {
      name: '总资产周转率',
      before: '小于',
      after: '次'
    },
    zzczzts_55: {
      name: '总资产周转天数',
      before: '超过',
      after: '天'
    },
    gdqyzzl_56: {
      name: '股东权益周转率',
      before: '小于',
      after: '%'
    },
    gdqyzzl_57: {
      name: '股东权益周转率(含少数股权权益)',
      before: '小于',
      after: '%'
    },
    ldzczzl_58: {
      name: '流动资产周转率',
      before: '小于',
      after: '%'
    },
    ldzczzts_59: {
      name: '流动资产周转天数',
      before: '超过',
      after: '天'
    },
    yyzq_60: {
      name: '营业周期',
      before: '超过',
      after: '天'
    },
    zhzjl_61: {
      name: '综合折旧率',
      before: '超过',
      after: '%'
    },
    ljzjl_62: {
      name: '累计折旧率',
      before: '超过',
      after: '%'
    },
    blzcbl_63: {
      name: '不良资产比率',
      before: '超过',
      after: '%'
    },
    fzjgbl_65: {
      name: '负债结构比率',
      before: '超过',
      after: '%'
    },
    yfzkzzl_68: {
      name: '应付账款周转率',
      before: '超过',
      after: '次'
    },
    yfzkzzts_69: {
      name: '应付账款周转天数',
      before: '小于',
      after: '天'
    },
    xjzq_70: {
      name: '现金周期',
      before: '超过',
      after: '天'
    },
    gdzczzts_71: {
      name: '固定资产周转天数',
      before: '小于',
      after: '天'
    },
    xjyyzs_72: {
      name: '现金运营指数',
      before: '小于',
      after: '倍'
    },
    zzcjll_75: {
      name: '总资产净利率_平均',
      before: '小于',
      after: '%'
    },
    cqzwzbhbl_77: {
      name: '长期债务资本化比率',
      before: '小于',
      after: '%'
    },
    czhdqxjlljezwbhbs_78: {
      name: '筹资活动前现金流量净额债务保护倍数',
      before: '小于',
      after: ''
    },
    zzw_79: {
      name: '总债务/总资产',
      before: '超过',
      after: '%'
    },
    yywszje_80: {
      name: '营业外收支净额/利润总额',
      before: '超过',
      after: '%'
    },
    xszjtxqlr_81: {
      name: '息税折旧摊销前利润/负债合计',
      before: '小于',
      after: ''
    },
    xsqlr_82: {
      name: '息税前利润/营业总收入',
      before: '小于',
      after: '%'
    },
    sds_85: {
      name: '所得税/利润总额',
      before: '超过',
      after: '%'
    },
    xssptglwsddxj_86: {
      name: '销售商品提供劳务收到的现金/营业收入',
      before: '小于',
      after: ''
    },
    yylr_87: {
      name: '营业利润/利润总额',
      before: '小于',
      after: '%'
    },
    zzw_88: {
      name: '总债务/归属母公司的投入资本',
      before: '超过',
      after: '%'
    },
    zzw_89: {
      name: '总债务/含少数股权的投入资本',
      before: '超过',
      after: '%'
    },
    kcfjcxsyhdjlr_90: {
      name: '扣除非经常性损益后的净利润/归属母公司的净利润',
      before: '小于',
      after: '%'
    },
    gsmgsgddjlr_91: {
      name: '归属母公司股东的净利润/含少数股东损益的净利润',
      before: '小于',
      after: '%'
    },
    gsmgsdjzc_92: {
      name: '归属母公司的净资产/归属母公司的投入资本',
      before: '小于',
      after: '%'
    },
    gsmgsdjzc_93: {
      name: '归属母公司的净资产/含少数股权的投入资本',
      before: '小于',
      after: '%'
    },
    gsmgsdjzc_94: {
      name: '归属母公司的净利润/利润总额',
      before: '小于',
      after: '%'
    },
    hssgdsydjlr_95: {
      name: '含少数股东损益的净利润/利润总额',
      before: '小于',
      after: '%'
    },
    lrze_96: {
      name: '利润总额/息税前利润',
      before: '小于',
      after: '%'
    },
    gsmgsdjzc_97: {
      name: '归属母公司的净资产/负债合计',
      before: '小于',
      after: ''
    },
    jyhdjxj_98: {
      name: '经营活动净现金/净债务',
      before: '小于',
      after: ''
    },
    yxzcjz_99: {
      name: '有形资产净值/总债务',
      before: '小于',
      after: '%'
    },
    yxzcjz_100: {
      name: '有形资产净值/负债合计',
      before: '小于',
      after: ''
    },
    yxzcjz_101: {
      name: '有形资产净值/净债务',
      before: '小于',
      after: ''
    },
    zbxzc_102: {
      name: '资本性支出/折旧与摊销',
      before: '小于',
      after: ''
    },
    gsmgsdjzc_103: {
      name: '归属母公司的净资产/总债务',
      before: '小于',
      after: '%'
    },
    jzbdjsy_105: {
      name: '价值变动净收益/利润总额',
      before: '超过',
      after: '%'
    },
    zbbzzzl_106: {
      name: '资本保值增值率(含少数股权的净资产)',
      before: '小于',
      after: '%'
    },
    bldkl_108: {
      name: '不良贷款率_五级',
      before: '超过',
      after: '%'
    },
    bldkbbfgl_109: {
      name: '不良贷款拨备覆盖率_五级',
      before: '小于',
      after: '%'
    },
    cqzcshl_110: {
      name: '长期资产适合率',
      before: '小于',
      after: '%'
    },
    ebit_111: {
      name: 'EBIT/收入的波动率',
      before: '小于',
      after: '%'
    },
    zzcsylbdl_112: {
      name: '总资产收益率波动率',
      before: '超过',
      after: '%'
    },
    flxsrb_113: {
      name: '非利息收入比',
      before: '小于',
      after: '%'
    },
    hbzj_114: {
      name: '货币资金/短期债务',
      before: '小于',
      after: ''
    },
    zclyl_115: {
      name: '资产利用率',
      before: '小于',
      after: '%'
    },
    dksszbj_116: {
      name: '贷款损失准备金/贷款总额',
      before: '小于',
      after: '%'
    },
    hxzbczl_118: {
      name: '核心资本充足率',
      before: '小于',
      after: '%'
    },
    zbczl_119: {
      name: '资本充足率',
      before: '小于',
      after: '%'
    },
    jzcsyl_122: {
      name: '净资产收益率_扣除前后净利润孰低_归属母公司',
      before: '小于',
      after: '%'
    },
    ldzclrl_123: {
      name: '流动资产利润率',
      before: '小于',
      after: '%'
    },
    ldzcyylrl_124: {
      name: '流动资产营业利润率',
      before: '小于',
      after: '%'
    },
    gdzclrl_125: {
      name: '固定资产利润率',
      before: '小于',
      after: '%'
    },
    zbjlrl_126: {
      name: '资本金利润率',
      before: '小于',
      after: '%'
    },
    jyyzbzzl_127: {
      name: '净营运资本周转率',
      before: '小于',
      after: '%'
    },
    yyzbdzzcbl_128: {
      name: '营运资本对总资产比率',
      before: '小于',
      after: '%'
    },
    jyxxjlldzbxzcbl_129: {
      name: '经营性现金流量对资本性支出比率',
      before: '小于',
      after: '%'
    },
    cqfzyyyzbbl_130: {
      name: '长期负债与营运资本比率',
      before: '超过',
      after: '%'
    },
    zyywxml_131: {
      name: '主营业务鲜明率',
      before: '小于',
      after: '%'
    },
    jyhdcsdxjllje_132: {
      name: '经营活动产生的现金流量净额/经营活动净收益',
      before: '小于',
      after: ''
    },
    jyxxjjll_133: {
      name: '经营性现金净流量/营业总收入',
      before: '小于',
      after: ''
    },
    jyhdjsy_134: {
      name: '经营活动净收益/利润总额',
      before: '小于',
      after: '%'
    },
    tzsysxl_136: {
      name: '投资收益收现率',
      before: '小于',
      after: '%'
    },
    jyhdxjlrzxjlrzlbl_137: {
      name: '经营活动现金流入占现金流入总量比率',
      before: '小于',
      after: '%'
    },
    jyhdjxj_138: {
      name: '经营活动净现金/折旧与摊销',
      before: '小于',
      after: '%'
    },
    yxzc_139: {
      name: '有形资产/总资产',
      before: '小于',
      after: '%'
    },
    nhjzcsyl_140: {
      name: '年化净资产收益率',
      before: '小于',
      after: '%'
    },
    nhzzcbcl_141: {
      name: '年化总资产报酬率',
      before: '小于',
      after: '%'
    },
    nhzzcjll_142: {
      name: '年化总资产净利率',
      before: '小于',
      after: '%'
    },
    sxfyzyyzsrbl_145: {
      name: '三项费用占营业总收入比率',
      before: '超过',
      after: '%'
    },
    yyzsrzzl_146: {
      name: '营业总收入增长率',
      before: '小于',
      after: '%'
    },
    gsmgsjlrzzl_147: {
      name: '归属母公司净利润增长率',
      before: '小于',
      after: '%'
    }
  }
};

const Program: React.FC = ({
  isLoading,
  isSuccess,
  // option,
  firstEarlyWarnCaseNamesOptions,
  secondEarlyWarnCaseNamesOptions,
  queryObj,
  changeInitialValues,
  priceData,
  financeData,
  defaultFinanceData,
  title,
  opinionData,
  isShowProgramModal,
  formData,
  tableData,
  tableLoading,
  total,
  pageNo,
  pageSize,
  pageSizeOptions,
  handleChangeShowProgramModal,
  handlePaginationChange,
  asyncDoSubmit,
  updateForm,
  asyncDeleteProgram,
  asyncHandleSearch,
  updateFormIsSuccessInTime,
  asyncGetTable,
  defaultyqyjData,
}) => {
  const [priceChange, setPriceChange] = useState({
    zzgzChange: false,
    cjjgChange: false,
    fxllChange: false,
    zqjgChange: false,
    scfxChange: false,
  });

  const [financeChange, setFinanceChange] = useState({
    jjx1Change: false,
    f1Change: false,
    f2Change: false,
    f3Change: false,
    f4Change: false,
    yyzbChange: false,
    lcsyChange: false,
    xsqlChange: false,
    zqyyChange: false,
    qyysChange: false,
    jjx2Change: false,
    gwyfChange: false,
    hsqyChange: false,
  });

  const [visible, setVisible] = useState(false);

  const [inputNumberValid, setInputNumberValid] = useState(true);

  const [modalData, setModalData] = useState({});

  const [initFinanceData, setInitFinanceData] = useState({})

  const [programName, setProgramName] = useState('');

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [formModal] = Form.useForm();

  useEffect(() => {
    form1.resetFields();
    form2.resetFields();
    form3.resetFields();
    formModal?.resetFields();
    setInitFinanceData(financeData ? JSON.parse(JSON.stringify(financeData)) : defaultFinanceData)
    if (isSuccess) {
      setVisible(false);
      setProgramName('');
      if (!queryObj?.earlyWarnCaseId) {
        form1.resetFields();
        form2.resetFields();
        form3.resetFields();
        formModal?.resetFields();
      }
      setPriceChange({
        ...defaultPriceChange,
      });
      setFinanceChange({
        ...defaultFinanceChange,
      });
      updateFormIsSuccessInTime(false);
      asyncGetTable && asyncGetTable();
    }
  }, [isSuccess, changeInitialValues]);

  const onChange = (key: string) => {
    // console.log(key);
  };

  useEffect(() => {
    // 隐含评级降级输入框disabled判断
    changeSelectImplied(opinionData?.impliedRatingDowngrade)
  }, [opinionData])

  const handlePriceBlur = ({
    val,
    name,
    childName,
    childBrothersName,
    isRow,
  }: {
    val: any;
    name: string;
    childName?: string;
    childBrothersName?: string;
    isRow?: boolean;
  }) => {
    if (childName && childBrothersName) {
      if (name === 'zzgz') {
        getZzgzRequired()
      }
      if (name === 'zqjg') {
        getZqjgRequired()
      }
      const childDefaultVal = priceData[name][childName];
      const childDefaultBrothersVal = priceData[name][childBrothersName];
      if (
        childDefaultVal == val &&
        childDefaultBrothersVal == form1.getFieldValue([name, childBrothersName])
      ) {
        setPriceChange({
          ...priceChange,
          [name + 'Change']: false,
        });
        return;
      }
      setPriceChange({
        ...priceChange,
        [name + 'Change']: form1.isFieldTouched(name),
      });
    } else if (!isRow) {
      if (priceData[name] == val) {
        setPriceChange({
          ...priceChange,
          [name + 'Change']: false,
        });
        return;
      }
      setPriceChange({
        ...priceChange,
        [name + 'Change']: form1.isFieldTouched(name),
      });
    } else {
      if (financeData[name][childName] == val) {
        setFinanceChange({
          ...financeChange,
          [childName + 'Change']: false,
        });
        return;
      }
      setFinanceChange({
        ...financeChange,
        [childName + 'Change']: form2.isFieldTouched(name),
      });
    }
  };

  const handleFinanceDisabled = (str, key, number) => {
    if (queryObj?.type === 'view') {
      return true
    } else {
      if (key === 'f5' && financeData?.logistic?.f5 === null) {
        return true
      }
    }
    return false;
  }

  const handleFinanceBlur = ({ val, str, key, number }) => {
    let num = val
    if (!val || val === '') {
      if (key === 'f4' || key === 'f5') {
        num = null
      } else {
        num = '0'
      }
    }
    let value = null
    if (num !== null) {
      value = toFixedNum(num, number);
      const integerNum = parseInt(value)
      if (String(integerNum).length > 10) {
        message.warning("系数值整数位不能超过十位")
        value = toFixedNum('9999999999', number)
      }
    }
    initFinanceData[str][key] = value;
    form2.setFieldsValue(JSON.parse(JSON.stringify(initFinanceData)));

    handlePriceBlur({
      val: value,
      name: str,
      childName: key,
      isRow: true,
    });
  };

  const handleFinanceZBBlur = ({ val, str, key, number }) => {
    let num = val
    if (!val || val === '') {
      num = '0'
    }
    if (val > 100) {
      num = '100'
    }
    if (val < 0) {
      num = '0'
    }

    let value = toFixedNum(num, number);
    if (form2ObjName[str][key]['after'] === '天') {
      value = parseInt(value)
    }

    initFinanceData[str][key] = value;
    form2.setFieldsValue(JSON.parse(JSON.stringify(initFinanceData)));

    handlePriceBlur({
      val: value,
      name: str,
      childName: key,
      isRow: true,
    });
  };

  const handleCreateName = e => {
    setProgramName(e.target.value);
  };

  const handleSubmit = async () => {
    let form1Status = false;
    let form2Status = false;
    let form3Status = false;
    await form1
      .validateFields()
      .then(values => {
        form1Status = true;
      })
      .catch(err => {
        console.log(err);
      });

    await form2
      .validateFields()
      .then(values => {
        form2Status = true;
      })
      .catch(err => {
        console.log(err);
      });

    await form3
      .validateFields()
      .then(vallues => {
        form3Status = true;
      })
      .catch(err => {
        console.log(err);
      });

    const table1 = cRef1?.current?.dataSource
    const table2 = cRef2?.current?.dataSource

    // 预警名称必填判断
    const codeOfearlyWarningName1Length = table1?.filter(it => !it.codeOfearlyWarningName || it.codeOfearlyWarningName.length === 0)
    const codeOfearlyWarningName2Length = table2?.filter(it => !it.codeOfearlyWarningName || it.codeOfearlyWarningName.length === 0)
    if (codeOfearlyWarningName1Length.length > 0) {
      message.error("一级预警名称不能为空！")
      return;
    } 
    if (codeOfearlyWarningName2Length.length > 0) {
      message.error("二级预警名称不能为空！")
      return;
    } 

    // 重要性必填判断
    const importance1Length = table1?.filter(it => !it.importance || it.importance.length === 0)
    const importance2Length = table2?.filter(it => !it.importance || it.importance.length === 0)
    if (importance1Length.length + importance2Length.length > 0) {
      message.error("重要性不能为空！")
      return;
    }
    
    // 舆情预警必填判断
    const table1Length = table1?.filter(it => it.earlyWarningThreshold === '')
    const table2Length = table2?.filter(it => it.earlyWarningThreshold === '')

    if (table1Length.length + table2Length.length > 0) {
      message.error("预警阈值不能为空！")
      return;
    }

    // 预警判定条件个数
    let form3Param = form3.getFieldsValue(true)
    const table1Data = cRef1?.current?.dataSource
    const table2Data = cRef2?.current?.dataSource
    if (form3Param.numberOfDeterminationConditions > table1Data.length + table2Data.length) {
      message.error("预警判定条件个数超出范围！")
      return;
    }

    const form1ChangeArr = Object.keys(priceChange).filter(item => priceChange[item]);
    const form2ChangeArr = Object.keys(financeChange).filter(item => financeChange[item]);
    // 创建和修改Logistic和z系数加提示信息
    const LogisticChangeArr = form2ChangeArr.filter(it => LogisticArr.includes(it))
    const zscoreChangeArr = form2ChangeArr.filter(it => zscoreArr.includes(it))
    let text = ''
    if (LogisticChangeArr.length > 0 && zscoreChangeArr.length > 0) {
      // text = 'Logistic回归系数和Z-score回归系数手工调整后会被月末自动回归计算结果覆盖，是否确认修改?'
      text = 'Logistic回归系数手工调整后会被月末自动回归计算结果覆盖，是否确认修改?'
    } else if (LogisticChangeArr.length > 0 && zscoreChangeArr.length == 0) {
      text = 'Logistic回归系数手工调整后会被月末自动回归计算结果覆盖，是否确认修改？'
    }
    //  else if (LogisticChangeArr.length == 0 && zscoreChangeArr.length > 0) {
    //   text = 'Z-score回归系数手工调整后会被月末自动回归计算结果覆盖，是否确认修改？'
    // }
    if (form1Status && form2Status && form3Status) {
      if (!queryObj.earlyWarnCaseId) {
          setModalData({
            type: 'created',
            title: '创建预警方案',
            children: (
              <div>
                <ModalTextLeft>
                  {text}
                </ModalTextLeft>
                <br />
                <ModalContent>
                    <Form form={formModal} initialValues={{ names: '' }} autoComplete="off">
                      <Form.Item 
                        label="方案名称：" 
                        rules={[
                          {
                            required: true,
                            message: '',
                          },
                        ]}
                        name="names">
                        <Input />
                      </Form.Item>
                    </Form>
                </ModalContent>
              </div>
            ),
          });
        
        setVisible(true);
        return;
      }
      
      // 舆情预警是否有变更
      let yqFlag = 0
      const form3Param = form3.getFieldsValue(true)
      const table1Change = cRef1?.current?.changeItem
      const table2Change = cRef2?.current?.changeItem
      if (defaultyqyjData.numberOfDeterminationConditions !== form3Param.numberOfDeterminationConditions) {
        yqFlag++
      }
      if (defaultyqyjData.impliedRatingDowngrade !== form3Param.impliedRatingDowngrade) {
        yqFlag++
      }

      if (defaultyqyjData.impliedRatingDowngradeFactor !== form3Param.impliedRatingDowngradeFactor) {
        yqFlag++
      }
      
      yqFlag = yqFlag + table1Change.length
      yqFlag = yqFlag + table2Change.length
      
      
      if (form1ChangeArr.length + form2ChangeArr.length + yqFlag) {
        setModalData({
          type: 'update',
          title: '方案变更',
          children: (
            <ModalTextLeft>
              <div>{text}</div>
              您确定要对【{title}】方案所修改的【
              <span style={{ color: 'red' }}>
                {' '}
                {form1ChangeArr.length + form2ChangeArr.length + yqFlag}{' '}
              </span>
              】条指标进行变更操作？
            </ModalTextLeft>
          ),
        });
        setVisible(true);
      } else {
        message.warning('暂无变更');
      }
    } else {
      message.warning('请输入所有必填项');
    }
  };

  const handleResetFields = () => {
    setModalData({
      type: 'reset',
      title: '恢复默认',
      children: (
        <ModalText>您确定要对所设置的价格预警、财务预警、舆情预警恢复为默认设置？</ModalText>
      ),
    });
    setVisible(true);
  };

  const handleConfirm = async type => {
    let params = null;
    let form3Param = form3.getFieldsValue(true)
    const table1Data = cRef1?.current?.dataSource
    const table2Data = cRef2?.current?.dataSource

    cRef1?.current?.rowSelection && cRef1.current.rowSelection?.onChange([]);
    cRef2?.current?.rowSelection && cRef2.current.rowSelection?.onChange([]);

    form3Param.firstEarlyWarnings = table1Data.map(it => {
      if (it.id.indexOf('newItem') > -1 || it.id == '84') {
        return {
          "codeOfearlyWarningName": it.codeOfearlyWarningName,
          "importance": it.importance,
          "isAttenuation": it.isAttenuation,
          "attenuationFactor": it.attenuationFactor,
          "earlyWarningThreshold": it.earlyWarningThreshold,
        }
      }
      return it
    })
    form3Param.secondEarlyWarnings = table2Data.map(it => {
      if (it.id.indexOf('newItem') > -1 || it.id == '85') {
        return {
          "codeOfearlyWarningName": it.codeOfearlyWarningName,
          "importance": it.importance,
          "isAttenuation": it.isAttenuation,
          "attenuationFactor": it.attenuationFactor,
          "earlyWarningThreshold": it.earlyWarningThreshold,
        }
      }
      return it
    })

    // 处理重要性多选，因后端改动较大，在前端进行转换
    form3Param.firstEarlyWarnings.forEach(it => {
      if (it?.importance && it?.importance?.length > 0) {
        it.importance = it.importance.toString()
      }
    })
    form3Param.secondEarlyWarnings.forEach(it => {
      if (it?.importance && it?.importance?.length > 0) {
        it.importance = it.importance.toString()
      }
    })
    switch (type) {
      case 'created':
        const names = formModal.getFieldValue('names')
        if (!names) {
          message.warning('请输入方案名称');
          return;
        }
        if (names.length > 100) {
          message.warning('方案名称长度超出限制，最多可输入100个字符。');
          return;
        }
        params = {
          data: {
            JGYJ: form1.getFieldsValue(true),
            CWYJ: form2.getFieldsValue(true),
            YQYJ: {...form3Param},
          },
          earlyWarnCaseName: names,
        };
        asyncDoSubmit && (await asyncDoSubmit(params));
        break;
      case 'update':
        params = {
          earlyWarnCaseId: queryObj.earlyWarnCaseId,
          data: {
            JGYJ: form1.getFieldsValue(true),
            CWYJ: form2.getFieldsValue(true),
            YQYJ: {...form3Param},
          },
        };
        asyncDoSubmit && (await asyncDoSubmit(params));
        break;
      case 'reset':
        setPriceChange({
          ...defaultPriceChange,
        });
        setFinanceChange({
          ...defaultFinanceChange,
        });
        form1.resetFields();
        form2.resetFields();
        form3.resetFields();
        setInitFinanceData(financeData ? JSON.parse(JSON.stringify(financeData)) : defaultFinanceData)
        // 隐含评级降级输入框
        changeSelectImplied(opinionData?.impliedRatingDowngrade);
        cRef1?.current?.resetTable(JSON.parse(JSON.stringify(defaultyqyjData?.firstEarlyWarnings)))
        cRef2?.current?.resetTable(JSON.parse(JSON.stringify(defaultyqyjData?.secondEarlyWarnings)))
        setVisible(false);
        break;
    }
  };

  const renderCWYJFormRow = ({ str, key, number }) => {
    const formNode = (
    <FormItemRow isChange={financeChange[key + 'Change']} className="cwzb-tab">
      <Form.Item className='cwzb-form-title'>
        <span>{form2ObjName[str][key]['name']}</span>
      </Form.Item>
      <div className='cwzb-form'>
        <span>{form2ObjName[str][key]['before']} </span>
        <Form.Item
          name={[str, key]}
        >
          <Input
            key={key}
            onBlur={e => handleFinanceZBBlur({ val: e.target.value, str, key, number })}
            size="small"
            disabled={handleFinanceDisabled(str, key, number)}
          />
        </Form.Item>
        <span> {form2ObjName[str][key]['after']}</span>
      </div>
      
    </FormItemRow>
  )
  return formNode
};

  const renderFormRow = ({ str, key, number }) => {
    return (
      <FormItemRow isChange={financeChange[key + 'Change']}>
        <Form.Item >
          {(str === 'logistic' && (key !== 'f4' && key !== 'f5')) || str === 'zscore' ? (
            <span className='program-form-item-required'></span>
          ) : (<span></span>)
          }
          <span>{form2ObjName[str][key]}</span>
        </Form.Item>
        <Form.Item
          name={[str, key]}
        >
          <Input
            key={key}
            onBlur={e => handleFinanceBlur({ val: e.target.value, str, key, number })}
            size="small"
            disabled={handleFinanceDisabled(str, key, number)}
          />
        </Form.Item>
      </FormItemRow>
    )
  }

  const renderModal = ({ type, title, children }) => (
    <Modal
      wrapClassName="early-warning-program-modal"
      title={title}
      centered
      visible={visible}
      maskClosable={false}
      onCancel={() => setVisible(false)}
      footer={[
        <Button className="footer-primary-btn" type="primary" onClick={() => handleConfirm(type)}>
          {type === 'created' ? '提交' : '确定'}
        </Button>,
        <Button onClick={() => setVisible(false)}>取消</Button>,
      ]}
    >
      {children}
    </Modal>
  );

  const changeSelectImplied = (e) => {
    setInputNumberValid(e == '2') // disabled校验
    getRequired() //必填校验
    // 清空状态
    if (e === '2') {
      form3.setFields([
        {
          name:'impliedRatingDowngradeFactor', value:'', errors:null
        }
      ])
    }
  }
  
  // 隐含评级降级disabled校验
  const impliedRatingDisabled = () => {
    return inputNumberValid || queryObj?.type === 'view'
  }

  const handleGoBack = () => {
    go({ url: '/abcAnalysis/publicSentiment/early-warning-program' });
  };

  const secondEarlyWarnings = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (text, record, index) => `${index+1}`
    },
    {
      title: '一级预警名称',
      dataIndex: 'codeOfearlyWarningName',
      key: 'codeOfearlyWarningName',
    },
    {
      title: '重要性',
      dataIndex: 'importance',
      key: 'importance',
    },
    {
      title: '是否衰减计算/衰减因子',
      dataIndex: 'isAttenuation',
      key: 'isAttenuation',
    },
    {
      title: '预警阈值',
      dataIndex: 'earlyWarningThreshold',
      key: 'earlyWarningThreshold'
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const [maxNum, getMaxNum] = useState(100)

  const getMaxNumber = () => {
    if (cRef1.current && cRef2.current) {
      const num1 = cRef1.current.dataSource ? cRef1.current.dataSource.length : 0
      const num2 = cRef2.current.dataSource ? cRef2.current.dataSource.length : 0
      getMaxNum(num1 + num2)
    }
  }

  // 隐含评价降级
  const getRequired = () => {
    return form3.getFieldValue('impliedRatingDowngrade') === '1'
  }

  const cRef1 = useRef(null);
  const cRef2 = useRef(null);

  const isOnlyOne = (selectLength) => {
    if(cRef1?.current && cRef1.current.dataSource && cRef2?.current && cRef2.current.dataSource){
      const length = cRef1.current.dataSource.length + cRef2.current.dataSource.length - selectLength;
      return length? false : true
    }
    return true
  };
  // 中债估值到期收益率上升必填校验
  const getZzgzRequired = () => {
    const zzgzday = form1.getFieldValue(['zzgz', 'day'])
    const zzgzbp = form1.getFieldValue(['zzgz', 'bp'])
    if ((zzgzday && zzgzday !== '') || (zzgzbp && zzgzbp !== '')) {
      return true 
    } else {
      form1.setFields([
        {
          name:['zzgz', 'day'], value:'', errors:null
        },
        {
          name:['zzgz', 'bp'], value:'', errors:null
        },
      ])
      return false
    }
  }

  // 证券价格异常波动必填校验
  const getZqjgRequired = () => {
    const zqjgday = form1.getFieldValue(['zqjg', 'day'])
    const zqjgdf = form1.getFieldValue(['zqjg', 'df'])
    if ((zqjgday && zqjgday !== '') || (zqjgdf && zqjgdf !== '')) {
      return true 
    } else {
      form1.setFields([
        {
          name:['zqjg', 'day'], value:'', errors:null
        },
        {
          name:['zqjg', 'df'], value:'', errors:null
        },
      ])
      return false
    }
  }

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <Title>
            {queryObj?.earlyWarnCaseId && (
              <Back onClick={handleGoBack}>
                <LeftOutlined />
                返回
              </Back>
            )}
            <span>{title}</span>
          </Title>

          <Tabs defaultActiveKey="1" size="small" onChange={onChange}>
            {tags.map(item => (
              <Tabs.TabPane tab={item.name} key={item.id} forceRender={true}>
                <FormContainer>
                  <FormContent>
                    {item.id === '1' && (
                      <>
                        <FormHead>
                          <HeadItem1>预警指标</HeadItem1>
                          <HeadItem2>预警阀值设定</HeadItem2>
                        </FormHead>
                        {priceData && (
                          <Form initialValues={priceData} form={form1}>
                            <FormItemRow isChange={priceChange.zzgzChange}>
                              <Form.Item>
                                <span>中债估值到期收益率上升</span>
                              </Form.Item>
                              <Form.Item>
                                <Form.Item
                                  noStyle
                                  name={['zzgz', 'day']}
                                  rules={[{ 
                                    required: getZzgzRequired(), 
                                    message: '' 
                                  }]}
                                >
                                  <InputNumber
                                    size="small"
                                    min={1}
                                    max={10}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'zzgz',
                                        childName: 'day',
                                        childBrothersName: 'bp',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> 天上涨超过 </span>
                                <Form.Item noStyle 
                                  name={['zzgz', 'bp']}
                                  rules={[{ 
                                    required: getZzgzRequired(), 
                                    message: ''
                                  }]}
                                >
                                  <InputNumber
                                    size="small"
                                    min={0}
                                    max={100}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'zzgz',
                                        childName: 'bp',
                                        childBrothersName: 'day',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> BP </span>
                              </Form.Item>
                            </FormItemRow>
                            <FormItemRow isChange={priceChange.cjjgChange}>
                              <Form.Item>
                                <span>成交价偏离</span>
                              </Form.Item>
                              <Form.Item>
                                <span> 今日最低价比昨日收盘价低 </span>
                                <Form.Item noStyle name="cjjg">
                                  <InputNumber
                                    size="small"
                                    min={0}
                                    max={100}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'cjjg',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> %以上 </span>
                              </Form.Item>
                            </FormItemRow>
                            <FormItemRow isChange={priceChange.fxllChange}>
                              <Form.Item>
                                <span>发行利率过高</span>
                              </Form.Item>
                              <Form.Item>
                                <span> 最终票面发行利率超过同行业同期限同评级 </span>
                                <Form.Item noStyle name="fxll">
                                  <InputNumber
                                    size="small"
                                    min={0}
                                    max={100}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'fxll',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> BP </span>
                              </Form.Item>
                            </FormItemRow>
                            <FormItemRow isChange={priceChange.zqjgChange}>
                              <Form.Item>
                                <span>证券价格异常波动</span>
                              </Form.Item>
                              <Form.Item>
                                <span> 连续 </span>
                                <Form.Item noStyle 
                                  name={['zqjg', 'day']}
                                  rules={[{ 
                                    required: getZqjgRequired(), 
                                    message: '' 
                                  }]}
                                >
                                  <InputNumber
                                    size="small"
                                    min={1}
                                    max={10}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'zqjg',
                                        childName: 'day',
                                        childBrothersName: 'df',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> 个交易日收盘价跌幅累计达到 </span>
                                <Form.Item noStyle 
                                  name={['zqjg', 'df']}
                                  rules={[{ 
                                    required: getZqjgRequired(), 
                                    message: '' 
                                  }]}
                                >
                                  <InputNumber
                                    size="small"
                                    min={0}
                                    max={100}
                                    parser={text => {
                                      return /^\d+$/.test(text) ? text : parseInt(text);
                                    }}
                                    onBlur={e =>
                                      handlePriceBlur({
                                        val: e.target.value,
                                        name: 'zqjg',
                                        childName: 'df',
                                        childBrothersName: 'day',
                                      })
                                    }
                                    disabled={queryObj?.type === 'view'}
                                  />
                                </Form.Item>
                                <span> % </span>
                              </Form.Item>
                            </FormItemRow>
                          </Form>
                        )}
                      </>
                    )}
                    {item.id === '2' && (
                      <>
                        <Tabs defaultActiveKey="1">
                          {financialTags.map(it => (
                            <Tabs.TabPane tab={it.name} key={it.id} forceRender={true}>
                              {it.id === '1' && (
                                <>
                                  <FormHead>
                                    <HeadItem1>系数名称</HeadItem1>
                                    <HeadItem2>系数值设定</HeadItem2>
                                  </FormHead>
                                  {financeData && (
                                    <Form initialValues={financeData} form={form2} autoComplete="off">
                                      <FormGroup>
                                        {financeData.logistic &&
                                          Object.keys(financeData.logistic).map(key =>
                                            renderFormRow({
                                              str: 'logistic',
                                              key,
                                              number: 4,
                                            })
                                          )}
                                      </FormGroup>
                                    </Form>
                                  )}
                                </>
                              )}
                              {it.id === '2' && (
                                <>
                                  <FormHead>
                                    <HeadItem1>系数名称</HeadItem1>
                                    <HeadItem2>系数值设定</HeadItem2>
                                  </FormHead>
                                  {financeData && (
                                    <Form initialValues={financeData} form={form2} autoComplete="off">
                                      <FormGroup>
                                        {/* <FormGroupTitle>Z-score回归预警</FormGroupTitle> */}
                                        {financeData.zscore &&
                                          Object.keys(financeData.zscore).map(key => {
                                            return renderFormRow({
                                              str: 'zscore',
                                              key,
                                              number: 2,
                                            })
                                          }
                                            
                                          )}
                                      </FormGroup>
                                    </Form>
                                  )}
                                </>
                              )}
                              {it.id === '3' && (
                                <>
                                  <FormHead>
                                    <HeadItem1>预警指标</HeadItem1>
                                    <HeadItem2>预警阀值设定</HeadItem2>
                                  </FormHead>
                                  {financeData && (
                                    <Form initialValues={financeData} form={form2} autoComplete="off">
                                      <FormGroup>
                                        {financeData.cwzb &&
                                          Object.keys(financeData.cwzb).map(key =>{
                                            return renderCWYJFormRow({
                                              str: 'cwzb',
                                              key,
                                              number: 2,
                                            })
                                          }
                                          )}
                                      </FormGroup>
                                    </Form>
                                  )}
                                </>
                              )}
                            </Tabs.TabPane>
                          ))}
                        </Tabs>
                      </>
                    )}
                    {item.id === '3' && (
                      <>
                        <TablesForm>
                          <div className='table-opt-area'>
                            <FirstTable
                              ref={cRef1}
                              isShow={queryObj?.type === 'view'}
                              tableData={opinionData.firstEarlyWarnings}
                              ewOptions={firstEarlyWarnCaseNamesOptions}
                              isOnlyOne={isOnlyOne}
                            />
                          </div>
                          
                          <div className='table-opt-area'>
                            <SecondTable 
                              isShow={queryObj?.type === 'view'}
                              ref={cRef2}
                              tableData={opinionData.secondEarlyWarnings}
                              ewOptions={secondEarlyWarnCaseNamesOptions}
                              isOnlyOne={isOnlyOne}
                            />
                          </div>
                          
                          <div className='number-determination'>
                            <Form layout={'inline'} form={form3} initialValues={opinionData}>
                              <Form.Item
                                label="隐含评级降级"
                                rules={[
                                  {
                                    required: true,
                                    message: ''
                                  },
                                ]}
                                name="impliedRatingDowngrade"
                                className='sel-input-area'
                              >
                                <Select
                                  placeholder="请选择"
                                  className='sel-bool'
                                  disabled={queryObj?.type === 'view'}
                                  onChange={(e) => changeSelectImplied(e)}
                                >
                                  <Option value="1">是</Option>
                                  <Option value="2">否</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name="impliedRatingDowngradeFactor"
                                rules={[
                                  {
                                    message: '',
                                    required: getRequired()
                                  },
                                ]}
                                className='implied-rating'
                              >
                                {/* <Input /> */}
                                <InputNumber
                                  size="small"
                                  className='input-height'
                                  // defaultValue={opinionData.impliedRatingDowngradeFactor}
                                  min={1}
                                  max={20}
                                  parser={text => {
                                    return /^\d+$/.test(text) ? text : parseInt(text);
                                  }}
                                  disabled={impliedRatingDisabled()}
                                />
                              </Form.Item>
                              <Form.Item
                                label="预警判定条件个数"
                                rules={[
                                  {
                                    required: true,
                                    message: ''
                                  },
                                ]}
                                name="numberOfDeterminationConditions"
                              >
                                {/* <Input /> */}
                                <InputNumber
                                  size="small"
                                  className='input-height'
                                  min={1}
                                  onFocus={getMaxNumber}
                                  disabled={queryObj?.type === 'view'}
                                  max={maxNum}
                                  parser={text => {
                                    return /^\d+$/.test(text) ? text : parseInt(text);
                                  }}
                                />
                              </Form.Item>
                            </Form>
                          </div>
                        </TablesForm>
                      </>
                    )}

                    <ProgramModal
                      isShow={isShowProgramModal}
                      formData={formData}
                      tableData={tableData}
                      tableLoading={tableLoading}
                      pagination={{
                        total: total,
                        pageNo: pageNo,
                        pageSize: pageSize,
                        pageSizeOptions: pageSizeOptions,
                      }}
                      handleChangeShowProgramModal={handleChangeShowProgramModal}
                      handlePaginationChange={handlePaginationChange}
                      updateForm={updateForm}
                      deleteProgram={asyncDeleteProgram}
                    />
                  </FormContent>
                </FormContainer>
              </Tabs.TabPane>
            ))}
          </Tabs>
          
          {queryObj?.type !== 'view' && (
            <Footer>
              <Button type="primary" style={{ cursor: 'default' }} onClick={handleSubmit}>
                {queryObj?.earlyWarnCaseId ? '更新方案' : '创建方案'}
              </Button>
              <Button style={{ cursor: 'default' }} onClick={handleResetFields}>
                {queryObj?.earlyWarnCaseId ? '方案还原' : '恢复默认'}
              </Button>
            </Footer>
          )}
          {renderModal(modalData)}
        </>
      )}
    </Container>
  );
};

export default getHocComp(Program);
