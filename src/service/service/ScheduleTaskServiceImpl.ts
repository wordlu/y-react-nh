import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from '@ysstech-data/download-utils';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { ScheduleTaskService } from '../interface/service/ScheduleTaskService';
import { ScheduleTaskData } from '../interface/data/ScheduleTaskData';
import { gateWay } from '@/utils/gateWay';

@injectable()
export default class ScheduleTaskServiceImpl extends AbstractService
  implements ScheduleTaskService {
  @inject(Bean.scheduleAddData)
  private readonly scheduleAddData!: ScheduleTaskData;
  async jobAdd<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleAddData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleDeleteData)
  private readonly scheduleDeleteData!: ScheduleTaskData;
  async jobDelete<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleDeleteData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleGetJobsInfoData)
  private readonly scheduleGetJobsInfoData!: ScheduleTaskData;
  async jobGetJobsInfo<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleGetJobsInfoData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleGetJobByIdData)
  private readonly scheduleGetJobByIdData!: ScheduleTaskData;
  async jobGetJobById<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleGetJobByIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleGetServicesInfoData)
  private readonly scheduleGetServicesInfoData!: ScheduleTaskData;
  async jobGetServicesInfo<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleGetServicesInfoData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleResumeData)
  private readonly scheduleResumeData!: ScheduleTaskData;
  async jobResume<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleResumeData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleStartData)
  private readonly scheduleStartData!: ScheduleTaskData;
  async jobStart<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleStartData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleStopData)
  private readonly scheduleStopData!: ScheduleTaskData;
  async jobStop<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleStopData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.scheduleUpdateData)
  private readonly scheduleUpdateData!: ScheduleTaskData;
  async jobUpdate<Params>(params?: Params): Promise<any> {
    const res = await this.scheduleUpdateData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.planAddData)
  private readonly planAddData!: ScheduleTaskData;
  async planAdd<Params>(params?: Params): Promise<any> {
    const res = await this.planAddData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.planDeleteData)
  private readonly planDeleteData!: ScheduleTaskData;
  async planDelete<Params>(params?: Params): Promise<any> {
    const res = await this.planDeleteData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.planGetPlanByIdData)
  private readonly planGetPlanByIdData!: ScheduleTaskData;
  async planGetPlanById<Params>(params?: Params): Promise<any> {
    const res = await this.planGetPlanByIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.planGetPlansInfoData)
  private readonly planGetPlansInfoData!: ScheduleTaskData;
  async planGetPlansInfo<Params>(params?: Params): Promise<any> {
    const res = await this.planGetPlansInfoData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.planUpdateData)
  private readonly planUpdateData!: ScheduleTaskData;
  async planUpdate<Params>(params?: Params): Promise<any> {
    const res = await this.planUpdateData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.itemSimpleData)
  private readonly itemSimpleData!: ScheduleTaskData;
  async itemSimple<Params>(params?: Params): Promise<any> {
    const res = await this.itemSimpleData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.jobDoExecData)
  private readonly jobDoExecData!: ScheduleTaskData;
  async jobDoExec<Params>(params?: Params): Promise<any> {
    const res = await this.jobDoExecData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getJobNamesInfoData)
  private readonly getJobNamesInfoData!: ScheduleTaskData;
  async getJobNamesInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getJobNamesInfoData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.excelData)
  private readonly excelData!: ScheduleTaskData;
  async excel<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        // url: '/yapi/api/abcAnalysis/EarlyWarnDetailsController/export/excel',
        url: `${gateWay.bondWarning}/EarlyWarnDetailsController/export/excel`,
        method: 'POST',
        // headers:{ "Content-Type": "multipart/form-data" },
        data: params,
        responseType: 'blob',
      },
      {
        requestType: 'blob',
        fileName: '',
      }
    );
  }

  getId(): symbol {
    return Bean.scheduleTaskService;
  }
}
