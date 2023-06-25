import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from "@ysstech-data/download-utils";
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { CustomqueryServiceService } from '../interface/service/CustomqueryService';
import { CustomqueryData } from '../interface/data/CustomqueryData';

@injectable()
export default class CustomqueryServiceImpl extends AbstractService
  implements CustomqueryService {

  @inject(Bean.getDataSourceDownListData)
  private readonly getDataSourceDownListData!: CustomqueryData;
  async getDataSourceDownList<Params>(params?: Params): Promise<any> {
    const res = await this.getDataSourceDownListData.query({ conditions: [] }, params);
    const {
      value: { total = 0, list = [] },
      code,
      message,
    } = res;
    const resObj = { data: list, code, msg: message };

    return resObj;
  }

  @inject(Bean.getDataSourceByIdData)
  private readonly getDataSourceByIdData!: CustomqueryData;
  async getDataSourceById<Params>(params?: Params): Promise<any> {
    const res = await this.getDataSourceByIdData.query({ conditions: [] }, params);
    const {
      value,
      code,
      message,
    } = res;
    const resObj = { data: value, code, msg: message };

    return resObj;
  }


  @inject(Bean.addDataSourceData)
  private readonly addDataSourceData!: EarlyWarningProgramData;
  async addDataSource<Params>(params?: Params): Promise<any> {
    const res = await this.addDataSourceData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.updateDataSourceByIdData)
  private readonly updateDataSourceByIdData!: EarlyWarningProgramData;
  async updateDataSourceById<Params>(params?: Params): Promise<any> {
    const res = await this.updateDataSourceByIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.deleteDataSourceByIdData)
  private readonly deleteDataSourceByIdData!: EarlyWarningProgramData;
  async deleteDataSourceById<Params>(params?: Params): Promise<any> {
    const res = await this.deleteDataSourceByIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.updateDataData)
  private readonly updateDataData!: EarlyWarningProgramData;
  async updateData<Params>(params?: Params): Promise<any> {
    const res = await this.updateDataData.query({ conditions: [] }, params);
    const { 
      value: { executeId }, 
      code,
      message 
    } = res;
    return { executeId, code, msg: message };
  }

  @inject(Bean.getLogsByExecuteIdData)
  private readonly getLogsByExecuteIdData!: EarlyWarningProgramData;
  async getLogsByExecuteId<Params>(params?: Params): Promise<any> {
    const res = await this.getLogsByExecuteIdData.query({ conditions: [] }, params);
    const {
      value: { total = 0, pageTotal = 0, rows = [], columnName = [] },
      code,
      message,
    } = res;
    const resObj = { 
      rows, 
      total,
      pageTotal,
      columns: columnName, 
      code,
      msg: message 
    };
    return resObj;
  }

  @inject(Bean.queryDataData)
  private readonly queryDataData!: EarlyWarningProgramData;
  async queryData<Params>(params?: Params): Promise<any> {
    const res = await this.queryDataData.query({ conditions: [] }, params);
    const {
      value: { total = 0, pageTotal = 0, rows = [], columnName = [] },
      code,
      message,
    } = res;
    const resObj = { 
      rows, 
      total,
      pageTotal,
      columns: columnName, 
      code,
      msg: message 
    };

    return resObj;
  }

  getId(): symbol {
    return Bean.CustomqueryService;
  }
}
