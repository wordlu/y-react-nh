import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { setData, setState } from '@/utils/mutations';
import { bizdictService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

export default lugiax.register({
  model: 'dictionaryEntryModel',
  state: {
    tableData: [],
    tableLoading: false,
    total: 0, // 总条数
    pageNo: 1, // 当前页码,
    pageSize: 30, // 每页展示条数
    pageSizeOptions: [30, 50, 100],
    isShowModal: false,
    currentScene: "", //当前操作
    currentRow: {}, // 当前行
    BizdictOptions: [],
    subTableList: [], //请求的子表格数据
    subTotal: 0,
    subCurrentRow: {},
    subDictCode: "",
    selectRowsArray: [],
    selectedRowKeys: [],
    dictCode: null,
  },

  // aopConfig: createLoadingAop({
  //   tableLoading: { async: ['handleSearch'] },
  // }),

  mutations: {
    sync: {
      setDictCode(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['dictCode'], params?.dictCode || undefined)
        );
      },
      handleChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageNo'], params.pageNo ? params.pageNo : getState().get('pageNo'))
            .setIn(['pageSize'], params.pageSize ? params.pageSize : getState().get('pageSize'))
        );
      },
      handleSelect(state, params, { mutations, getState }) {
        // const data = params.selectedRows?.map(item => item.id);
        mutations.setState(
          getState()
            .setIn(['selectRowsArray'], fromJS(params.selectedRows || []))
            .setIn(['selectedRowKeys'], fromJS(params.selectedRowKeys || []))
        );
      },
      setState
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.asyncMainTableSearch(); //主页面表格数据
        // mutations.asyncSubTableSearch(); //子表格数据
        mutations.asyncOptionsSearch(); //下拉框数据
        // mutations.asyncBizdictEdit(); //字典项修改
      },

      //下拉框
      async optionsSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictList();
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['BizdictOptions'], fromJS(data || []))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      //编辑主项
      async bizdictEdit(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdict(params);
          if (code === 200) {
            message.success('编辑成功！')
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 新增接口
      async bizdictAdd(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictAdd(params);
          if (code === 200) {
            message.success('添加成功！')
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 保存子项
      async bizdictItemAdd(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.item(params);
          if (code === 200) {
            message.success('保存成功！')
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },
      
      // 导出
      async bizdictExport(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictExport();
          if (code === 200) {
            message.success("导出成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 模板下载
      async bizdictDictTemplate(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictTemplate();
          if (code === 200) {
            message.success("下载成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 刷新缓存
      async bizdictCache(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictCache(params);
          if (code === 200) {
            message.success("刷新成功!")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      //删除主项
      async bizdictDel(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictDel(params);
          if (code === 200) {
            message.success("操作成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 删除子项
      async bizdictItemDel(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data
          } = await bizdictService.bizdictItemDel(params);
          if (code === 200) {
            message.success("删除成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 查询子表格
      async subTableSearch(state, params, { mutations, getState }) {
        mutations.updateTableLoadingInTime(true);
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await bizdictService.subList(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['subTableList'], fromJS(data || []))
                .setIn(['subTotal'], total)
                .setIn(['subDictCode'], params.dictCode)
                .setIn(['subCurrentRow'], fromJS(data.length ? data[0] : {}))
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

      //查询主表格
      async mainTableSearch(state, params, { mutations, getState }) {
        const dictCode = params && params.dictCode? params.dictCode : getState().get('dictCode');
        const obj = {
          page: getState().get('pageNo'),
          rows: getState().get('pageSize'),
          dictCode,
        };
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await bizdictService.page(obj);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data || []))
                .setIn(['total'], total)
                .setIn(['currentRow'], fromJS(data.length ? data[0] : {}))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        } finally {
          mutations.setState(
            getState()
              .setIn(['selectRowsArray'], fromJS([]))
              .setIn(['selectedRowKeys'], fromJS([]))
          );
        }
      },

    },

    inTime: {
      async updateTableLoading(params, handle) {
        handle.updateModel(handle.getState().setIn(['tableLoading'], params));
      },
      async updateIsShowModal(params, handle) {
        handle.updateModel(handle.getState().setIn(['isShowModal'], params));
      },
      async updateCurrentScene(params, handle) {
        handle.updateModel(handle.getState().setIn(['currentScene'], params));
      }
    },
  },
});
