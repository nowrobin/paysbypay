'use client';

import type { PaymentSortType } from '@/utils/payments-sort';
import { DropdownOption, SortDropdown } from '@/shared/ui/dropdown';

type Props = {
  value: PaymentSortType;
  onChange: (value: PaymentSortType) => void;
};

const PAYMENT_SORT_OPTIONS: DropdownOption<PaymentSortType>[] = [
  { value: 'DATE_NEWEST', label: '결제일 최신순' },
  { value: 'DATE_OLDEST', label: '결제일 오래된순' },
  { value: 'AMOUNT_HIGH', label: '금액 높은순' },
  { value: 'AMOUNT_LOW', label: '금액 낮은순' },
];

function PaymentSortDropdown({ value, onChange }: Props) {
  return (
    <SortDropdown<PaymentSortType>
      value={value}
      onChange={onChange}
      options={PAYMENT_SORT_OPTIONS}
      prefixLabel="정렬:"
    />
  );
}

export default PaymentSortDropdown;
