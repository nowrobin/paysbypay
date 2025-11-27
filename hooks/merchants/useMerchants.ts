// src/hooks/useMerchants.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMerchantStatuses,
  getMerchants,
  getMerchantDetails,
  getMerchantDetail,
  postCreateMerchant,
  patchMerchantStatus,
} from '@/services/merchants';

import type {
  CreateMerchantRequest,
  CreateMerchantResponse,
  UpdateMerchantStatusRequest,
  UpdateMerchantStatusResponse,
} from '@/types/merchants';

// 가맹점 상태 코드 목록
export function useMerchantStatuses() {
  return useQuery({
    queryKey: ['merchantStatuses'],
    queryFn: getMerchantStatuses,
    staleTime: 5 * 60 * 1000,
  });
}

// 가맹점 리스트 (간단 정보)
export function useMerchants() {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: getMerchants,
    staleTime: 60 * 1000,
  });
}

// 가맹점 전체 상세
export function useMerchantDetails() {
  return useQuery({
    queryKey: ['merchantDetails'],
    queryFn: getMerchantDetails,
    staleTime: 60 * 1000,
  });
}

// 단일 가맹점 상세
export function useMerchantDetail(mchtCode: string | undefined) {
  return useQuery({
    queryKey: ['merchantDetail', mchtCode],
    queryFn: () => {
      if (!mchtCode) throw new Error('mchtCode is required');
      return getMerchantDetail(mchtCode);
    },
    enabled: !!mchtCode,
  });
}

// 가맹점 생성 mutation
// export function useCreateMerchant() {
//   const queryClient = useQueryClient();

//   return useMutation<CreateMerchantResponse, Error, CreateMerchantRequest>({
//     mutationFn: postCreateMerchant,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['merchants'] });
//       queryClient.invalidateQueries({ queryKey: ['merchantDetails'] });
//     },
//   });
// }

// 가맹점 상태 변경 mutation
// export function useUpdateMerchantStatus(mchtCode: string) {
//   const queryClient = useQueryClient();

//   return useMutation<UpdateMerchantStatusResponse, Error, UpdateMerchantStatusRequest>({
//     mutationFn: body => patchMerchantStatus(mchtCode, body),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['merchants'] });
//       queryClient.invalidateQueries({ queryKey: ['merchantDetails'] });
//       queryClient.invalidateQueries({ queryKey: ['merchantDetail', mchtCode] });
//     },
//   });
// }
