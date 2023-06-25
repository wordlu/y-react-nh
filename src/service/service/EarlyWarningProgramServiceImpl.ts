import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from '@ysstech-data/download-utils';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { EarlyWarningProgramService } from '../interface/service/EarlyWarningProgramService';
import { EarlyWarningProgramData } from '../interface/data/EarlyWarningProgramData';
import { gateWay } from '@/utils/gateWay';


@injectable()
export default class EarlyWarningProgramServiceImpl extends AbstractService
  implements EarlyWarningProgramService {
  @inject(Bean.getSchemeNameData)
  private readonly getSchemeNameData!: EarlyWarningProgramData;
  async querySchemeName<Params>(params?: Params): Promise<any> {
    const res = await this.getSchemeNameData.query({ conditions: [] }, params);
    // const {
    //   value: { list = [], total = 0 },
    // } = res;
    // return list;
    return res;
  }

  @inject(Bean.getDetailsData)
  private readonly getDetailsData!: EarlyWarningProgramData;
  async getDetails<Params>(params?: Params): Promise<any> {
    const res = await this.getDetailsData.query({ conditions: [] }, params);
    const {
      value: { CWYJ = {}, JGYJ = {}, YQYJ = {}, earlyWarnCaseName = null, earlyWarnCaseId = null },
      code,
      message,
    } = res;
    return {
      code,
      msg: message,
      CWYJ,
      JGYJ,
      YQYJ,
      remake: earlyWarnCaseName,
      earlyWarnCaseId,
      earlyWarnCaseName,
    };
  }

  @inject(Bean.getOptionsByTypeData)
  private readonly getOptionsByTypeData!: EarlyWarningProgramData;
  async getOptionsByType<Params>(params?: Params): Promise<any> {
    const res = await this.getOptionsByTypeData.query({ conditions: [] }, params);
    const {
      value: { scfxpj = [] },
      code,
      message,
    } = res;
    return { code, msg: message, scfxpj };
  }

  @inject(Bean.getPublicSentimentDictionaryData)
  private readonly getPublicSentimentDictionaryData!: EarlyWarningProgramData;
  async getPublicSentimentDictionary<Params>(params?: Params): Promise<any> {
    const res = await this.getPublicSentimentDictionaryData.query({ conditions: [] }, params);
    const {
      value: { firstEarlyWarnCaseNames = [], secondEarlyWarnCaseNames = [] },
      code,
      message,
    } = res;
    return { code, msg: message, firstEarlyWarnCaseNames, secondEarlyWarnCaseNames };
  }

  @inject(Bean.getPageListData)
  private readonly getPageListData!: EarlyWarningProgramData;
  async getPageList<Params>(params?: Params): Promise<any> {
    const res = await this.getPageListData.query({ conditions: [] }, params);
    const {
      value: { rows = [], total = 0 },
      code,
      message,
    } = res;
    return { code, msg: message, data: rows, total };
  }

  @inject(Bean.deleteEarlyWarnCaseData)
  private readonly deleteEarlyWarnCaseData!: EarlyWarningProgramData;
  async deleteEarlyWarnCase<Params>(params?: Params): Promise<any> {
    const res = await this.deleteEarlyWarnCaseData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.addEarlyWarnCaseData)
  private readonly addEarlyWarnCaseData!: EarlyWarningProgramData;
  async addEarlyWarnCase<Params>(params?: Params): Promise<any> {
    const res = await this.addEarlyWarnCaseData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.updateEarlyWarnCaseData)
  private readonly updateEarlyWarnCaseData!: EarlyWarningProgramData;
  async updateEarlyWarnCase<Params>(params?: Params): Promise<any> {
    const res = await this.updateEarlyWarnCaseData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message };
  }

  @inject(Bean.getEmailListData)
  private readonly getEmailListData!: EarlyWarningProgramData;
  async getEmailList<Params>(params?: Params): Promise<any> {
    const res = await this.getEmailListData.query({ conditions: [] }, params);

    const {
      value: { list = [] },
      code,
      message,
    } = res;
    return { code, msg: message, data: list };
  }

  @inject(Bean.statelistData)
  private readonly statelistData!: EarlyWarningProgramData;
  async statelist<Params>(params?: Params): Promise<any> {
    const res = await this.statelistData.query({ conditions: [] }, params);
    const {
      value: { list = [] },
      code,
      message,
    } = res;
    return { code, msg: message, data: list };
  }

  @inject(Bean.creditPressurelistData)
  private readonly creditPressurelistData!: EarlyWarningProgramData;
  async creditPressurelist<Params>(params?: Params): Promise<any> {
    const res = await this.creditPressurelistData.query({ conditions: [] }, params);
    const {
      value: { list = [] },
      code,
      message,
    } = res;
    return { code, msg: message, data: list };
  }

  @inject(Bean.warningPoolData)
  private readonly warningPoolData!: EarlyWarningProgramData;
  async warningPool<Params>(params?: Params): Promise<any> {
    const res = await this.warningPoolData.query({ conditions: [] }, params);
    return res;
  }

  @inject(Bean.warningSchemeData)
  private readonly warningSchemeData!: EarlyWarningProgramData;
  async warningScheme<Params>(params?: Params): Promise<any> {
    const res = await this.warningSchemeData.query({ conditions: [] }, params);
    return res;
  }

  @inject(Bean.alertEmailPageData)
  private readonly alertEmailPageData!: EarlyWarningProgramData;
  async alertEmailPage<Params>(params?: Params): Promise<any> {
    const res = await this.alertEmailPageData.query({ conditions: [] }, params);
    const {
      value: { records = [], total = 0 },
      code,
      message,
    } = res;
    return { code, msg: message, data: records, total };
  }

  @inject(Bean.alertEmailData)
  private readonly alertEmailData!: EarlyWarningProgramData;
  async alertEmail<Params>(params?: Params): Promise<any> {
    const res = await this.alertEmailData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    return { code, msg: message, data: value };
  }

  @inject(Bean.recipientData)
  private readonly recipientData!: EarlyWarningProgramData;
  async recipient<Params>(params?: Params): Promise<any> {
    const res = await this.recipientData.query({ conditions: [] }, params);
    const {
      value: { list = [] },
      code,
      message,
    } = res;
    return { code, msg: message, data: list };
  }

  @inject(Bean.itemSimplesData)
  private readonly itemSimplesData!: EarlyWarningProgramData;
  async itemSimples<Params>(params?: Params): Promise<any> {
    const res = await this.itemSimplesData.query({ conditions: [] }, params);
    const {
      value: { list = [] },
      code,
      message,
    } = res;
    return { code, msg: message, data: list };
  }

  @inject(Bean.alertEmailStateData)
  private readonly alertEmailStateData!: EarlyWarningProgramData;
  async alertEmailState<Params>(params?: Params): Promise<any> {
    const res = await this.alertEmailStateData.query({ conditions: [] }, params);
    return { code: res.code, msg: res.message };
  }

  @inject(Bean.emailPageListData)
  private readonly emailPageListData!: EarlyWarningProgramData;
  async emailPageList<Params>(params?: Params): Promise<any> {
    const res = await this.emailPageListData.query({ conditions: [] }, params);
    const {
      value: { records = [], total = 0 },
      code,
      message,
    } = res;
    return { code, msg: message, data: records, total };
  }

  @inject(Bean.alertEmailFileData)
  private readonly alertEmailFileData!: EarlyWarningProgramData;
  async alertEmailFile<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.bondWarning}/alertEmail/file`,
        method: 'GET',
        // headers:{ "Content-Type": "multipart/form-data" },
        params,
        responseType: 'blob',
      },
      {
        requestType: 'blob',
        fileName: '',
      }
    );
  }

  getId(): symbol {
    return Bean.earlyWarningProgramService;
  }
}
