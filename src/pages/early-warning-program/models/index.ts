import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { setData, setState } from '@/utils/mutations';
import { earlyWarningProgramService } from '@/config/di.config';
import { downloadFile } from '@/utils/helper';

const dateFormat = 'YYYYMMDD';

export default lugiax.register({
  model: 'earlyWarningProgramModel',
  state: {
    isShowProgramModal: false,
    formData: {
      names: null,
      // date:  [moment(moment().format('yyyyMMDD')).subtract(1, 'days'), moment(moment().format('yyyyMMDD'))],
      date: null
    },
    tableData: [],
    tableLoading: false,
    total: 100,
    pageNo: 1,
    pageSize: 30,
    pageSizeOptions: [30, 50, 100],
    title: null, // 方案名称
    priceData: null, // 价格预警
    financeData: null, // 财务预警
    defaultFinanceData: null,
    defaultyqyjData: null,
    opinionData: {}, // 舆情预警
    isLoading: false, // form方案
    isSuccess: false, // 提交成功
    // option: null, //价格预警-首次发行评级下拉框
    firstEarlyWarnCaseNamesOptions: null,
    secondEarlyWarnCaseNamesOptions: null,
    changeInitialValues: true,
  },

  aopConfig: createLoadingAop({
    programLoading: { async: ['handleSearch'] },
  }),

  mutations: {
    sync: {
      handleChangeShowProgramModal(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['isShowProgramModal'], params));
      },
      handlePaginationChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageNo'], params.pageNo)
            .setIn(['pageSize'], params.pageSize)
        );
        mutations.asyncGetTable();
      },

      updateForm(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['formData'], fromJS(params)));
        mutations.asyncGetTable();
      },

      setState,
    },
    async: {
      async init(state, params, { mutations, getState }) {
        // mutations.asyncGetOptionsByType();
        mutations.asyncGetPublicSentimentDictionary();
        mutations.asyncHandleSearch(params);
        if (!params?.earlyWarnCaseId) mutations.asyncGetTable();
      },

      

      async getPublicSentimentDictionary(state, parmas, { mutations, getState }) {
        try {
          const { firstEarlyWarnCaseNames, secondEarlyWarnCaseNames, code, msg } = await earlyWarningProgramService.getPublicSentimentDictionary();
          if (code === 200) {
            mutations.setState(getState().setIn(['firstEarlyWarnCaseNamesOptions'], fromJS(firstEarlyWarnCaseNames ? firstEarlyWarnCaseNames : [])));
            mutations.setState(getState().setIn(['secondEarlyWarnCaseNamesOptions'], fromJS(secondEarlyWarnCaseNames ? secondEarlyWarnCaseNames : [])));
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async handleSearch(state, params, { mutations, getState }) {
        mutations.updateFormLoadingInTime(true);
        const data = {
          earlyWarnCaseId: params.earlyWarnCaseId
        }
        try {
          const {
            code,
            msg,
            CWYJ,
            JGYJ,
            YQYJ,
            remake,
          } = await earlyWarningProgramService.getDetails(data);
          const yqyjData = JSON.parse(JSON.stringify(YQYJ))
          yqyjData?.firstEarlyWarnings?.forEach(it => {
            it.importance = it.importance.split(",")
          });
          yqyjData?.secondEarlyWarnings?.forEach(it => {
            it.importance = it.importance.split(",")
          });
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['priceData'], fromJS(JGYJ))
                .setIn(['financeData'], fromJS(CWYJ))
                .setIn(['opinionData'], fromJS(yqyjData))
                .setIn(['defaultyqyjData'], fromJS(yqyjData))
                .setIn(['defaultFinanceData'], fromJS(CWYJ))
                .setIn(['changeInitialValues'], !getState().get('changeInitialValues'))
                .setIn(['title'], params?.earlyWarnCaseId ? remake : '创建方案')
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        } finally {
          mutations.updateFormLoadingInTime(false);
        }
      },

      async getTable(state, params, { mutations, getState }) {
        mutations.updateTableLoadingInTime(true);
        try {
          const formData = getState()
            .getIn(['formData'])
            .toJS();
          const obj = {
            earlyWarnCaseName: formData.names,
            // earlyWarnCaseTime: formData.date ? moment(formData.date).format(dateFormat) : undefined,
            caseStartDate: formData.date ? moment(formData.date[0]).format(dateFormat) : undefined,
            caseEndDate: formData.date ? moment(formData.date[1]).format(dateFormat) : undefined,
            pageNo: getState().getIn(['pageNo']),
            pageSize: getState().getIn(['pageSize']),
          };
          const { code, msg, data, total } = await earlyWarningProgramService.getPageList(obj);

          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data))
                .setIn(['total'], total)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        } finally {
          mutations.updateTableLoadingInTime(false);
        }
      },

      async doSubmit(state, params, { mutations, getState }) {
        try {
          const { code, msg } = params?.earlyWarnCaseId
            ? await earlyWarningProgramService.updateEarlyWarnCase(params)
            : await earlyWarningProgramService.addEarlyWarnCase(params);
          if (code === 200) {
            message.success(msg);
            if (params?.earlyWarnCaseId) {
              mutations.setState(
                getState()
                  .setIn(['priceData'], fromJS(params.data?.JGYJ))
                  .setIn(['financeData'], fromJS(params.data?.CWYJ))
                  .setIn(['opinionData'], fromJS(params.data?.YQYJ))
                  .setIn(['defaultFinanceData'], fromJS(params.data?.CWYJ))
              );
            }
            mutations.updateFormIsSuccessInTime(true);
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async deleteProgram(state, params, { mutations, getState }) {
        try {
          const { code, msg } = await earlyWarningProgramService.deleteEarlyWarnCase({
            earlyWarnCaseId: params,
          });
          if (code === 200) {
            mutations.asyncGetTable();
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
    inTime: {
      async updateTableLoading(params, handle) {
        handle.updateModel(handle.getState().setIn(['tableLoading'], params));
      },

      async updateFormLoading(params, handle) {
        handle.updateModel(handle.getState().setIn(['isLoading'], params));
      },

      async updateFormIsSuccess(params, handle) {
        handle.updateModel(handle.getState().setIn(['isSuccess'], params));
      },
    },
  },
});
