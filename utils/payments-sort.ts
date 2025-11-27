import type { Payment } from '@/types/payments';

export type PaymentSortType = 'DATE_NEWEST' | 'DATE_OLDEST' | 'AMOUNT_HIGH' | 'AMOUNT_LOW';

function toDate(value?: string) {
  const t = new Date(value ?? '').getTime();
  return Number.isNaN(t) ? 0 : t;
}

function toAmount(value: string) {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

export function sortPayments(payments: Payment[], sortType: PaymentSortType) {
  const sorted = [...payments];

  switch (sortType) {
    case 'DATE_NEWEST':
      sorted.sort((a, b) => toDate(b.paymentAt) - toDate(a.paymentAt));
      break;
    case 'DATE_OLDEST':
      sorted.sort((a, b) => toDate(a.paymentAt) - toDate(b.paymentAt));
      break;
    case 'AMOUNT_HIGH':
      sorted.sort((a, b) => toAmount(b.amount) - toAmount(a.amount));
      break;
    case 'AMOUNT_LOW':
      sorted.sort((a, b) => toAmount(a.amount) - toAmount(b.amount));
      break;
  }

  return sorted;
}
