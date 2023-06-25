import { IService } from '@ysstech-data/data-standard-types';
export interface TestService extends IService {
  queryTestData<Params>(params?: Params): Promise<any>;
}
