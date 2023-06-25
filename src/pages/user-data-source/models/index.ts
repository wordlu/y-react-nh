import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { setData, setState } from '@/utils/mutations';
import { customqueryService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

import { sm4utils } from '@utils/sm4/SM4'

export default lugiax.register({
  model: 'userDataSourceModel',
  state: {
    formData: {
      username: "",
    },
    tableData: [],
    total: 0, // 总条数
    pageNo: 1, // 当前页码,
    pageSize: 30, // 每页展示条数
    pageSizeOptions: [30, 50, 100],
    isShowModal: false,
    currentScene: "", //当前操作
    currentRow: {}, // 当前行
    columnsData: [],
    datasourceDetail: {},
    datasourceOptions: []
  },

  aopConfig: createLoadingAop({
    tableLoading: { async: ['handleSearch'] },
  }),

  mutations: {
    sync: {
      // handleChange(state, params, { mutations, getState }) {
      //   mutations.setState(
      //     getState()
      //       .setIn(['pageNo'], params.pageNo)
      //       .setIn(['pageSize'], params.pageSize)
      //   );
      // },
      resetData(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['tableData'], [])
            .setIn(['columnsData'], [])
        );
      },
      setState
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.resetData()
        mutations.asyncOptionsSearch(); //下拉框数据
      },

      async doResetTableData(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['columnsData'], fromJS([]))
            .setIn(['tableData'], fromJS([]))
            .setIn(['total'], 0)
            .setIn(['currentRow'], fromJS({}))
        );
      },

      async optionsSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await customqueryService.getDataSourceDownList();
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['datasourceOptions'], fromJS(data || []))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async doExecute(state, params, { mutations, getState }) {
        try {
          const { 
            code, 
            msg, 
            rows,
            columns,
            total
           } = await customqueryService.queryData(params)
          if (code === 200) {
            const cols = columns.map(it => {
              return {
                "title": it,
                "dataIndex": it,
                "align": 'left',
                "ellipsis": true,
                "key": it,
                "className": "data-columns"
              }
            })
            mutations.setState(
              getState()
                .setIn(['columnsData'], fromJS(cols))
                .setIn(['tableData'], fromJS(rows))
                .setIn(['total'], total)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async doAddDataSource(state, params, { mutations, getState }) {
        try {
          const { 
            code, 
            msg
           } = await customqueryService.addDataSource(params)
          if (code === 200) {
            message.success("新增成功");
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async doUpdateDataSource(state, params, { mutations, getState }) {
        try {
          const { 
            code, 
            msg
           } = await customqueryService.updateDataSourceById(params)
          if (code === 200) {
            message.success("设置成功");
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async doDelDataSource(state, params, { mutations, getState }) {
        try {
          const { 
            code, 
            msg
           } = await customqueryService.deleteDataSourceById(params)
          if (code === 200) {
            message.success("删除成功");
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async doGetDataSourceById(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await customqueryService.getDataSourceById(params);
          if (code === 200) {
            const sKey="86C63180C2806ED1F47B859DE501215B"
            const sm4 = new sm4utils(sKey);
	          const data2json=sm4.decryptData_ECB(data);
            const datas = JSON.parse(data2json ? data2json : "{}")
            mutations.setState(
              getState()
                .setIn(['datasourceDetail'], fromJS(datas || {}))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

    },
    inTime: {
      async updateIsShowModal(params, handle) {
        handle.updateModel(handle.getState().setIn(['isShowModal'], params));
      },
      async updateCurrentScene(params, handle) {
        handle.updateModel(handle.getState().setIn(['currentScene'], params));
      }
    },
  },
});
