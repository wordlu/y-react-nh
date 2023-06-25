import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { ICodeData } from '@ysstech-data/data-standard-types';
@injectable()
export class getSchemeNameDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getSchemeNameOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getSchemeNameData;
  }
}

@injectable()
export class getDetailsDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getDetailsOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getDetailsData;
  }
}

@injectable()
export class getOptionsByTypeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getOptionsByTypeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getOptionsByTypeData;
  }
}

@injectable()
export class getPublicSentimentDictionaryDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPublicSentimentDictionaryOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPublicSentimentDictionaryData;
  }
}

@injectable()
export class getPageListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPageListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPageListData;
  }
}

@injectable()
export class deleteEarlyWarnCaseDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.deleteEarlyWarnCaseOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.deleteEarlyWarnCaseData;
  }
}

@injectable()
export class addEarlyWarnCaseDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.addEarlyWarnCaseOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.addEarlyWarnCaseData;
  }
}

@injectable()
export class updateEarlyWarnCaseDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.updateEarlyWarnCaseOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.updateEarlyWarnCaseData;
  }
}

@injectable()
export class getEmailListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getEmailListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getEmailListsData;
  }
}

@injectable()
export class statelistDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.statelistOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.statelistsData;
  }
}

@injectable()
export class creditPressurelistDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.creditPressurelistOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.creditPressurelistData;
  }
}

@injectable()
export class warningPoolDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.warningPoolOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.warningPoolData;
  }
}

@injectable()
export class warningSchemeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.warningSchemeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.warningSchemeData;
  }
}

@injectable()
export class alertEmailPageDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertEmailPageOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertEmailPageData;
  }
}

@injectable()
export class alertEmailDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertEmailOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertEmailData;
  }
}

@injectable()
export class recipientDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.recipientOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.recipientData;
  }
}

@injectable()
export class itemSimplesDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.itemSimplesOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.itemSimplesData;
  }
}

@injectable()
export class alertEmailStateDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertEmailStateOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertEmailStateData;
  }
}

@injectable()
export class emailPageListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.emailPageListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.emailPageListData;
  }
}

@injectable()
export class alertEmailFileDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.alertEmailFileOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.alertEmailFileData;
  }
}
