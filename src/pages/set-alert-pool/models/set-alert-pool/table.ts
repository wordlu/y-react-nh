import { fromJS } from 'immutable';
import { setAlertPoolService } from '@/config/di.config';
import { message } from 'antd';

interface Select {
  [id: string]: string[];
}

const key = 'tableContext';

export const tableContext = {
  state: {
    tableData: [],
    total: 0, // 筛选总条数
    allTotal: 0, // 总条数
    pageSize: 30, // 每页展示条数
    currentPage: 1, // 当前页码
    pageSizeOptions: [30, 50, 100],
    selectData: [],
    selectedRowKeys: [],
    tableLoading: false,
  },
  sync: {
    handleChange(state, params, { mutations, getState }) {
      mutations.setState(
        getState()
          .setIn([key, 'pageSize'], params.pageSize)
          .setIn([key, 'currentPage'], params.page)
      );
    },
    handleSelect(state, params, { mutations, getState }) {
      const data = params.selectedRows?.map(item => item.subjectId);
      mutations.setState(
        getState()
          .setIn([key, 'selectData'], fromJS(data || []))
          .setIn([key, 'selectedRowKeys'], fromJS(params.selectedRowKeys || []))
      );
    },
    initTable(state, params, { mutations, getState }) {
      mutations.setState(
        getState()
          .setIn([key, 'currentPage'], 1)
          .setIn([key, 'pageSize'], 30)
          .setIn(['search'], '')
          .setIn(['screenContext', 'selectData'], fromJS({}))
      );
      // mutations.asyncGetTableInit();
    },
  },
  async: {
    // 获取表格
    async getTableInit(state, params, { mutations, getState }) {
      const obj = {
        pageNo: getState().getIn([key, 'currentPage']),
        pageSize: getState().getIn([key, 'pageSize']),
        subjectMessage: getState().getIn(['search']),
        screen: getState()
          .getIn(['screenContext', 'selectData'])
          .toJS(),
      };
      try {
        mutations.updateTableLoadingInTime(true);
        const {
          code,
          msg,
          data,
          total,
          pageSize,
          allTotal,
        } = await setAlertPoolService.getPrimaryList(obj);

        if (code === 200) {
          mutations.setState(
            getState()
              .setIn([key, 'tableData'], fromJS(data))
              .setIn([key, 'total'], total)
              // .setIn([key, 'pageSize'], data.pageSize)
              .setIn([key, 'allTotal'], allTotal)
          );
        } else {
          mutations.setState(
            getState()
              .setIn([key, 'tableData'], fromJS([]))
              .setIn([key, 'total'], 0)
              .setIn([key, 'allTotal'], 0)
          );
          message.error(msg);
        }
      } catch (err) {
        mutations.setState(
          getState()
            .setIn([key, 'tableData'], fromJS([]))
            .setIn([key, 'total'], 0)
            .setIn([key, 'allTotal'], 0)
        );
        console.log(err);
      } finally {
        mutations.setState(
          getState()
            .setIn([key, 'selectData'], fromJS([]))
            .setIn([key, 'selectedRowKeys'], fromJS([]))
        );
        mutations.updateTableLoadingInTime(false);
      }
    },
    // 批量关注/取消关注
    async doAnalysis(state, params, { mutations, getState }) {
      const selectData = getState()
        .getIn([key, 'selectData'])
        .toJS();
      if (selectData && selectData.length) {
        try {
          const obj = {
            subjectIds: selectData,
            flag: params.flag,
          };
          const { code, msg, data } = await setAlertPoolService.doFocus(obj);
          if (code === 200) {
            message.success(msg);
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

    // 关注
    async doFocusFn(state, params, { mutations, getState }) {
      // console.log('关注', params);
      try {
        const obj = {
          subjectIds: params.subjectIds,
          flag: params.flag,
        };

        const { code, msg, data } = await setAlertPoolService.doFocus(obj);
        if (code === 200) {
          message.success(msg);
          mutations.asyncGetTableInit();
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  inTime: {
    async updateTableData(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'tableData'], fromJS([])));
    },
    async updateTableLoading(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'tableLoading'], params));
    },
  },
};
