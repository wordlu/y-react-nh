/**
 * Copyright (c) 2018-present, YSSTech, Inc.
 *
 * @emails lugia@ysstech.com
 * @author zenjava
 */

import { Container } from 'inversify';
import { CodeDataOption, initData } from '@ysstech-data/data-standard-data';
import Bean from './bean';
import { initService, InitServiceOption } from '@ysstech-data/data-standard-service';
import { ICodeData, IService } from '@ysstech-data/data-standard-types';
import { autoBindContainer } from './constant';
import { DefaultMessageHandle } from '@ysstech-data/data-standard-service/lib/DefaultMessageHandle';
import { SetAlertPoolService } from '@/service/interface/service/SetAlertPoolService';
import { EarlyWarningProgramService } from '@/service/interface/service/EarlyWarningProgramService';
import {EarlyWarningDetailsService} from '@/service/interface/service/EarlyWarningDetailsService';
import {FinancingRepurchaseService} from '@/service/interface/service/FinancingRepurchaseService';
import {UserAuthService} from '@/service/interface/service/UserAuthService';
import {CustomqueryService} from '@/service/interface/service/CustomqueryService';
import {BizdictService} from '@/service/interface/service/BizdictService';
import {ScheduleTaskService} from '@/service/interface/service/ScheduleTaskService';


const container = new Container();

export default function init(container: Container, option: InitServiceOption) {
  const { addData } = initData(container, option);
  const { addService } = initService(container, option);
  const addOption = (bean: Symbol, value: Object) => {
    container.bind<CodeDataOption<any>>(bean).toConstantValue(value);
  };
  autoBindContainer(addData, addOption, addService);
  return {
    getService: <ServiceType>(name: symbol): ServiceType => container.get(name),
  };
}

const { getService } = init(container, {
  messageConstructor: DefaultMessageHandle,
});
export { getService };

export const setAlertPoolService: SetAlertPoolService = getService(Bean.setAlertPoolService);
export const earlyWarningProgramService: EarlyWarningProgramService = getService(Bean.earlyWarningProgramService);
export const earlyWarningDetailsService: EarlyWarningDetailsService = getService(Bean.earlyWarningDetailsService);
export const financingRepurchaseService: FinancingRepurchaseService = getService(Bean.financingRepurchaseService);
export const userAuthService: UserAuthService = getService(Bean.userAuthService);
export const customqueryService: CustomqueryService = getService(Bean.customqueryService);
export const bizdictService: BizdictService = getService(Bean.bizdictService);
export const scheduleTaskService: ScheduleTaskService = getService(Bean.scheduleTaskService);
