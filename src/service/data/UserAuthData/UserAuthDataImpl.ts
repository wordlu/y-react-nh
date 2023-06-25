import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { ICodeData } from '@ysstech-data/data-standard-types';

@injectable()
export class getPageDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getPageOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getPageData;
  }
}

@injectable()
export class getAllCompositeTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getAllCompositeTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getAllCompositeTreeData;
  }
}

@injectable()
export class getCompositeTreeByTreeIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getCompositeTreeByTreeIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getCompositeTreeByTreeIdData;
  }
}

@injectable()
export class getCompositeTreeByTreeIdHasAuditDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getCompositeTreeByTreeIdHasAuditOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getCompositeTreeByTreeIdHasAuditData;
  }
}

@injectable()
export class getCompositeTreeByUserAndTreeIdDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getCompositeTreeByUserAndTreeIdOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getCompositeTreeByUserAndTreeIdData;
  }
}

@injectable()
export class makeCompositeTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.makeCompositeTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.makeCompositeTreeData;
  }
}

@injectable()
export class saveCompositeTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.saveCompositeTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.saveCompositeTreeData;
  }
}

@injectable()
export class userAuthDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.userAuthOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.userAuthData;
  }
}

@injectable()
export class authAuditDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.authAuditOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.authAuditData;
  }
}

@injectable()
export class removeCompositeTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.removeCompositeTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.removeCompositeTreeData;
  }
}

@injectable()
export class authAllAuditDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.authAllAuditOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.authAllAuditData;
  }
}

@injectable()
export class getWaitAuditCountDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getWaitAuditCountOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getWaitAuditCountData;
  }
}

@injectable()
export class getCompositeTreeDefineDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getCompositeTreeDefineOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getCompositeTreeDefineData;
  }
}

@injectable()
export class getAuthCompositeTreeDataImpl extends AbstractCodeData<{}> implements ICodeData<{}> {
  constructor(@inject(Bean.getAuthCompositeTreeOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.getAuthCompositeTreeData;
  }
}
