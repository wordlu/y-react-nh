import { fromJS } from 'immutable';
import { setAlertPoolService } from '@/config/di.config';
import { message } from 'antd';

interface Select {
  [id: string]: string[];
}

const key = 'screenContext';

export const screenContext = {
  state: {
    selectData: {},
    screenList: [],
    default: {},
    searchSelect: {},
    screenLoading: false,
  },
  sync: {
    resetSelectData(state, params, { mutations, getState }) {
      mutations.setState(getState().setIn([key, 'selectData'], getState().getIn([key, 'default'])));
    },

    handleChangeSelect(state, params, { mutations, getState }) {
      const selectData = getState()
        .getIn([key, 'selectData'])
        .toJS();
      selectData[params.id] = params.selectArr;
      mutations.setState(getState().setIn([key, 'selectData'], fromJS(selectData)));
    },
  },
  async: {
    async getScreenInit(state, params, { mutations, getState }) {
      mutations.updateScreenLoadingInTime(true);
      try {
        const { code, msg, data } = await setAlertPoolService.getDictionary();
        if (code === 200) {
          const select: Select = {};
          data.forEach(item => {
            if (item && item.children) {
              select[item.id] = [item.children[0].id];
            }
          });
          mutations.setState(
            getState()
              .setIn([key, 'screenList'], fromJS(data))
              .setIn([key, 'selectData'], fromJS(select))
              .setIn([key, 'default'], fromJS(select))
          );
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        mutations.updateScreenLoadingInTime(false);
      }
    },
  },
  inTime: {
    async updateScreenLoading(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'screenLoading'], params));
    },
  },
};
