import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from '@ysstech-data/download-utils';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { EarlyWarningDetailsService } from '../interface/service/EarlyWarningDetailsService';
import { EarlyWarningDetailsData } from '../interface/data/EarlyWarningDetailsData';

import { gateWay } from '@/utils/gateWay';

@injectable()
export default class EarlyWarningDetailsServiceImpl extends AbstractService
  implements EarlyWarningDetailsService {
  @inject(Bean.getSearchMessageData)
  private readonly getSearchMessageData!: EarlyWarningDetailsData;
  async getSearchMessage<Params>(params?: Params): Promise<any> {
    const res = await this.getSearchMessageData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.searchData)
  private readonly searchData!: EarlyWarningDetailsData;
  async search<Params>(params?: Params): Promise<any> {
    const res = await this.searchData.query({ conditions: [] }, params);
    // const res = {
    //   code:200,
    //   message:'success',
    //   value:{
    //     total:100,
    //     list:[{
    //       id:1,
    //       name:'企业1',
    //       Logistic:10,
    //       ZScore:20,
    //       wp:'评级1',
    //       yl:'压力1',
    //       wxy:'5压力1',
    //       syl:'30压力1',
    //       iscx:true,
    //     },{
    //       id:2,
    //       name:'企业2',
    //       Logistic:30,
    //       ZScore:20,
    //       wp:'评级2',
    //       yl:'压力2',
    //       wxy:'5压力2',
    //       syl:'30压力2',
    //       iscx:false,
    //     },{
    //       id:3,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:4,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:5,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:6,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:7,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:8,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:9,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:10,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:11,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:12,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:13,
    //       name:'企业3',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:14,
    //       name:'企业14',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:15,
    //       name:'企业15',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     },{
    //       id:16,
    //       name:'企业16',
    //       Logistic:13,
    //       ZScore:23,
    //       wp:'评级3',
    //       yl:'压力3',
    //       wxy:'5压力3',
    //       syl:'30压力3',
    //       iscx:true,
    //     }],
    //   }
    // };
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.rows, code, msg: message, total: page.pageTotal, chart1: chart };

    return resObj;
  }

  @inject(Bean.searchTabData)
  private readonly searchTabData!: EarlyWarningDetailsData;
  async searchTab<Params>(params?: Params): Promise<any> {
    const res = await this.searchTabData.query({ conditions: [] }, params);
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.rows, code, msg: message, total: page.pageTotal, chart };

    return resObj;
  }

  @inject(Bean.rightExcelData)
  private readonly rightExcelData!: EarlyWarningDetailsData;
  async rightExcel<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.bondWarning}/EarlyWarnDetailsController/export/rightExcel`,
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

  @inject(Bean.excelData)
  private readonly excelData!: EarlyWarningDetailsData;
  async excel<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
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

  @inject(Bean.getOpinionsInfoData)
  private readonly getOpinionsInfoData!: EarlyWarningDetailsData;
  async getOpinionsInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getOpinionsInfoData.query({ conditions: [] }, params);
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.records, code, msg: message, total: page.totalCount, chart };

    return resObj;
  }

  @inject(Bean.getPriceInfoData)
  private readonly getPriceInfoData!: EarlyWarningDetailsData;
  async getPriceInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getPriceInfoData.query({ conditions: [] }, params);
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.records, code, msg: message, total: page.totalCount, chart };

    return resObj;
  }

  @inject(Bean.getFinanceInfoData)
  private readonly getFinanceInfoData!: EarlyWarningDetailsData;
  async getFinanceInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getFinanceInfoData.query({ conditions: [] }, params);
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.records, code, msg: message, total: page.totalCount, chart };

    return resObj;
  }

  @inject(Bean.getPositionInfoData)
  private readonly getPositionInfoData!: EarlyWarningDetailsData;
  async getPositionInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getPositionInfoData.query({ conditions: [] }, params);
    const {
      value: { page = {}, chart = [] },
      code,
      message,
    } = res;
    const resObj = { data: page.records, code, msg: message, total: page.totalCount, chart };

    return resObj;
  }

  @inject(Bean.getSubjectDetailInfoData)
  private readonly getSubjectDetailInfoData!: EarlyWarningDetailsData;
  async getSubjectDetailInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getSubjectDetailInfoData.query({ conditions: [] }, params);
    const {
      value: { records = [], totalCount = 0 },
      code,
      message,
    } = res;
    const resObj = { data: records, code, msg: message, total: totalCount };

    return resObj;
  }

  @inject(Bean.distributionData)
  private readonly distributionData!: EarlyWarningDetailsData;
  async distribution<Params>(params?: Params): Promise<any> {
    const res = await this.distributionData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.getEarlyWarnPoolsData)
  private readonly getEarlyWarnPoolsData!: EarlyWarningDetailsData;
  async getEarlyWarnPools<Params>(params?: Params): Promise<any> {
    const res = await this.getEarlyWarnPoolsData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.getEarlyWarnPlansData)
  private readonly getEarlyWarnPlansData!: EarlyWarningDetailsData;
  async getEarlyWarnPlans<Params>(params?: Params): Promise<any> {
    const res = await this.getEarlyWarnPlansData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.getMainNamesData)
  private readonly getMainNamesData!: EarlyWarningDetailsData;
  async getMainNames<Params>(params?: Params): Promise<any> {
    const res = await this.getMainNamesData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    // const resObj = { data: value?.list, code, msg: message };
    const resObj = { data: value?.records, code, msg: message, total: value?.totalCount };
    return resObj;
  }

  @inject(Bean.bizdictPositionData)
  private readonly bizdictPositionData!: EarlyWarningDetailsData;
  async bizdictPosition<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictPositionData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.bizdictDefaultData)
  private readonly bizdictDefaultData!: EarlyWarningDetailsData;
  async bizdictDefault<Params>(params?: Params): Promise<any> {
    const res = await this.bizdictDefaultData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.oneDayCreditPressureData)
  private readonly oneDayCreditPressureData!: EarlyWarningDetailsData;
  async oneDayCreditPressure<Params>(params?: Params): Promise<any> {
    const res = await this.oneDayCreditPressureData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.fiveDayCreditPressureData)
  private readonly fiveDayCreditPressureData!: EarlyWarningDetailsData;
  async fiveDayCreditPressure<Params>(params?: Params): Promise<any> {
    const res = await this.fiveDayCreditPressureData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.thirtyDayCreditPressureData)
  private readonly thirtyDayCreditPressureData!: EarlyWarningDetailsData;
  async thirtyDayCreditPressure<Params>(params?: Params): Promise<any> {
    const res = await this.thirtyDayCreditPressureData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  @inject(Bean.getPositionDetailInfoData)
  private readonly getPositionDetailInfoData!: EarlyWarningDetailsData;
  async getPositionDetailInfo<Params>(params?: Params): Promise<any> {
    const res = await this.getPositionDetailInfoData.query({ conditions: [] }, params);
    const {
      value: { records = [], totalCount = 0 },
      code,
      message,
    } = res;
    const resObj = { data: records, code, msg: message, total: totalCount };

    return resObj;
  }

  @inject(Bean.exportPositionsData)
  private readonly exportPositionsData!: EarlyWarningDetailsData;
  async exportPositions<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.bondWarning}/EarlyWarnDetailsController/export/positions`,
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

  @inject(Bean.zhmcListData)
  private readonly zhmcListData!: EarlyWarningDetailsData;
  async zhmcList<Params>(params?: Params): Promise<any> {
    const res = await this.zhmcListData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };

    return resObj;
  }

  getId(): symbol {
    return Bean.earlyWarningDetailsService;
  }
}
