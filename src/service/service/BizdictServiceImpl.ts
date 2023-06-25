import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from '@ysstech-data/download-utils';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { BizdictServiceService } from '../interface/service/BizdictService';
import { BizdictData } from '../interface/data/BizdictData';
import { gateWay } from '@/utils/gateWay';

@injectable()
export default class BizdictServiceImpl extends AbstractService implements BizdictService {
  @inject(Bean.stateData)
  private readonly stateData!: BizdictData;
  async state<Params>(params?: Params): Promise<any> {
    const res = await this.stateData.query({ conditions: [] }, params);
    const {
      value: { total = 0, list = [] },
      code,
      message,
    } = res;
    const resObj = { data: list, code, msg: message };

    return resObj;
  }

  @inject(Bean.itemData)
  private readonly itemData!: BizdictData;
  async item<Params>(params?: Params): Promise<any> {
    const res = await this.itemData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.pageData)
  private readonly pageData!: BizdictData;
  async page<Params>(params?: Params): Promise<any> {
    const res = await this.pageData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.records, total: value?.total, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictData)
  private readonly bizdictData!: BizdictData;
  async bizdict<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictAddData)
  private readonly bizdictAddData!: BizdictData;
  async bizdictAdd<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictAddData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictImportData)
  private readonly bizdictImportData!: ICodeData<{}>;
  async bizdictImport<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.bizdictImportData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.bizdictDelData)
  private readonly bizdictDelData!: BizdictData;
  async bizdictDel<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictDelData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictCacheData)
  private readonly bizdictCacheData!: BizdictData;
  async bizdictCache<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictCacheData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictItemDelData)
  private readonly bizdictItemDelData!: BizdictData;
  async bizdictItemDel<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictItemDelData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.subListData)
  private readonly subListData!: BizdictData;
  async subList<Params>(params?: Params): Promise<any> {
    const res = await this.subListData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictListData)
  private readonly bizdictListData!: BizdictData;
  async bizdictList<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictListData.query({ conditions: [] }, params);
    const {
      value: { total = 0, list = [] },
      code,
      message,
    } = res;
    const resObj = { data: list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictExportData)
  private readonly bizdictExportData!: FinancingRepurchaseData;
  async bizdictExport<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.baseFunction}/bizdict/data`,
        method: 'GET',
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

  @inject(Bean.bizdictTemplateData)
  private readonly bizdictTemplateData!: FinancingRepurchaseData;
  async bizdictTemplate<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.baseFunction}/bizdict/dictTemplate`,
        method: 'GET',
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
    return Bean.BizdictService;
  }
}
