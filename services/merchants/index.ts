// src/api/merchants.ts
import { api } from '@/utils/api';
import type { ApiResponse } from '@/types/common';
import type { MerchantStatus, MerchantListItem, MerchantDetail } from '@/types/merchants';
import { Payment } from '@/types/payments';

export async function getMerchantStatuses(): Promise<MerchantStatus[]> {
  const res = await api.get<ApiResponse<MerchantStatus[]>>('/merchants/statuses');
  return res.data.data;
}

export async function getMerchants(): Promise<MerchantListItem[]> {
  const res = await api.get<ApiResponse<MerchantListItem[]>>('/merchants/list');
  return res.data.data;
}

export async function getMerchantDetails(): Promise<MerchantDetail[]> {
  const res = await api.get<ApiResponse<MerchantDetail[]>>('/merchants/details');
  return res.data.data;
}

export async function getMerchantDetail(mchtCode: string): Promise<{
  merchant: MerchantDetail;
  payments: Payment[];
}> {
  const [merchantRes, paymentRes] = await Promise.all([
    api.get<ApiResponse<MerchantDetail>>(`/merchants/details/${mchtCode}`),
    api.get<ApiResponse<Payment[]>>('/payments/list'),
  ]);

  return {
    merchant: merchantRes.data.data,
    payments: paymentRes.data.data.filter(value => value.mchtCode === mchtCode),
  };
}
