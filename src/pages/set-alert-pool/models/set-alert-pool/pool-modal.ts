import { fromJS } from 'immutable';
import { setAlertPoolService } from '@/config/di.config';
import { getReg, objTransformFormDada } from '@/utils/helper';
import { message } from 'antd';

const key = 'poolNameContext';

export const poolNameContext = {
  state: {
    search: '',
    poolNameData: [],
    defaultPoolNameData: [],
    loading: false,
    analysisResult: [],
    file: null,
    fileResultLoading: false,
    isCollectionSuccess: false,
    isDeleteSuccess: false,
    selectOptions: {
      enterpriseType: [],
      externalEntityRating: [],
      region: [],
      swFirstIndustry: [],
      wtr: [],
      str: [],
      tgr: [],
    },
    compositeTreeConditions: [],
    compositeTreeConditionsData: [],
    total: 0, // 筛选总条数
    pageSize: 30, // 每页展示条数
    currentPage: 1, // 当前页码
    pageSizeOptions: [30, 50, 100],
    searchList: [],
  },
  sync: {
    handleSearchPoolName(state, params, { mutations, getState }) {
      const data = getState()
        .getIn([key, 'defaultPoolNameData'])
        .toJS();

      const pageSize = getState().getIn([key, 'pageSize']);
      if (params) {
        const regObj = getReg(params);
        if (regObj.isReg) {
          const reg = new RegExp(regObj.reg);
          const searchList = data.filter(item => reg.test(item.alertPoolName));

          const datas = searchList?.slice(0, pageSize);

          // console.log(99999, reg, searchList, datas);
          mutations.setState(
            getState()
              .setIn([key, 'poolNameData'], fromJS(datas || []))
              .setIn([key, 'currentPage'], 1)
              .setIn([key, 'total'], searchList?.length || 0)
              .setIn([key, 'searchList'], fromJS(searchList || []))
          );
        }
      } else {
        const defaultPoolNameData = getState()
          .getIn([key, 'defaultPoolNameData'])
          .toJS();
        // console.log(111111, defaultPoolNameData);

        const datas = defaultPoolNameData?.slice(0, pageSize);
        mutations.setState(
          getState()
            .setIn([key, 'poolNameData'], fromJS(datas || []))
            .setIn([key, 'currentPage'], 1)
            .setIn([key, 'searchList'], fromJS(defaultPoolNameData || []))
            .setIn([key, 'total'], defaultPoolNameData?.length || 0)
        );
      }
    },

    handleFile(state, params, { mutations, getState }) {
      // console.log(1111, params);
      mutations.setState(getState().setIn([key, 'file'], fromJS(params)));
    },

    handleChangePagination(state, params, { mutations, getState }) {
      const data =
        getState()
          .getIn([key, 'searchList'])
          .toJS() || [];
      const total = getState().getIn([key, 'total']);
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize > total ? total : start + params.pageSize;
      const datas = data.slice(start, end);

      // console.log(111111, start, end, datas);
      mutations.setState(
        getState()
          .setIn([key, 'pageSize'], params.pageSize)
          .setIn([key, 'currentPage'], params.page)
          .setIn([key, 'poolNameData'], fromJS(datas))
      );
    },
  },
  async: {
    async getPoolNameInit(state, params, { mutations, getState }) {
      mutations.updateLoadingInTime(true);
      try {
        const { code, msg, data } = await setAlertPoolService.queryAlertPool({});
        if (code === 200) {
          // const data = [
          //   {
          //     id: 1,
          //     alertPoolId: '341986261155880960',
          //     alertPoolName: '预警池1号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:51:18.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          //   {
          //     id: 2,
          //     alertPoolId: '341987013895036928',
          //     alertPoolName: '预警池2号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:54:17.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          //   {
          //     id: 3,
          //     alertPoolId: '341988843358167040',
          //     alertPoolName: '预警池3号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T09:01:34.000+00:00',
          //     lastModificationTime: '2022-08-01T11:14:43.000+00:00',
          //   },
          //   {
          //     id: 4,
          //     alertPoolId: '341986261155880960',
          //     alertPoolName: '预警池123号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:51:18.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          //   {
          //     id: 5,
          //     alertPoolId: '341986261155880960',
          //     alertPoolName: '预警池127号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:51:18.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          //   {
          //     id: 6,
          //     alertPoolId: '341986261155880960',
          //     alertPoolName: '预警池267号',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:51:18.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          //   {
          //     id: 7,
          //     alertPoolId: '341986261155880960',
          //     alertPoolName: '99999',
          //     creatorId: '412827',
          //     deleteStatus: '1',
          //     creationTime: '2022-08-01T08:51:18.000+00:00',
          //     lastModificationTime: '2022-08-01T09:02:11.000+00:00',
          //   },
          // ];
          const datas = data?.slice(0, 30);
          mutations.setState(
            getState()
              .setIn([key, 'poolNameData'], fromJS(datas || []))
              .setIn([key, 'defaultPoolNameData'], fromJS(data || []))
              .setIn([key, 'total'], data?.length || 0)
              .setIn([key, 'searchList'], fromJS(data || []))
              .setIn([key, 'currentPage'], 1)
              .setIn([key, 'pageSize'], 30)
          );
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        mutations.updateLoadingInTime(false);
      }
    },

    async getConditions(state, params, { mutations, getState }) {
      const obj = [
        'enterpriseType',
        'externalEntityRating',
        'swFirstIndustry',
        'region',
        'wtr',
        'str',
        'tgr',
      ];
      try {
        const { code, msg, data } = await setAlertPoolService.getConditions(obj);
        if (code === 200) {
          mutations.setState(
            getState().setIn(
              [key, 'selectOptions'],
              fromJS({
                enterpriseType: data.enterpriseType || [],
                externalEntityRating: data.externalEntityRating || [],
                region: data.region || [],
                swFirstIndustry: data.swFirstIndustry || [],
                wtr: data.wtr || [],
                str: data.str || [],
                tgr: data.tgr || [],
              })
            )
          );
        } else {
          message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 暂时不用
    // async getCompositeTreeConditions(state, params, { mutations, getState }) {
    //   try {
    //     const { code, msg, data } = await setAlertPoolService.getCompositeTreeConditions(params);
    //     if (code === 200) {
    //       const datas = (data || []).map(item => item.value);
    //       mutations.setState(getState().setIn([key, 'compositeTreeConditions'], fromJS(datas)));
    //     } else {
    //       message.error(msg);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    async analysisFile(state, params, { mutations, getState }) {
      const file = getState().getIn([key, 'file']);
      // console.log(1111, file);
      if (file) {
        mutations.updateFileResultLoadingInTime(true);
        const obj = {
          id: params,
          file,
        };
        const formdata = objTransformFormDada(obj);
        // console.log(99999, formdata);
        try {
          const data = ['1111'];
          const analysisData = getState()
            .getIn([key, 'analysisResult'])
            .toJS();
          mutations.setState(
            getState().setIn([key, 'analysisResult'], fromJS([...analysisData, ...data]))
          );
        } catch (err) {
          console.log(err);
        } finally {
          mutations.updateFileResultLoadingInTime(false);
        }
      } else {
        message.warning('请选择文件！');
      }
    },

    async doCollection(state, params, { mutations, getState }) {
      const data = getState()
        .getIn(['tableContext', 'selectData'])
        .toJS();
      const obj = {
        origin: '0',
        subjectIds: data,
        alertPoolId: params,
      };
      try {
        const { code, msg } = await setAlertPoolService.alertPoolCollect(obj);

        if (code === 200) {
          message.success(msg);
          mutations.updateIsCollectionSuccessInTime(true);
          mutations.setState(
            getState()
              .setIn(['tableContext', 'selectData'], fromJS([]))
              .setIn(['tableContext', 'selectedRowKeys'], fromJS([]))
          );
        } else {
          message.error(msg);
        }
      } catch (err) {
        mutations.updateIsCollectionSuccessInTime(false);
        console.log(err);
      }
    },

    async doDelete(state, params, { mutations, getState }) {
      const obj = {
        alertPoolIds: [params],
      };
      // console.log(1111, obj);
      try {
        const { code, msg } = await setAlertPoolService.deleteAlertPool(obj);
        if (code === 200) {
          message.success(msg);
          mutations.updateDeleteSuccessInTime(true);
          mutations.asyncGetPoolNameInit();
        } else {
          message.error(msg);
        }
      } catch (err) {
        mutations.updateDeleteSuccessInTime(false);
        console.log(err);
      }
    },

    // 组合名称下拉框数据
    async getCompositeTreeConditions(state, params, { mutations, getState }) {
      try {
        const { code, msg, data, total } = await setAlertPoolService.getCompositeTreeConditions({
          pfName: '',
        });

        if (code === 200) {
          mutations.setState(
            getState().setIn([key, 'compositeTreeConditionsData'], fromJS(data || []))
          );
        } else {
          // message.error(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  inTime: {
    async updateLoading(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'loading'], params));
    },
    async updateFileResultLoading(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'fileResultLoading'], params));
    },
    async updateIsCollectionSuccess(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'isCollectionSuccess'], params));
    },

    async updateDeleteSuccess(params, handle) {
      handle.updateModel(handle.getState().setIn([key, 'isDeleteSuccess'], params));
    },
  },
};
