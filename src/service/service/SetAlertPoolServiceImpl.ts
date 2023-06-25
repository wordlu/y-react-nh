import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { inject, injectable } from 'inversify';
import { downloadRequest } from '@ysstech-data/download-utils';
import Bean from '../../config/bean';
import { SetAlertPoolService } from '../interface/service/SetAlertPoolService';
import { SetAlertPoolData } from '../interface/data/SetAlertPoolData';
import { gateWay } from '@/utils/gateWay';

@injectable()
export default class SetAlertPoolServiceImpl extends AbstractService
  implements SetAlertPoolService {
  @inject(Bean.getDictionaryData)
  private readonly getDictionaryData!: SetAlertPoolData;
  async getDictionary<Params>(params?: Params): Promise<any> {
    const res = await this.getDictionaryData.query({ conditions: [] }, params);
    const {
      value: { list = [], total = 0 },
      code,
      message,
    } = res;
    // console.log('----res', res);
    const resObj = { data: list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getPrimaryListData)
  private readonly getPrimaryListData!: ICodeData<{}>;
  async getPrimaryList<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getPrimaryListData.query({ conditions: [] }, params);

    const {
      value: { rows = [], pageTotal = 0, pageSize = 0, total = 0 },
      code,
      message,
    } = res;
    // console.log('----res', res);
    const resObj = { data: rows, code, msg: message, total: total, pageSize, allTotal: total };
    return resObj;
  }

  @inject(Bean.doFocusData)
  private readonly doFocusData!: ICodeData<{}>;
  async doFocus<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.doFocusData.query({ conditions: [] }, params);
    // console.log('----res', res);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.alertPoolRemoveData)
  private readonly alertPoolRemoveData!: ICodeData<{}>;
  async alertPoolRemove<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.alertPoolRemoveData.query({ conditions: [] }, params);
    // console.log('----res', res);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.queryAlertPoolData)
  private readonly queryAlertPoolData!: ICodeData<{}>;
  async queryAlertPool<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.queryAlertPoolData.query({ conditions: [] }, params);
    const {
      value: { list = [], total = 0 },
      code,
      message,
    } = res;

    const resObj = { data: list, code, msg: message };
    return resObj;
  }

  @inject(Bean.addAlertPoolData)
  private readonly addAlertPoolData!: ICodeData<{}>;
  async addAlertPool<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.addAlertPoolData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.updateAlertPoolData)
  private readonly updateAlertPoolData!: ICodeData<{}>;
  async updateAlertPool<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.updateAlertPoolData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.alertPoolCollectData)
  private readonly alertPoolCollectData!: ICodeData<{}>;
  async alertPoolCollect<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.alertPoolCollectData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.deleteAlertPoolData)
  private readonly deleteAlertPoolData!: ICodeData<{}>;
  async deleteAlertPool<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.deleteAlertPoolData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getDetailListData)
  private readonly getDetailListData!: ICodeData<{}>;
  async getDetailList<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getDetailListData.query({ conditions: [] }, params);

    const {
      // value: { rows = [], total = 0, pageSize = 0, allTotal = 0 },
      value: { page = {}, remake = '' },
      code,
      message,
    } = res;
    // console.log('----res', res);
    const resObj = {
      data: page?.rows,
      remake,
      code,
      msg: message,
      total: page?.total,
      pageSize: page?.pageSize,
      allTotal: page?.allTotal,
    };
    // const resObj = { data: rows, code, msg: message, total, pageSize, allTotal };
    return resObj;
  }

  @inject(Bean.setAlertPoolExcelData)
  private readonly setAlertPoolExcelData!: ICodeData<{}>;
  async setAlertPoolExcel<Params>(params?: Params | undefined): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.bondWarning}/setAlertPool/export/excel`,
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

  @inject(Bean.earlywarnpoolTemplateData)
  private readonly earlywarnpoolTemplateData!: ICodeData<{}>;
  async earlywarnpoolTemplate<Params>(params?: Params | undefined): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.bondWarning}/setAlertPool/download/earlywarnpoolTemplate`,
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

  @inject(Bean.earlywarnpoolInfoData)
  private readonly earlywarnpoolInfoData!: ICodeData<{}>;
  async earlywarnpoolInfo<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.earlywarnpoolInfoData.query({ conditions: [] }, params);
    const {
      value: { list = [], total = 0 },
      code,
      message,
    } = res;

    const resObj = { data: list, code, msg: message };
    return resObj;
  }

  @inject(Bean.saveBatchByUploadData)
  private readonly saveBatchByUploadData!: ICodeData<{}>;
  async saveBatchByUpload<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.saveBatchByUploadData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.validAlertPoolNameData)
  private readonly validAlertPoolNameData!: ICodeData<{}>;
  async validAlertPoolName<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.validAlertPoolNameData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getConditionsData)
  private readonly getConditionsData!: ICodeData<{}>;
  async getConditions<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getConditionsData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getCompositeTreeConditionsData)
  private readonly getCompositeTreeConditionsData!: ICodeData<{}>;
  async getCompositeTreeConditions<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getCompositeTreeConditionsData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getAlertPoolDetailData)
  private readonly getAlertPoolDetailData!: ICodeData<{}>;
  async getAlertPoolDetail<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getAlertPoolDetailData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.updateAlertPoolConditionData)
  private readonly updateAlertPoolConditionData!: ICodeData<{}>;
  async updateAlertPoolCondition<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.updateAlertPoolConditionData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getAlertPoolDisplayConditionData)
  private readonly getAlertPoolDisplayConditionData!: ICodeData<{}>;
  async getAlertPoolDisplayCondition<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getAlertPoolDisplayConditionData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  getId(): symbol {
    return Bean.setAlertPoolService;
  }
}
