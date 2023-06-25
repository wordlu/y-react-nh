import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { ICodeData } from '@ysstech-data/data-standard-types';
@injectable()
export class riskMonitoringDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.riskMonitoringOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.riskMonitoringData;
  }
}

@injectable()
export class getMenuDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getMenuOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getMenuData;
  }
}

@injectable()
export class getPFTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPFTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPFTreeData;
  }
}

@injectable()
export class getPFTreeDownListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPFTreeDownListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPFTreeDownListData;
  }
}

@injectable()
export class exposureCountDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.exposureCountOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.exposureCountData;
  }
}

@injectable()
export class getExchangeDayDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getExchangeDayOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getExchangeDayData;
  }
}

@injectable()
export class exposureCountExportExcelDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.exposureCountExportExcelOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.exposureCountExportExcelData;
  }
}

@injectable()
export class riskMonitoringFuzzySearchForPFDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.riskMonitoringFuzzySearchForPFOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.riskMonitoringFuzzySearchForPFData;
  }
}

@injectable()
export class riskMonitoringExportExcelDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.riskMonitoringExportExcelOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.riskMonitoringExportExcelData;
  }
}

@injectable()
export class getSchemaListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getSchemaListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getSchemaListData;
  }
}

@injectable()
export class listDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.listOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.listData;
  }
}

@injectable()
export class schemaAddDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.schemaAddOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.schemaAddData;
  }
}

@injectable()
export class editDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.editOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.editData;
  }
}

@injectable()
export class dictQueryDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.dictQueryOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.dictQueryData;
  }
}

@injectable()
export class schemaDeleteDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.schemaDeleteOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.schemaDeleteData;
  }
}

@injectable()
export class calculateListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.calculateListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.calculateListData;
  }
}

@injectable()
export class dictQuery2DataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.dictQuery2Option) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.dictQuery2Data;
  }
}

@injectable()
export class dictQuery3DataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.dictQuery3Option) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.dictQuery3Data;
  }
}

@injectable()
export class calculateDownloadDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.calculateDownloadOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.calculateDownloadData;
  }
}

@injectable()
export class saveMarkPfTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.saveMarkPfTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.saveMarkPfTreeData;
  }
}

@injectable()
export class getMarkPfTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getMarkPfTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getMarkPfTreeData;
  }
}

@injectable()
export class qryAllTemplateTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.qryAllTemplateTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.qryAllTemplateTreeData;
  }
}

@injectable()
export class qryTemplateTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.qryTemplateTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.qryTemplateTreeData;
  }
}

@injectable()
export class sendSmartbiDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.sendSmartbiOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.sendSmartbiData;
  }
}

@injectable()
export class sendSmartbiDataResultDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.sendSmartbiDataResultOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.sendSmartbiDataResultData;
  }
}

@injectable()
export class userQryDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.userQryOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.userQryData;
  }
}

@injectable()
export class roleQryDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.roleQryOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.roleQryData;
  }
}

@injectable()
export class qryATemplateInfoDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.qryATemplateInfoOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.qryATemplateInfoData;
  }
}

@injectable()
export class authorizeUsersDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.authorizeUsersOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.authorizeUsersData;
  }
}

@injectable()
export class roleTemplateAssocitionDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.roleTemplateAssocitionOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.roleTemplateAssocitionData;
  }
}

@injectable()
export class roleAddDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.roleAddOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.roleAddData;
  }
}

@injectable()
export class roleUpdateDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.roleUpdateOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.roleUpdateData;
  }
}

@injectable()
export class roleDeleteDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.roleDeleteOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.roleDeleteData;
  }
}

@injectable()
export class reportTempSyncDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.reportTempSyncOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.reportTempSyncData;
  }
}

@injectable()
export class saveEnvariableDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.saveEnvariableOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.saveEnvariableData;
  }
}

@injectable()
export class queryEnvariableDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.queryEnvariableOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.queryEnvariableData;
  }
}

@injectable()
export class deleteTemplateDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.deleteTemplateOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.deleteTemplateData;
  }
}

@injectable()
export class createTemplateDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.createTemplateOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.createTemplateData;
  }
}
