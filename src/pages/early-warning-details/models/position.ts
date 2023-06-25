import { fromJS } from 'immutable';
import { message } from 'antd';
import moment from 'moment';

import { format } from '@/utils/helper';

import {
  earlyWarningDetailsService,
  earlyWarningProgramService,
  setAlertPoolService,
} from '@/config/di.config';

const key = 'positionContext';

export const positionContext = {
  state: {
    selectData: [],
    selectedRowKeys: [],

    formData: {
      searchDate: moment().subtract(1, 'days'),
      consignorId: null,
      managerId: null,
      entrustId: null,
      pfIds: [],
      mainName: [],
      earlyWarnPlan: null,
      crsScore: [],
      crsScore5D: [],
      crsScore30D: [],
    },
    earlyWarnPlanLabel: '',
    tableData: [],
    defaultEarlyWarnPlansData: [], // 默认的预警方案数据
    selectOptions: {
      wtr: [],
      tgr: [],
      str: [],
    }, // 委托人、投管人、受托人下拉数据
    pageSize: 100, // 每页展示条数
    pageNo: 1, // 当前页码
    total: 0, // 总条数
    pageSizeOptions: [100, 500, 1000],
    crsScoreData: [], // 本日信用压力数据
    crsScore5DData: [], // 五日信用压力数据
    crsScore30DData: [], // 三十日信用压力数据
    compositeTreeConditionsData: [], // 组合名称下拉框数据
    earlyWarnPlansData: [], // 预警方案下拉数据
    bizdictData: [], // 表格中需要的数据
  },
  sync: {
    updatePositionFormData(state, params, { mutations, getState }) {
      mutations.setState(getState().setIn([key, 'formData'], fromJS(params)));
    },
    updatePositionEarlyWarnPlanLabel(state, params, { mutations, getState }) {
      mutations.setState(getState().setIn([key, 'earlyWarnPlanLabel'], params));
    },
    updatePositionDefaultEarlyWarnPlansData(state, params, { mutations, getState }) {
      mutations.setState(getState().setIn([key, 'defaultEarlyWarnPlansData'], fromJS(params)));
    },

    handlePositionChange(state, params, { mutations, getState }) {
      mutations.setState(
        getState()
          .setIn([key, 'pageNo'], params.pageNo)
          .setIn([key, 'pageSize'], params.pageSize)
      );
    },
  },
  async: {
    // 初始化
    async handlePositionInit(state, params, { mutations, getState }) {
      mutations.asyncGetConditions();
      mutations.asyncGetCrsScore();
      mutations.asyncGetCrsScore5D();
      mutations.asyncGetCrsScore30D();
      mutations.asyncGetCompositeTreeConditions();
    },

    // 组合名称下拉框数据
    async getCompositeTreeConditions(state, params, { mutations, getState }) {
      try {
        const { code, msg, data, total } = await setAlertPoolService.getCompositeTreeConditions({
          pfName: '',
        });

        if (code === 200) {
          mutations.setState(
            getState().setIn([key, 'compositeTreeConditionsData'], fromJS(data || []))
          );
        } else {
          // message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 获取委托人、投管人、受托人下拉数据
    async getConditions(state, params, { mutations, getState }) {
      const obj = ['wtr', 'str', 'tgr'];
      try {
        const { code, msg, data } = await setAlertPoolService.getConditions(obj);
        if (code === 200) {
          mutations.setState(
            getState().setIn(
              [key, 'selectOptions'],
              fromJS({
                wtr: data.wtr || [],
                str: data.str || [],
                tgr: data.tgr || [],
              })
            )
          );
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 获取本日信用压力
    async getCrsScore(state, params, { mutations, getState }) {
      try {
        const { code, msg, data } = await earlyWarningDetailsService.oneDayCreditPressure();
        if (code === 200) {
          mutations.setState(getState().setIn([key, 'crsScoreData'], fromJS(data || [])));
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 五日内信用压力
    async getCrsScore5D(state, params, { mutations, getState }) {
      try {
        const { code, msg, data } = await earlyWarningDetailsService.fiveDayCreditPressure();
        if (code === 200) {
          mutations.setState(getState().setIn([key, 'crsScore30DData'], fromJS(data || [])));
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 三十日内信用压力
    async getCrsScore30D(state, params, { mutations, getState }) {
      try {
        const { code, msg, data } = await earlyWarningDetailsService.thirtyDayCreditPressure();
        if (code === 200) {
          mutations.setState(getState().setIn([key, 'crsScore5DData'], fromJS(data || [])));
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 获取表格
    async getPositionTableInit(state, params, { mutations, getState }) {
      const formData = params
        ? params
        : getState()
            .getIn([key, 'formData'])
            .toJS();
      const obj = {
        ...formData,
        searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format('YYYYMMDD'),
        pageSize: getState().getIn([key, 'pageSize']),
        pageNo: getState().getIn([key, 'pageNo']),
      };
      try {
        const { code, msg, data, total } = await earlyWarningDetailsService.getPositionDetailInfo(
          obj
        );

        if (code === 200) {
          const datas = data?.map(item => ({
            ...item,
            cost: item?.cost && item.cost !== '-' ? format(item.cost) : item.cost,
            netMv: item?.netMv && item.netMv !== '-' ? format(item.netMv) : item.netMv,
          }));

          mutations.setState(
            getState()
              .setIn([key, 'tableData'], fromJS(datas || []))
              .setIn([key, 'total'], total)
          );
        } else {
          message.error(msg);
          mutations.setState(
            getState()
              .setIn([key, 'tableData'], fromJS([]))
              .setIn([key, 'total'], 0)
          );
        }
      } catch (err) {
        mutations.setState(
          getState()
            .setIn([key, 'tableData'], fromJS([]))
            .setIn([key, 'total'], 0)
        );
        console.log(err);
      }
    },
  },

  inTime: {
    async updatePositionPageNo(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'pageNo'], params));
    },
  },
};
