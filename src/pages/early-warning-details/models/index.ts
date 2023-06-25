import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { positionContext } from './position';
import { setData, setState } from '@/utils/mutations';
import { earlyWarningDetailsService, earlyWarningProgramService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

const dateFormat = 'YYYY-MM-DD';
const tags = [
  { id: '1', name: '舆情预警' },
  { id: '2', name: '价格预警' },
  { id: '3', name: '财务模型预警' },
  { id: '4', name: '持仓' },
];

export default lugiax.register({
  model: 'earlyWarningDetailsModel',
  state: {
    formData: {
      searchDate: moment().subtract(1, 'days'),
      earlyWarnPool: null,
      earlyWarnPlan: null,
      holdPositionStatus: null,
      defaultStatus: null,
      mainName: [],
    },
    selectExcelParams: {
      earlyWarnPoolLabel: '',
      earlyWarnPlanLabel: '',
    },
    searchSelectData: {},
    tableData: [],
    total: 0, // 总条数
    pageNo: 1, // 当前页码,
    pageSize: 100, // 每页展示条数
    pageSizeOptions: [100, 500, 1000],
    mainChart1: [],
    mainChart2: [],
    isShowModal: false,
    currentRow: {},
    // currentId: null,
    childData: {
      chart: {},
      tableData: [],
    },
    currentTag: '1',
    tags,
    childLoading: false,
    childTotal: 0, // 子总条数
    childPageNo: 1, // 当前页码,
    childPageSize: 100, // 每页展示条数
    childTableLoading: false,
    bizdictPositionData: [], // 持仓数据
    bizdictDefaultData: [], // 违约数据
    defaultEarlyWarnPlansData: [], // 默认的预警方案数据
    positionContext: positionContext.state,
    earlyWarnPoolsData: [], // 预警池下拉数据
    earlyWarnPlansData: [], // 主体维度预警方案下拉框数据
  },

  aopConfig: createLoadingAop({
    tableLoading: { async: ['handleSearch'] },
    chartLoading: { async: ['handleDistribution'] },
    positionTableLoding: { async: ['getPositionTableInit'] },
    // screenContext: { async: ['getScreenInit'] },
    // childLoading : {
    //   async: ["handleCurrentSaerch"]
    // }
  }),

  mutations: {
    sync: {
      ...positionContext.sync,

      handleChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageNo'], params.pageNo)
            .setIn(['pageSize'], params.pageSize)
        );
      },
      updateTags(state, params, { mutations, getState }) {
        // console.log(2222, params);
        if (!params) {
          const tagList = getState()
            .getIn(['tags'])
            .toJS()
            .filter(item => item.id !== '4');

          mutations.setState(
            getState()
              .setIn(['tags'], fromJS(tagList))
              .setIn(['currentTag'], '1')
          );
        } else {
          mutations.setState(
            getState()
              .setIn(['tags'], fromJS(tags))
              .setIn(['currentTag'], '1')
          );
        }
      },
      updateCurrentTag(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['currentTag'], params)
            .setIn(['childPageNo'], 1)
            .setIn(['childPageSize'], 100)
        );
      },
      handleChildChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['childPageNo'], params.pageNo)
            .setIn(['childPageSize'], params.pageSize)
        );
      },
      updateFormData(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['formData'], fromJS(params)));
      },
      updateSelectExcelParams(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['selectExcelParams'], fromJS(params)));
      },
      updateDefaultEarlyWarnPlansData(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['defaultEarlyWarnPlansData'], fromJS(params)));
      },
      setState,
    },
    async: {
      ...positionContext.async,

      async init(state, params, { mutations, getState }) {
        // mutations.asyncGetSearchMessage();
        // mutations.asyncHandleSearch();
        // mutations.asyncHandleDistribution();
        mutations.asyncBizdictPosition();
        mutations.asyncBizdictDefault();
        mutations.asyncGetEarlyWarnPools();
        mutations.asyncGetEarlyWarnPlans();
      },

      // 预警方案下拉框数据
      async getEarlyWarnPlans(state, params, { mutations, getState }) {
        try {
          const { code, msg, data } = await earlyWarningDetailsService.getEarlyWarnPlans();
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['positionContext', 'earlyWarnPlansData'], fromJS(data || []))
                .setIn(['earlyWarnPlansData'], fromJS(data || []))
            );
          } else {
            // message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 下拉-持仓
      async bizdictPosition(state, params, { mutations, getState }) {
        try {
          const { code, data, msg } = await earlyWarningDetailsService.bizdictPosition();
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['bizdictPositionData'], fromJS(data || []))
                .setIn(['positionContext', 'bizdictData'], fromJS(data || []))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 下拉-违约
      async bizdictDefault(state, params, { mutations, getState }) {
        try {
          const { code, data, msg } = await earlyWarningDetailsService.bizdictDefault();
          if (code === 200) {
            mutations.setState(getState().setIn(['bizdictDefaultData'], fromJS(data || [])));
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 预警池下拉框数据
      async getEarlyWarnPools(state, params, { mutations, getState }) {
        try {
          const { code, msg, data } = await earlyWarningDetailsService.getEarlyWarnPools();
          if (code === 200) {
            mutations.setState(getState().setIn(['earlyWarnPoolsData'], fromJS(data || [])));
          } else {
            // message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 暂时不用了
      async getSearchMessage(state, params, { mutations, getState }) {
        try {
          const obj = {
            searchType: 'earlyWarnPool,mainName,earlyWarnPlan,holdPositionStatus,defaultStatus',
          };
          const { code, msg, data } = await earlyWarningDetailsService.getSearchMessage(obj);
          // console.log(111111, code, msg, data);
          if (code === 200) {
            if (data) {
              mutations.setState(getState().setIn(['searchSelectData'], fromJS(data)));
            }
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async handleSearch(state, params, { mutations, getState }) {
        const formData = params
          ? params
          : getState()
              .getIn(['formData'])
              .toJS();
        const obj = {
          ...formData,
          searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format(
            'YYYYMMDD'
          ),
          pageSize: getState().get('pageSize'),
          pageNo: getState().get('pageNo'),
        };
        // mutations.updateIsShowModalInTime(false);
        try {
          const { code, msg, data, total } = await earlyWarningDetailsService.getSubjectDetailInfo(
            obj
          );
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data || []))
                .setIn(['total'], total)
                .setIn(['currentRow'], fromJS(data.length ? data[0] : {}))
                .setIn(['currentTag'], '1')
            );
            if (data && data.length) {
              mutations.asyncHandleCurrentSaerch(true);
              mutations.updateTags(data[0].positionStatus === '01');
            }
          } else {
            message.error(msg);
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS([]))
                .setIn(['total'], 0)
                .setIn(['currentRow'], fromJS({}))
                .setIn(['currentTag'], '1')
            );
          }
        } catch (err) {
          mutations.setState(
            getState()
              .setIn(['tableData'], fromJS([]))
              .setIn(['total'], 0)
              .setIn(['currentRow'], fromJS({}))
              .setIn(['currentTag'], '1')
          );
          console.log(err);
        }
      },

      // 新-信用压力
      async handleDistribution(state, params, { mutations, getState }) {
        const formData = params
          ? params
          : getState()
              .getIn(['formData'])
              .toJS();
        const obj = {
          ...formData,
          searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format(
            'YYYYMMDD'
          ),
          pageSize: getState().get('pageSize'),
          pageNo: getState().get('pageNo'),
        };
        try {
          const { code, data, msg } = await earlyWarningDetailsService.distribution(obj);
          if (code === 200) {
            mutations.setState(getState().setIn(['mainChart1'], fromJS(data || [])));
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 暂时不用了
      async handleSearch1(state, params, { mutations, getState }) {
        const formData = params
          ? params
          : getState()
              .getIn(['formData'])
              .toJS();
        const obj = {
          ...formData,
          searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format(
            'YYYYMMDD'
          ),
          pageSize: getState().get('pageSize'),
          pageNo: getState().get('pageNo'),
        };
        // mutations.updateIsShowModalInTime(false);
        try {
          const {
            code,
            msg,
            data,
            chart1,
            chart2,
            total,
          } = await earlyWarningDetailsService.search(obj);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data || []))
                .setIn(['total'], total)
                .setIn(['mainChart1'], fromJS(chart1 || []))
                .setIn(['mainChart2'], fromJS(chart2 || []))
                // .setIn(['currentId'], data.length ? data[0].id : null)
                .setIn(['currentRow'], fromJS(data.length ? data[0] : {}))
                .setIn(['currentTag'], '1')
            );
            if (data && data.length) {
              mutations.asyncHandleCurrentSaerch(true);
            }
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async handleCurrentSaerch(state, params, { mutations, getState }) {
        if (params) {
          mutations.updateChildLoadingInTime(true);
        } else {
          mutations.updateChildTableLoadingInTime(true);
        }

        mutations.clearChildInfoInTime();

        const formData = getState()
          .getIn(['formData'])
          .toJS();

        const obj = {
          // id: getState().getIn(['currentId']),
          comId: getState()
            .getIn(['currentRow'])
            .toJS().comId,
          requireChart: params,
          // tabType: getState().getIn(['currentTag']),
          pageSize: getState().get('childPageSize'),
          pageNo: getState().get('childPageNo'),
          ...formData,
          searchDate: moment(formData.searchDate ? formData.searchDate : moment()).format(
            'YYYYMMDD'
          ),
        };

        let type = 'getOpinionsInfo';
        switch (getState().getIn(['currentTag'])) {
          case '2':
            type = 'getPriceInfo';
            break;
          case '3':
            type = 'getFinanceInfo';
            break;
          case '4':
            type = 'getPositionInfo';
            break;
        }

        try {
          const { code, msg, total, data, chart } = await earlyWarningDetailsService[type](obj);

          if (code === 200) {
            const chartData = getState()
              .getIn(['childData'])
              .toJS().chart;
            const datas = {
              tableData: data || [],
              chart: params ? chart || {} : chartData,
            };
            mutations.setState(
              getState()
                .setIn(['childData'], fromJS(datas))
                .setIn(['childTotal'], total)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        } finally {
          if (params) {
            mutations.updateChildLoadingInTime(false);
          } else {
            mutations.updateChildTableLoadingInTime(false);
          }
        }
      },

      // 暂时不用了
      async handleCurrentSaerch1(state, params, { mutations, getState }) {
        if (params) {
          mutations.updateChildLoadingInTime(true);
        } else {
          mutations.updateChildTableLoadingInTime(true);
        }
        const obj = {
          // id: getState().getIn(['currentId']),
          subjectId: getState()
            .getIn(['currentRow'])
            .toJS().id,
          requireChart: params,
          tabType: getState().getIn(['currentTag']),
          pageSize: getState().get('childPageSize'),
          pageNo: getState().get('childPageNo'),
        };
        try {
          const { code, msg, total, data, chart } = await earlyWarningDetailsService.searchTab(obj);

          if (code === 200) {
            const chartData = getState()
              .getIn(['childData'])
              .toJS().chart;
            const datas = {
              tableData: data || [],
              chart: params ? chart || {} : chartData,
            };
            mutations.setState(
              getState()
                .setIn(['childData'], fromJS(datas))
                .setIn(['childTotal'], total)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        } finally {
          if (params) {
            mutations.updateChildLoadingInTime(false);
          } else {
            mutations.updateChildTableLoadingInTime(false);
          }
        }
      },

      async exportFile(state, params, { mutations, getState }) {
        try {
          // const obj = {
          //   data: JSON.stringify({
          //     subjectId: getState()
          //       .getIn(['currentRow'])
          //       .toJS().id,
          //     requireChart: false,
          //     tabType: getState().getIn(['currentTag']),
          //     pageNo: getState().getIn(['childPageNo']),
          //     pageSize: getState().getIn(['childPageSize']),
          //   }),
          // };
          // if (params) obj.file = params;
          // const res = await earlyWarningDetailsService.rightExcel(obj);
          const res = await earlyWarningDetailsService.rightExcel(params);
          // console.log('文件', res);
        } catch (err) {
          console.log(err);
        }
      },
    },
    inTime: {
      ...positionContext.inTime,

      async updateIsShowModal(params, handle) {
        handle.updateModel(handle.getState().setIn(['isShowModal'], params));
      },
      async updateCurrentId(params, handle) {
        handle.updateModel(handle.getState().setIn(['currentId'], params));
      },
      async updateCurrentRow(params, handle) {
        handle.updateModel(handle.getState().setIn(['currentRow'], fromJS(params)));
      },
      async updateChildLoading(params, handle) {
        handle.updateModel(handle.getState().setIn(['childLoading'], params));
      },
      async updateChildTableLoading(params, handle) {
        handle.updateModel(handle.getState().setIn(['childTableLoading'], params));
      },
      async updatePageNo(params, handle) {
        handle.updateModel(handle.getState().setIn(['pageNo'], params));
      },
      async clearChildInfo(params, handle) {
        const childData = {
          tableData: [],
          chart: {},
        };
        handle.updateModel(
          handle
            .getState()
            .setIn(['childData'], fromJS(childData))
            .setIn(['childTotal'], 0)
        );
      },
    },
  },
});
