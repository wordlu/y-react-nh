import { IService } from '@ysstech-data/data-standard-types';
export interface UserAuthService extends IService {
  getPage<Params>(params?: Params): Promise<any>;
  getAllCompositeTree<Params>(params?: Params): Promise<any>;
  getCompositeTreeByTreeId<Params>(params?: Params): Promise<any>;
  getCompositeTreeByTreeIdHasAudit<Params>(params?: Params): Promise<any>;
  getCompositeTreeByUserAndTreeId<Params>(params?: Params): Promise<any>;
  makeCompositeTree<Params>(params?: Params): Promise<any>;
  saveCompositeTree<Params>(params?: Params): Promise<any>;
  userAuth<Params>(params?: Params): Promise<any>;
  authAudit<Params>(params?: Params): Promise<any>;
  removeCompositeTree<Params>(params?: Params): Promise<any>;
  authAllAudit<Params>(params?: Params): Promise<any>;
  getWaitAuditCount<Params>(params?: Params): Promise<any>;
  getCompositeTreeDefine<Params>(params?: Params): Promise<any>;
  getAuthCompositeTree<Params>(params?: Params): Promise<any>;
}
