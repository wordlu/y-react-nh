import { AbstractService } from '@ysstech-data/data-standard-service';
import { ICodeData } from '@ysstech-data/data-standard-types';
import { downloadRequest } from "@ysstech-data/download-utils";
import { inject, injectable } from 'inversify';
import Bean from '../../config/bean';
import { UserAuthServiceService } from '../interface/service/UserAuthService';
import { UserAuthData } from '../interface/data/UserAuthData';

@injectable()
export default class UserAuthServiceImpl extends AbstractService
  implements UserAuthService {

  @inject(Bean.getPageData)
  private readonly getPageData!: UserAuthData;
  async getPage<Params>(params?: Params): Promise<any> {
    const res = await this.getPageData.query({ conditions: [] }, params);
    const {
      value: {total = 0, pageTotal = 0, rows = []},
      code,
      message,
    } = res;
    const resObj = { data: rows, code, msg: message, total: total };

    return resObj;
  }

  @inject(Bean.getAllCompositeTreeData)
  private readonly getAllCompositeTreeData!: ICodeData<{}>;
  async getAllCompositeTree<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getAllCompositeTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  @inject(Bean.getCompositeTreeByTreeIdData)
  private readonly getCompositeTreeByTreeIdData!: ICodeData<{}>;
  async getCompositeTreeByTreeId<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getCompositeTreeByTreeIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;
    
    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getCompositeTreeByTreeIdHasAuditData)
  private readonly getCompositeTreeByTreeIdHasAuditData!: ICodeData<{}>;
  async getCompositeTreeByTreeIdHasAudit<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getCompositeTreeByTreeIdHasAuditData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getCompositeTreeByUserAndTreeIdData)
  private readonly getCompositeTreeByUserAndTreeIdData!: ICodeData<{}>;
  async getCompositeTreeByUserAndTreeId<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getCompositeTreeByUserAndTreeIdData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.makeCompositeTreeData)
  private readonly makeCompositeTreeData!: ICodeData<{}>;
  async makeCompositeTree<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.makeCompositeTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.saveCompositeTreeData)
  private readonly saveCompositeTreeData!: ICodeData<{}>;
  async saveCompositeTree<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.saveCompositeTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.userAuthData)
  private readonly userAuthData!: ICodeData<{}>;
  async userAuth<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.userAuthData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.authAuditData)
  private readonly authAuditData!: ICodeData<{}>;
  async authAudit<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.authAuditData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.removeCompositeTreeData)
  private readonly removeCompositeTreeData!: ICodeData<{}>;
  async removeCompositeTree<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.removeCompositeTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.authAllAuditData)
  private readonly authAllAuditData!: ICodeData<{}>;
  async authAllAudit<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.authAllAuditData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getWaitAuditCountData)
  private readonly getWaitAuditCountData!: ICodeData<{}>;
  async getWaitAuditCount<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getWaitAuditCountData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getCompositeTreeDefineData)
  private readonly getCompositeTreeDefineData!: ICodeData<{}>;
  async getCompositeTreeDefine<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getCompositeTreeDefineData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value, code, msg: message };
    return resObj;
  }

  @inject(Bean.getAuthCompositeTreeData)
  private readonly getAuthCompositeTreeData!: ICodeData<{}>;
  async getAuthCompositeTree<Params>(params?: Params | undefined): Promise<any> {
    const res = await this.getAuthCompositeTreeData.query({ conditions: [] }, params);
    const { value, code, message } = res;

    const resObj = { data: value?.list, code, msg: message };
    return resObj;
  }

  getId(): symbol {
    return Bean.UserAuthService;
  }
}
