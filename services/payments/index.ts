// src/api/payments.ts
import { api } from '@/utils/api';
import type { ApiResponse } from '@/types/common';
import type { PaymentMethod, PaymentStatus, Payment } from '@/types/payments';

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await api.get<ApiResponse<PaymentMethod[]>>('/payments/methods');
  return res.data.data;
}

export async function getPaymentStatuses(): Promise<PaymentStatus[]> {
  const res = await api.get<ApiResponse<PaymentStatus[]>>('/payments/statuses');
  return res.data.data;
}

export async function getPayments(): Promise<Payment[]> {
  const res = await api.get<ApiResponse<Payment[]>>('/payments/list');
  return res.data.data;
}
