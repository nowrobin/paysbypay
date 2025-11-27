import type { Payment, PaymentMethodType, PaymentStatusType } from '@/types/payments';

export type PaymentStatusFilter = 'ALL' | PaymentStatusType;
export type PaymentMethodFilter = 'ALL' | PaymentMethodType;
export type PaymentCurrencyFilter = 'ALL' | string;

export interface PaymentFilterState {
  search: string;
  status: PaymentStatusFilter;
  method: PaymentMethodFilter;
  currency: PaymentCurrencyFilter;
  dateFrom?: string;
  dateTo?: string;
}

function normalize(text: string | undefined | null) {
  return (text ?? '').toLowerCase().trim();
}

function inDateRange(paymentAt: string, from?: string, to?: string) {
  if (!from && !to) return true;
  const ts = new Date(paymentAt).getTime();
  if (Number.isNaN(ts)) return false;

  if (from) {
    const fromTs = new Date(from).getTime();
    if (ts < fromTs) return false;
  }
  if (to) {
    const toTs = new Date(to).getTime();
    if (ts > toTs) return false;
  }
  return true;
}

export function filterPayments(payments: Payment[], filter: PaymentFilterState): Payment[] {
  const { search, status, method, currency, dateFrom, dateTo } = filter;
  const searchNorm = normalize(search);
  return payments.filter(p => {
    if (status !== 'ALL' && p.status !== status) return false;
    if (method !== 'ALL' && p.payType !== method) return false;
    if (currency !== 'ALL' && p.currency !== currency) return false;
    if (!inDateRange(p.paymentAt, dateFrom, dateTo)) return false;
    if (searchNorm) {
      const codeNorm = normalize(p.paymentCode);
      const mchtNorm = normalize(p.mchtCode);
      if (!codeNorm.includes(searchNorm) && !mchtNorm.includes(searchNorm)) {
        return false;
      }
    }
    return true;
  });
}
