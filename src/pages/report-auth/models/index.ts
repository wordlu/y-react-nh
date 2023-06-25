import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { createLoadingAop } from '@ysstech-data/common-models/dist/loading-model/loading';
import moment from 'moment';
import { message } from 'antd';

import { setData, setState } from '@/utils/mutations';
import { financingRepurchaseService } from '@/config/di.config';
import { base64toFile, downloadFile, objTransformFormDada } from '@/utils/helper';
import { params } from './../../../../dll/DevDLL';

export default lugiax.register({
  model: 'reportAuthModel',
  state: {
    isShowModal: false,
    userLists: [],
    roleLists: [],
    roleListsAll: [],
    templateLists: [],
    smartbiObj: {},
    currentScene: "", //当前操作
    currentName: "",
    selectRowsArray: [],
    selectedRowKeys: []
  },

  mutations: {
    sync: {
      handleChange(state, params, { mutations, getState }) {
        mutations.setState(
          getState()
            .setIn(['pageNo'], params.pageNo)
            .setIn(['pageSize'], params.pageSize)
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
      updateRoleLists(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['roleLists'], fromJS([])));
      },
      updateTemplateLists(state, params, { mutations, getState }) {
        mutations.setState(getState().setIn(['templateLists'], fromJS([])));
      },
      setState
    },
    async: {
      async init(state, params, { mutations, getState }) {
        mutations.asyncUsersSearch(); //用户数据
        mutations.asyncQueryEnvariable()
        // mutations.asyncRoleTableSearch(); //角色表格数据
      },

      //查询用户列表
      async usersSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.userQry();
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['userLists'], fromJS(data || []))
                .setIn(['currentName'], 'user')
                .setIn(['roleLists'], fromJS([]))
                .setIn(['templateLists'], fromJS([]))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 查询角色列表
      async roleTableSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleQry(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['roleLists'], fromJS(data || []))
                .setIn(['currentName'], 'role')
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 查询全部角色列表
      async roleTableAllSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleQry(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['roleListsAll'], fromJS(data || []))
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

      // 查询报告列表
      async templateTableSearch(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.qryATemplateInfo(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['templateLists'], fromJS(data || []))
                .setIn(['currentName'], 'template')
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 保存role
      async authorizeUsers(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.authorizeUsers(params);
          if (code === 200) {
            message.success("保存成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 保存template
      async roleTemplateAssocition(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleTemplateAssocition(params);
          if (code === 200) {
            message.success("保存成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 新增role
      async roleAdd(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleAdd(params);
          if (code === 200) {
            message.success("新增成功！")
          } else {
            message.error(code===803? '角色名称已存在' : msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 修改role
      async roleUpdate(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleUpdate(params);
          if (code === 200) {
            message.success("修改成功！")
          } else {
            message.error(code===803? '角色名称已存在' : msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 删除role
      async roleDelete(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.roleDelete(params);
          if (code === 200) {
            message.success("删除成功！")
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 查询smartbi
      async queryEnvariable(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.queryEnvariable(params);
          if (code === 200) {
            mutations.setState(
              getState()
                .setIn(['smartbiObj'], fromJS(data || {}))
            );
          } else {
            message.error(msg);
          }
        } catch (err) {
          console.log(err);
        }
      },

      // 保存smartbi
      async saveEnvariable(state, params, { mutations, getState }) {
        try {
          const {
            code,
            msg,
            data,
            total,
          } = await financingRepurchaseService.saveEnvariable(params);
          if (code === 200) {
            message.success("保存成功！")
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
      async updateRoleLists(params, handle) {
        handle.updateModel(handle.getState().setIn(['roleLists'], fromJS([])));
      },
      async updateTemplateLists(params, handle) {
        handle.updateModel(handle.getState().setIn(['templateLists'], fromJS([])));
      },
    },
  },
});
