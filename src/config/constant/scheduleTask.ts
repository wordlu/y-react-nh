import { DataItem } from '.';
// 舆情-任务管理
export default <DataItem[]>[
  // 任务信息录入
  {
    name: 'scheduleAdd',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/add',
      method: 'POST',
    },
    target: 'scheduleAddDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 任务信息删除
  {
    name: 'scheduleDelete',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/delete',
      method: 'POST',
    },
    target: 'scheduleDeleteDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 根据任务id获取任务详细
  {
    name: 'scheduleGetJobById',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/getJobById',
      method: 'POST',
    },
    target: 'scheduleGetJobByIdDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 获取任务列表
  {
    name: 'scheduleGetJobsInfo',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/getJobsInfo',
      method: 'POST',
    },
    target: 'scheduleGetJobsInfoDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 获取所有的任务信息(服务名称下拉列表)
  {
    name: 'scheduleGetServicesInfo',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/getServicesInfo',
      method: 'POST',
    },
    target: 'scheduleGetServicesInfoDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 任务恢复
  {
    name: 'scheduleResume',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/resume',
      method: 'POST',
    },
    target: 'scheduleResumeDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 任务启动
  {
    name: 'scheduleStart',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/start',
      method: 'POST',
    },
    target: 'scheduleStartDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 任务暂停
  {
    name: 'scheduleStop',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/stop',
      method: 'POST',
    },
    target: 'scheduleStopDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 任务信息编辑
  {
    name: 'scheduleUpdate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/update',
      method: 'POST',
    },
    target: 'scheduleUpdateDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },

  // 调度计划信息录入
  {
    name: 'planAdd',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/plan/add',
      method: 'POST',
    },
    target: 'planAddDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 调度计划删除
  {
    name: 'planDelete',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/plan/delete',
      method: 'POST',
    },
    target: 'planAddDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 根据id获取对应的调度计划信息
  {
    name: 'planGetPlanById',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/plan/getPlanById',
      method: 'POST',
    },
    target: 'planGetPlanByIdDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 调度计划信息查询
  {
    name: 'planGetPlansInfo',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/plan/getPlansInfo',
      method: 'POST',
    },
    target: 'planGetPlansInfoDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 调度计划信息查询
  {
    name: 'planUpdate',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/plan/update',
      method: 'POST',
    },
    target: 'planUpdateDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 获取所属分组数据
  {
    name: 'itemSimple',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/bizdict/item/simple',
      method: 'GET',
    },
    target: 'itemSimpleDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  // 调度任务手工执行
  {
    name: 'jobDoExec',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/doExec',
      method: 'POST',
    },
    target: 'jobDoExecDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
  //获取任务名称信息
  {
    name: 'getJobNamesInfo',
    type: 'data',
    useBaseURL: true,
    gatewayType: 'baseFunction',
    value: {
      url: '/schedule/job/getJobNamesInfo',
      method: 'POST',
    },
    target: 'getJobNamesInfoDataImpl',
    path: 'ScheduleTaskData/ScheduleTaskDataImpl',
  },
];
