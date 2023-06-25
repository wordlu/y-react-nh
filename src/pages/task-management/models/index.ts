import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';
import { setState } from '@/utils/mutations';
import { scheduleTaskService } from '@/config/di.config';

export default lugiax.register({
  model: 'taskManagementModel',
  state: {
    searchObj: {}, //搜索条件数据
    taskNameData: [], // 任务名称
    groupData: [], // 所属分组
    taskNameCode: '', //顶部下拉查询字段
    planData: [], // 执行计划下拉
    tableData: [], // 表格数组
    selectedRowKeys: [], //表格勾选
    editInfoData: {}, // 编辑时获取表单数据
    visibleModal: false, //弹窗状态
    modalType: '', //弹窗类型
    total: 0, // 总条数
    pageNo: 1, // 当前页码,
    pageSize: 30, // 每页展示条数
    pageSizeOptions: [30, 50, 100],
  },
  aopConfig: createLoadingAop({
    tableLoading: { async: ['getTableInfoData'] },
  }),

  mutations: {
    sync: {
      // 表格勾选
      onSelectChange(state, params, { mutations, getState }) {
        return state.set('selectedRowKeys', params);
      },
      // 分页事件
      onPageChange(state, params, { mutations, getState }) {
        return state.set('pageNo', params?.page).set('pageSize', params?.pageSize);
      },
      // 任务名称下拉框模糊查询
      filterTaskCodeHandler(state, params, { mutations, getState }) {
        return state.set('taskNameCode', params);
      },
      // 修改编辑时的表单数据
      setEditInfoData(state, params, { mutations, getState }) {
        return getState().setIn(['editInfoData'], {});
      },
      // 修改搜索条件数据
      setSearchObj(state, params, { mutations, getState }) {
        return getState().setIn(['searchObj'], params);
      },
      // 修改弹窗状态
      setVisibleModal(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['visibleModal'], params ? params.visibleModal : false)
            .setIn(['modalType'], params ? params.modalType : '')
        );
        if (!params || params?.modalType === '参数执行') return;
        if (params?.modalType === '编辑') {
          mutations.asyncJobGetJobById();
        }
        mutations.asyncGetplanData();
      },
      setState,
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.asyncGetGroupData();
        mutations.asyncGetTaskNameData();
        mutations.asyncGetJobNamesInfo()
      },

      // 获取服务名称下拉列表
      async getTaskNameData(state, params, { mutations, getState }) {
        const obj = {
          code: getState().get('taskNameCode'),
        };
        try {
          const { code, data } = await scheduleTaskService.jobGetServicesInfo(obj);
          if (code === 200) {
            if (data) {
              return getState().setIn(['taskNameData'], fromJS(data?.list));
            }
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 获取任务下拉列表
      async getJobNamesInfo(state, params, { mutations, getState }) {
        // const obj = {
        //   code: getState().get('taskNameCode'),
        // };
        try {
          const { code, data } = await scheduleTaskService.getJobNamesInfo();
          if (code === 200) {
            if (data) {
              return getState().setIn(['jobNamesData'], fromJS(data?.list));
            }
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 获取执行计划下拉列表
      async getplanData(state, params, { mutations, getState }) {
        try {
          const { data, code } = await scheduleTaskService.planGetPlansInfo({});
          if (code === 200) {
            if (data) {
              return getState().setIn(['planData'], fromJS(data?.records));
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      // 获取所属分组下拉列表
      async getGroupData(state, params, { mutations, getState }) {
        try {
          const obj = {
            dictCode: '2076b664-2665-46a5-a369-cf2e5761a211',
          };
          const {
            code,
            data: { list },
          } = await scheduleTaskService.itemSimple(obj);
          if (code === 200) {
            return getState().setIn(['groupData'], fromJS(list));
          }
        } catch (err) {
          console.log(err);
        }
      },
      // 获取表格数据
      async getTableInfoData(state, params, { mutations, getState }) {
        try {
          let { jobName, jobGroup } = getState().toJS().searchObj;
          let obj = {
            pageSize: getState().get('pageSize'),
            startPage: getState().get('pageNo'),
            id: jobName ? jobName : null,
            jobGroup: jobGroup ? jobGroup : null,
          };
          const {
            code,
            data: { pageNo, pageSize, totalCount, records },
          } = await scheduleTaskService.jobGetJobsInfo(obj);
          if (code === 200) {
            if (records) {
              return getState()
                .setIn(['tableData'], fromJS(records))
                .setIn(['total'], totalCount)
                .setIn(['selectedRowKeys'], []);
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      // 表格任务操作
      async opTable(state, params, { mutations, getState }) {
        const selectedRowKeys = getState().getIn(['selectedRowKeys']);
        const selectRow = getState().getIn(['tableData']).toJS().find(it => it.id === selectedRowKeys[0])
        let pa = [];
        if (typeof params === 'object' || params === '执行') {
          pa = {
            manualParams: params.parameter,
            id: selectedRowKeys[0],
            jobGroup: selectRow?.jobGroup
          };
          params = '执行';
        } else {
          let tableData = getState()
            .getIn(['tableData'])
            .toJS();
          tableData.forEach(item => {
            if (selectedRowKeys.includes(item.id)) {
              pa.push({ id: item.id, jobGroup: item.jobGroup });
            }
          });
        }

        let res;
        try {
          switch (params) {
            case '启动':
              res = await scheduleTaskService.jobStart(pa);
              break;
            case '停止':
              res = await scheduleTaskService.jobStop(pa);
              break;
            case '删除':
              res = await scheduleTaskService.jobDelete(pa);
              break;
            case '执行':
              res = await scheduleTaskService.jobDoExec(pa);
              break;
            default:
              break;
          }
          if (res?.code === 200) {
            mutations.asyncGetTableInfoData();
            mutations.asyncGetJobNamesInfo();
            setTimeout(() => {
              mutations.setVisibleModal(false);
            });
            message.success('操作成功!');
          } else {
            message.warning(res.msg);
          }
          return state;
        } catch (err) {
          console.log(err);
        }
      },
      // 根据id获取编辑信息
      async jobGetJobById(state, params, { mutations, getState }) {
        try {
          const selectedRowKeys = getState().getIn(['selectedRowKeys']);
          let pa = {
            id: selectedRowKeys[0],
          };
          const { data, code } = await scheduleTaskService.jobGetJobById({ ...pa });
          if (code === 200) {
            if (data) {
              return getState().setIn(['editInfoData'], fromJS(data));
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
      // 新增编辑操作
      async opModify(state, params, { mutations, getState }) {
        let nameData = getState()
          .getIn(['taskNameData'])
          .toJS();
        // params.jobInfos = nameData.filter(item => {
        //   return params.jobInfos.includes(item.code);
        // });
        const jobInfos = params.jobInfos
        params.jobInfos = nameData.filter(it => it.name == jobInfos)
        if (params.jobInfos.length === 0) {
          params.jobInfos = nameData.filter(it => it.code == jobInfos)
        }
        try {
          let type = getState().getIn(['modalType']);
          let res;
          if (type === '新增') {
            res = await scheduleTaskService.jobAdd({ ...params });
          } else {
            params.id = getState().getIn(['editInfoData', 'id']);
            res = await scheduleTaskService.jobUpdate({ ...params });
          }
          if (res.code === 200) {
            mutations.setVisibleModal(false);
            mutations.asyncGetTableInfoData();
            message.info(`${type}成功!`);
          } else {
            message.warning(res.message);
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});
