/**
 * Copyright (c) 2021-present, YSSTech, Inc.
 *
 * @emails lugia@ysstech.com
 * @author liuwei.lmarnon
 */
import { AbstractCodeData } from '@ysstech-data/data-standard-data/lib';
import { inject, injectable } from 'inversify';
import { CodeDataOption } from '@ysstech-data/data-standard-data';
import Bean from '../../../config/bean';
import { TestData } from '../../interface/data/TestData';
@injectable()
export class TestDataImpl extends AbstractCodeData<{}> implements TestData {
  constructor(@inject(Bean.testOption) codeDataOption: CodeDataOption<{}>) {
    super(codeDataOption);
  }
  getId(): symbol {
    return Bean.testData;
  }
}
