import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { setData, setState } from '@/utils/mutations';
import { userAuthService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';

export default lugiax.register({
  model: 'userAuthModel',
  state: {
    formData: {
      userName: "",
    },
    tableData: [],
    total: 0, // 总条数
    pageNo: 1, // 当前页码,
    pageSize: 30, // 每页展示条数
    pageSizeOptions: [30, 50, 100],
    isShowModal: false,
    currentScene: "", //当前操作
    currentRow: {}, // 当前行
    auditCount: 0, // 需要审批条数
    currentTreeSql: '',
  },

  aopConfig: createLoadingAop({
    tableLoading: { async: ['handleSearch'] },
  }),

  mutations: {
    sync: {
      handleChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageNo'], params.pageNo ? params.pageNo : getState().get('pageNo'))
            .setIn(['pageSize'], params.pageSize ? params.pageSize : getState().get('pageSize'))
        );
      },
      setState
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.asyncHandleSearch(); //获取列表
        // mutations.asyncGetAllCompositeTree(); //获取全部组合树名称
        // mutations.asyncGetCompositeTreeByTreeId(); //获取指定组合树全部节点
        // mutations.asyncGetCompositeTreeByTreeIdHasAudit(); //获取指定组合树全部节点-含授权标识点
        // mutations.asyncGetCompositeTreeByUserAndTreeId(); //根据用户获取已授权节点-只返回授权节点
        // mutations.asyncMakeCompositeTree(); //生成组合树
        // mutations.asyncSaveCompositeTree(); //保存或更新组合树
        // mutations.asyncUserAuth(); //保存或更新组合树
        // mutations.asyncAuthAudit(); //用户授权审核
        // mutations.asyncAuthAllAudit(); //用户授权审核
      },

      async handleSearch(state, params, { mutations, getState }) {
        const formData = params
          ? params
          : getState()
              .getIn(['formData'])
              .toJS();
        const obj = {
          ...formData,
          pageSize: getState().get('pageSize'),
          pageNo: getState().get('pageNo'),
        };
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await userAuthService.getPage(obj);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['tableData'], fromJS(data || []))
                .setIn(['total'], total)
                .setIn(['currentRow'], fromJS(data && data.length ? data[0] : {}))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getAllCompositeTree(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await userAuthService.getAllCompositeTree();
          if (code === 200) {
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getCompositeTreeByTreeId(state, params, { mutations, getState }) {
        const treeId = {"treeId": '2'}
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await userAuthService.getCompositeTreeByTreeId(treeId);
          if (code === 200) {
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getCompositeTreeByTreeIdHasAudit(state, params, { mutations, getState }) {
        const treeId = {"treeId": '2', 'userId': '1'}
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await userAuthService.getCompositeTreeByTreeIdHasAudit(treeId);
          if (code === 200) {
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getCompositeTreeByUserAndTreeId(state, params, { mutations, getState }) {
        const treeId = {"treeId": '2', 'userId': '1'}
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await userAuthService.getCompositeTreeByUserAndTreeId(treeId);
          if (code === 200) {
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async authAllAudit(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
          } = await userAuthService.authAllAudit(params);
          if (code === 200) {
            message.success("操作成功！");
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getWaitAuditCount(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
          } = await userAuthService.getWaitAuditCount(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['auditCount'], data > 0 ? data : 0)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async getCompositeTreeDefine(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
          } = await userAuthService.getCompositeTreeDefine(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['currentTreeSql'], data?.treeSql)
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      async removeCompositeTree(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
          } = await userAuthService.removeCompositeTree(params);
          if (code === 200) {
            message.success("操作成功！");
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
      },
      async updateCurrentRow(params, handle) {
        handle.updateModel(handle.getState().setIn(['currentRow'], fromJS(params)));
      },
    },
  },
});
