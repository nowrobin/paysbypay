'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getMerchantStatuses,
  getMerchants,
  getMerchantDetails,
  getMerchantDetail,
} from '@/services/merchants';

export function useMerchantStatuses() {
  return useQuery({
    queryKey: ['merchantStatuses'],
    queryFn: getMerchantStatuses,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMerchants() {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: getMerchants,
    staleTime: 60 * 1000,
  });
}

export function useMerchantDetails() {
  return useQuery({
    queryKey: ['merchantDetails'],
    queryFn: getMerchantDetails,
    staleTime: 60 * 1000,
  });
}

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
