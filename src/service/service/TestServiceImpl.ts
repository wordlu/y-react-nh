import { AbstractService } from '@ysstech-data/data-standard-service';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { TestService } from '../interface/service/TestService';
import { BaseCodeItem } from '@ysstech-data/data-standard-types';
import { TestData } from '../interface/data/TestData';

@injectable()
export default class TestServiceImpl extends AbstractService implements TestService {
  @inject(Bean.testData)
  private readonly testData!: TestData;
  queryTestData<Params>(params?: Params): Promise<any> {
    // console.log(this.testData.query());
    return { value: 'done' };
  }
  getId(): symbol {
    return Bean.testService;
  }
}
