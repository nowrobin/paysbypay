// src/api/merchants.ts
import { api } from '@/utils/api';
import type { ApiResponse } from '@/types/common';
import type {
  MerchantStatus,
  MerchantListItem,
  MerchantDetail,
  CreateMerchantRequest,
  CreateMerchantResponse,
  UpdateMerchantStatusRequest,
  UpdateMerchantStatusResponse,
} from '@/types/merchants';

/**
 * 실제 엔드포인트 이름은 스펙에 맞춰 수정해줘!
 * 여기선 예시로:
 *  - GET /merchants/statuses
 *  - GET /merchants
 *  - GET /merchants/details
 *  - GET /merchants/{mchtCode}
 *  - POST /merchants
 *  - PATCH /merchants/{mchtCode}/status
 */

export async function getMerchantStatuses(): Promise<MerchantStatus[]> {
  const res = await api.get<ApiResponse<MerchantStatus[]>>('/merchants/statuses');
  return res.data.data;
}

export async function getMerchants(): Promise<MerchantListItem[]> {
  const res = await api.get<ApiResponse<MerchantListItem[]>>('/merchants');
  return res.data.data;
}

export async function getMerchantDetails(): Promise<MerchantDetail[]> {
  const res = await api.get<ApiResponse<MerchantDetail[]>>('/merchants/details');
  return res.data.data;
}

export async function getMerchantDetail(mchtCode: string): Promise<MerchantDetail> {
  const res = await api.get<ApiResponse<MerchantDetail>>(`/merchants/${mchtCode}`);
  return res.data.data;
}

// MSW로 가짜 구현할 POST
export async function postCreateMerchant(
  body: CreateMerchantRequest,
): Promise<CreateMerchantResponse> {
  const res = await api.post<ApiResponse<CreateMerchantResponse>>('/merchants', body);
  return res.data.data;
}

// MSW로 가짜 구현할 PATCH
export async function patchMerchantStatus(
  mchtCode: string,
  body: UpdateMerchantStatusRequest,
): Promise<UpdateMerchantStatusResponse> {
  const res = await api.patch<ApiResponse<UpdateMerchantStatusResponse>>(
    `/merchants/${mchtCode}/status`,
    body,
  );
  return res.data.data;
}
