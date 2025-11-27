// src/types/merchants.ts

import { IsoDateString } from '../common';

export type MerchantStatusType = 'READY' | 'ACTIVE' | 'INACTIVE' | 'CLOSED';

// export type MerchantCardProps = Pick<
//   MerchantDetail,
//   'mchtCode' | 'mchtName' | 'status' | 'bizType' | 'address' | 'email'
// >;

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

export interface UpdateMerchantStatusRequest {
  status: MerchantStatusType;
}

export interface UpdateMerchantStatusResponse {
  success: boolean;
  merchant: MerchantDetail;
}

export interface CreateMerchantRequest {
  mchtName: string;
  bizType: string;
  email?: string;
  phone?: string;
}

export interface CreateMerchantResponse {
  success: boolean;
  merchant: MerchantDetail;
}
