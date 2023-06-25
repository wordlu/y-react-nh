import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { ICodeData } from '@ysstech-data/data-standard-types';
@injectable()
export class getDictionaryDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getDictionaryOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getDictionaryData;
  }
}

@injectable()
export class getPrimaryListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPrimaryListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPrimaryListData;
  }
}

@injectable()
export class doFocusDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.doFocusOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.doFocusData;
  }
}

@injectable()
export class alertPoolRemoveDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertPoolRemoveOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertPoolRemoveData;
  }
}

@injectable()
export class queryAlertPoolDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.queryAlertPoolOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.queryAlertPoolData;
  }
}

@injectable()
export class addAlertPoolDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.addAlertPoolOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.addAlertPoolData;
  }
}

@injectable()
export class updateAlertPoolDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.updateAlertPoolOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.updateAlertPoolData;
  }
}

@injectable()
export class alertPoolCollectDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertPoolCollectOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertPoolCollectData;
  }
}

@injectable()
export class deleteAlertPoolDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.deleteAlertPoolOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.deleteAlertPoolData;
  }
}
@injectable()
export class getDetailListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getDetailListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getDetailListData;
  }
}

@injectable()
export class setAlertPoolExcelDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.setAlertPoolExcelOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.setAlertPoolExcelData;
  }
}

@injectable()
export class earlywarnpoolTemplateDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.earlywarnpoolTemplateOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.earlywarnpoolTemplateData;
  }
}

@injectable()
export class earlywarnpoolInfoDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.earlywarnpoolInfoOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.earlywarnpoolInfoData;
  }
}

@injectable()
export class saveBatchByUploadDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.saveBatchByUploadOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.saveBatchByUploadData;
  }
}

@injectable()
export class validAlertPoolNameDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.validAlertPoolNameOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.validAlertPoolNameData;
  }
}

@injectable()
export class getConditionsDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getConditionsOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getConditionsData;
  }
}

@injectable()
export class getCompositeTreeConditionsDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getCompositeTreeConditionsOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getCompositeTreeConditionsData;
  }
}

@injectable()
export class getAlertPoolDetailDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getAlertPoolDetailOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getAlertPoolDetailData;
  }
}

@injectable()
export class updateAlertPoolConditionDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.updateAlertPoolConditionOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.updateAlertPoolConditionData;
  }
}

@injectable()
export class getAlertPoolDisplayConditionDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getAlertPoolDisplayConditionOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getAlertPoolDisplayConditionData;
  }
}