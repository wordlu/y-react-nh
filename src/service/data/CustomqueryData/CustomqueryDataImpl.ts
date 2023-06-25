import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { ICodeData } from '@ysstech-data/data-standard-types';

@injectable()
export class getDataSourceDownListDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  // export class searchDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getDataSourceDownListOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getDataSourceDownListData;
  }
}

@injectable()
export class getDataSourceByIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  // export class searchDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getDataSourceByIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getDataSourceByIdData;
  }
}

@injectable()
export class addDataSourceDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.addDataSourceOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.addDataSourceData;
  }
}

@injectable()
export class updateDataSourceByIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.updateDataSourceByIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.updateDataSourceByIdData;
  }
}

@injectable()
export class deleteDataSourceByIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.deleteDataSourceByIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.deleteDataSourceByIdData;
  }
}

@injectable()
export class updateDataDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.updateDataOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.updateDataData;
  }
}

@injectable()
export class getLogsByExecuteIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getLogsByExecuteIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getLogsByExecuteIdData;
  }
}

@injectable()
export class queryDataDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.queryDataOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.queryDataData;
  }
}
