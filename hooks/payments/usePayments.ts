// src/hooks/usePayments.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getPaymentMethods, getPaymentStatuses, getPayments } from '@/services/payments';

// 결제수단 목록
export function usePaymentMethods() {
  return useQuery({
    queryKey: ['paymentMethods'],
    queryFn: getPaymentMethods,
    staleTime: 5 * 60 * 1000,
  });
}

// 결제 상태 코드 목록
export function usePaymentStatuses() {
  return useQuery({
    queryKey: ['paymentStatuses'],
    queryFn: getPaymentStatuses,
    staleTime: 5 * 60 * 1000,
  });
}

// 결제(거래) 리스트
export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: getPayments,
    staleTime: 60 * 1000,
  });
}
