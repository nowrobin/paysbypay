import { IsoDateString } from '../common';

export type MerchantStatusType = 'READY' | 'ACTIVE' | 'INACTIVE' | 'CLOSED';

export interface MerchantStatus {
  code: MerchantStatusType;
  description: string;
}

export interface MerchantListItem {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatusType;
  bizType: string;
}

export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatusType;
  bizType: string;

  bizNo: string;
  address: string;
  phone: string;
  email: string;

  registeredAt: IsoDateString;
  updatedAt: IsoDateString;
}
