import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from '@ysstech-data/download-utils';
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { FinancingRepurchaseService } from '../interface/service/FinancingRepurchaseService';
import { FinancingRepurchaseData } from '../interface/data/FinancingRepurchaseData';
import { gateWay } from '@/utils/gateWay';

@injectable()
export default class FinancingRepurchaseServiceImpl extends AbstractService
  implements FinancingRepurchaseService {
  @inject(Bean.riskMonitoringData)
  private readonly riskMonitoringData!: FinancingRepurchaseData;
  async riskMonitoring<Params>(params?: Params): Promise<any> {
    const res = await this.riskMonitoringData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value?.rows, code, msg: message, total: value?.total };
    return resObj;
  }

  @inject(Bean.getMenuData)
  private readonly getMenuData!: FinancingRepurchaseData;
  async getMenu<Params>(params?: Params): Promise<any> {
    const res = await this.getMenuData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getPFTreeDownListData)
  private readonly getPFTreeDownListData!: FinancingRepurchaseData;
  async getPFTreeDownList<Params>(params?: Params): Promise<any> {
    const res = await this.getPFTreeDownListData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getPFTreeData)
  private readonly getPFTreeData!: FinancingRepurchaseData;
  async getPFTree<Params>(params?: Params): Promise<any> {
    const res = await this.getPFTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.exposureCountData)
  private readonly exposureCountData!: FinancingRepurchaseData;
  async exposureCount<Params>(params?: Params): Promise<any> {
    const res = await this.exposureCountData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getExchangeDayData)
  private readonly getExchangeDayData!: FinancingRepurchaseData;
  async getExchangeDay<Params>(params?: Params): Promise<any> {
    const res = await this.getExchangeDayData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.exposureCountExportExcelData)
  private readonly exposureCountExportExcelData!: FinancingRepurchaseData;
  async exposureCountExportExcel<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.financingRepurchase}/flowabilityRiskManagement/import/exposureCountExportExcel`,
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

  @inject(Bean.riskMonitoringFuzzySearchForPFData)
  private readonly riskMonitoringFuzzySearchForPFData!: FinancingRepurchaseData;
  async riskMonitoringFuzzySearchForPF<Params>(params?: Params): Promise<any> {
    const res = await this.riskMonitoringFuzzySearchForPFData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.riskMonitoringExportExcelData)
  private readonly riskMonitoringExportExcelData!: FinancingRepurchaseData;
  async riskMonitoringExportExcel<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.financingRepurchase}/flowabilityRiskManagement/riskMonitoringExportExcel`,
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

  @inject(Bean.getSchemaListData)
  private readonly getSchemaListData!: FinancingRepurchaseData;
  async getSchemaList<Params>(params?: Params): Promise<any> {
    const res = await this.getSchemaListData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.listData)
  private readonly listData!: FinancingRepurchaseData;
  async list<Params>(params?: Params): Promise<any> {
    const res = await this.listData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.records, total: value?.totalCount, code, msg: message };
    return resObj;
  }

  @inject(Bean.schemaAddData)
  private readonly schemaAddData!: FinancingRepurchaseData;
  async schemaAdd<Params>(params?: Params): Promise<any> {
    const res = await this.schemaAddData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.editData)
  private readonly editData!: FinancingRepurchaseData;
  async edit<Params>(params?: Params): Promise<any> {
    const res = await this.editData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    // console.log(9999, res);
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.dictQueryData)
  private readonly dictQueryData!: FinancingRepurchaseData;
  async dictQuery<Params>(params?: Params): Promise<any> {
    const res = await this.dictQueryData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.schemaDeleteData)
  private readonly schemaDeleteData!: FinancingRepurchaseData;
  async schemaDelete<Params>(params?: Params): Promise<any> {
    const res = await this.schemaDeleteData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.calculateListData)
  private readonly calculateListData!: FinancingRepurchaseData;
  async calculateList<Params>(params?: Params): Promise<any> {
    const res = await this.calculateListData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.records, total: value?.totalCount, code, msg: message };
    return resObj;
  }

  @inject(Bean.dictQuery2Data)
  private readonly dictQuery2Data!: FinancingRepurchaseData;
  async dictQuery2<Params>(params?: Params): Promise<any> {
    const res = await this.dictQuery2Data.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.dictQuery3Data)
  private readonly dictQuery3Data!: FinancingRepurchaseData;
  async dictQuery3<Params>(params?: Params): Promise<any> {
    const res = await this.dictQuery3Data.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.calculateDownloadData)
  private readonly calculateDownloadData!: FinancingRepurchaseData;
  async calculateDownload<Params>(params?: Params): Promise<any> {
    return downloadRequest(
      {
        url: `${gateWay.financingRepurchase}/stress/calculate/download`,
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

  @inject(Bean.saveMarkPfTreeData)
  private readonly saveMarkPfTreeData!: FinancingRepurchaseData;
  async saveMarkPfTree<Params>(params?: Params): Promise<any> {
    const res = await this.saveMarkPfTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getMarkPfTreeData)
  private readonly getMarkPfTreeData!: FinancingRepurchaseData;
  async getMarkPfTree<Params>(params?: Params): Promise<any> {
    const res = await this.getMarkPfTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.qryAllTemplateTreeData)
  private readonly qryAllTemplateTreeData!: FinancingRepurchaseData;
  async qryAllTemplateTree<Params>(params?: Params): Promise<any> {
    const res = await this.qryAllTemplateTreeData.query({ conditions: [] }, params);

    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.qryTemplateTreeData)
  private readonly qryTemplateTreeData!: FinancingRepurchaseData;
  async qryTemplateTree<Params>(params?: Params): Promise<any> {
    const res = await this.qryTemplateTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.sendSmartbiData)
  private readonly sendSmartbiData!: FinancingRepurchaseData;
  async sendSmartbi<Params>(params?: Params): Promise<any> {
    const res = await this.sendSmartbiData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.sendSmartbiDataResultData)
  private readonly sendSmartbiDataResultData!: FinancingRepurchaseData;
  async sendSmartbiDataResult<Params>(params?: Params): Promise<any> {
    const res = await this.sendSmartbiDataResultData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.userQryData)
  private readonly userQryData!: FinancingRepurchaseData;
  async userQry<Params>(params?: Params): Promise<any> {
    const res = await this.userQryData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.roleQryData)
  private readonly roleQryData!: FinancingRepurchaseData;
  async roleQry<Params>(params?: Params): Promise<any> {
    const res = await this.roleQryData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.qryATemplateInfoData)
  private readonly qryATemplateInfoData!: FinancingRepurchaseData;
  async qryATemplateInfo<Params>(params?: Params): Promise<any> {
    const res = await this.qryATemplateInfoData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.authorizeUsersData)
  private readonly authorizeUsersData!: FinancingRepurchaseData;
  async authorizeUsers<Params>(params?: Params): Promise<any> {
    const res = await this.authorizeUsersData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.roleTemplateAssocitionData)
  private readonly roleTemplateAssocitionData!: FinancingRepurchaseData;
  async roleTemplateAssocition<Params>(params?: Params): Promise<any> {
    const res = await this.roleTemplateAssocitionData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.roleAddData)
  private readonly roleAddData!: FinancingRepurchaseData;
  async roleAdd<Params>(params?: Params): Promise<any> {
    const res = await this.roleAddData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.roleUpdateData)
  private readonly roleUpdateData!: FinancingRepurchaseData;
  async roleUpdate<Params>(params?: Params): Promise<any> {
    const res = await this.roleUpdateData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.roleDeleteData)
  private readonly roleDeleteData!: FinancingRepurchaseData;
  async roleDelete<Params>(params?: Params): Promise<any> {
    const res = await this.roleDeleteData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.reportTempSyncData)
  private readonly reportTempSyncData!: FinancingRepurchaseData;
  async reportTempSync<Params>(params?: Params): Promise<any> {
    const res = await this.reportTempSyncData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.saveEnvariableData)
  private readonly saveEnvariableData!: FinancingRepurchaseData;
  async saveEnvariable<Params>(params?: Params): Promise<any> {
    const res = await this.saveEnvariableData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.queryEnvariableData)
  private readonly queryEnvariableData!: FinancingRepurchaseData;
  async queryEnvariable<Params>(params?: Params): Promise<any> {
    const res = await this.queryEnvariableData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.deleteTemplateData)
  private readonly deleteTemplateData!: FinancingRepurchaseData;
  async deleteTemplate<Params>(params?: Params): Promise<any> {
    const res = await this.deleteTemplateData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.createTemplateData)
  private readonly createTemplateData!: FinancingRepurchaseData;
  async createTemplate<Params>(params?: Params): Promise<any> {
    const res = await this.createTemplateData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  getId(): symbol {
    return Bean.financingRepurchaseService;
  }
}
