import { IService } from '@ysstech-data/data-standard-types';
export interface ScheduleTaskService extends IService {
  jobAdd<Params>(params?: Params): Promise<any>;
  jobDelete<Params>(params?: Params): Promise<any>;
  jobGetJobById<Params>(params?: Params): Promise<any>;
  jobGetJobsInfo<Params>(params?: Params): Promise<any>;
  jobGetServicesInfo<Params>(params?: Params): Promise<any>;
  jobResume<Params>(params?: Params): Promise<any>;
  jobStart<Params>(params?: Params): Promise<any>;
  jobStop<Params>(params?: Params): Promise<any>;
  jobUpdate<Params>(params?: Params): Promise<any>;
  itemSimple<Params>(params?: Params): Promise<any>;
  jobDoExec<Params>(params?: Params): Promise<any>;
  getJobNamesInfo<Params>(params?: Params): Promise<any>;
  planAdd<Params>(params?: Params): Promise<any>;
  planDelete<Params>(params?: Params): Promise<any>;
  planGetPlanById<Params>(params?: Params): Promise<any>;
  planGetPlansInfo<Params>(params?: Params): Promise<any>;
  planUpdate<Params>(params?: Params): Promise<any>;
}
