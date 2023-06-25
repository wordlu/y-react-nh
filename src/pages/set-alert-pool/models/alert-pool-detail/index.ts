import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';

import { setAlertPoolService } from '@/config/di.config';
import { setData, setState } from '@/utils/mutations';
import { message } from 'antd';

const defaultOption = {
  pageSize: 30,
  currentPage: 1,
  pageSizeOptions: [30, 50, 100],
};

export default lugiax.register({
  model: 'alertPoolDetailModel',
  state: {
    search: '',
    id: '',
    tableData: [],
    total: 0, // 筛选总条数
    pageSize: defaultOption.pageSize, // 每页展示条数
    currentPage: defaultOption.currentPage, // 当前页码
    pageSizeOptions: defaultOption.pageSizeOptions,
    selectData: [],
    selectedRowKeys: [],
    poolName: '',
  },

  aopConfig: createLoadingAop({
    tableContext: { async: ['getTableInit'] },
  }),

  mutations: {
    sync: {
      handleSearch(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['search'], params.search)
            // .setIn(['pageSize'], defaultOption.pageSize)
            .setIn(['currentPage'], defaultOption.currentPage)
        );
        // mutations.updateTableDataInTime();
        // mutations.asyncGetTableInit();
      },
      handleChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageSize'], params.pageSize)
            .setIn(['currentPage'], params.page)
        );
      },
      handleChangeSelect(state, params, { mutations, getState }) {
        const data = params.selectedRows?.map(item => item.subjectId);
        mutations.setState(
          getState()
            .setIn(['selectData'], fromJS(data || []))
            .setIn(['selectedRowKeys'], fromJS(params.selectedRowKeys || []))
        );
      },
      clearDetail(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['tableData'], fromJS([]))
            .setIn(['total'], 0)
            .setIn(['currentPage'], 1)
            .setIn(['poolName'], '')
            .setIn(['search'], '')
            .setIn(['id'], '')
            .setIn(['selectData'], fromJS([]))
            .setIn(['selectedRowKeys'], fromJS([]))
        );
      },
      setState,
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['id'], params.id));
        mutations.asyncGetTableInit();
      },

      // 获取表格
      async getTableInit(state, params, { mutations, getState }) {
        const obj = {
          pageNo: getState().getIn(['currentPage']),
          pageSize: getState().getIn(['pageSize']),
          subjectMessage: getState().getIn(['search']),
          alertPoolId: getState().getIn(['id']),
        };
        try {
          const {
            code,
            msg,
            data,
            total,
            pageSize,
            allTotal,
            remake,
          } = await setAlertPoolService.getDetailList(obj);
          if (code === 200) {
            // console.log(99999,data)
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data))
                .setIn(['total'], total)
                // .setIn(['pageSize'], pageSize)
                .setIn(['poolName'], remake)
            );
          } else {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS([]))
                .setIn(['total'], 0)
                .setIn(['poolName'], remake)
            );
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
          mutations.setState(
            getState()
              .setIn(['tableData'], fromJS([]))
              .setIn(['total'], 0)
              .setIn(['poolName'], '')
          );
        } finally {
          mutations.setState(
            getState()
              .setIn(['selectData'], fromJS([]))
              .setIn(['selectedRowKeys'], fromJS([]))
          );
        }
      },

      // 移除
      async deleteData(state, params, { mutations, getState }) {
        const selectData = getState()
          .getIn(['selectData'])
          .toJS();
        if (selectData && selectData.length) {
          const obj = {
            subjectIds: selectData,
            alertPoolId: getState().get('id'),
          };
          try {
            const { code, msg } = await setAlertPoolService.alertPoolRemove(obj);
            if (code === 200) {
              message.success(msg);
              mutations.setState(getState().setIn(['selectData'], fromJS([])));
              mutations.asyncGetTableInit();
            } else {
              message.error(msg);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          message.warning('请选择要操作的数据!');
        }
      },
    },
    inTime: {
      async updateTableData(params, handle) {
        handle.updateModel(handle.getState().setIn(['tableData'], fromJS([])));
      },
    },
  },
});
