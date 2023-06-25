import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';

import { setAlertPoolService } from '@/config/di.config';
import { screenContext } from './screen';
import { tableContext } from './table';
import { poolNameContext } from './pool-modal';
import { setData, setState } from '@/utils/mutations';

export default lugiax.register({
  model: 'setAlertPoolModel',
  state: {
    search: '',
    screenContext: screenContext.state,
    tableContext: tableContext.state,
    poolNameContext: poolNameContext.state,
  },

  // aopConfig: createLoadingAop({
  //   tableContext: { async: ['getTableInit'] },
  //   screenContext: { async: ['getScreenInit'] },
  // }),

  mutations: {
    sync: {
      ...screenContext.sync,
      ...tableContext.sync,
      ...poolNameContext.sync,

      handleSearch(state, params, { mutations, getState }) {
        const selectData = getState()
          .getIn(['screenContext', 'selectData'])
          .toJS();

        mutations.setState(
          getState()
            .setIn(['search'], params.search)
            .setIn(['screenContext', 'searchSelect'], fromJS(selectData))
            .setIn(['tableContext', 'currentPage'], 1)
            .setIn(['tableContext', 'tableData'], fromJS([]))
        );
      },

      setState,
    },
    async: {
      ...screenContext.async,
      ...tableContext.async,
      ...poolNameContext.async,
      async init(state, params, { mutations, getState }) {
        mutations.asyncGetScreenInit();
        mutations.asyncGetTableInit();
      },
    },
    inTime: {
      ...poolNameContext.inTime,
      ...screenContext.inTime,
      ...tableContext.inTime,
    },
  },
});
