'use client';
import type { MerchantSortType } from '@/utils/merchants-sort';
import { SortDropdown, DropdownOption } from '@/shared/ui/dropdown';

type Props = {
  value: MerchantSortType;
  onChange: (value: MerchantSortType) => void;
};

const MERCHANT_SORT_OPTIONS: DropdownOption<MerchantSortType>[] = [
  { value: 'REGISTERED_NEWEST', label: '등록일 최신순' },
  { value: 'REGISTERED_OLDEST', label: '등록일 오래된순' },
  { value: 'UPDATED_NEWEST', label: '업데이트 최신순' },
  { value: 'UPDATED_OLDEST', label: '업데이트 오래된순' },
  { value: 'NAME_ASC', label: '가나다 순' },
];

function MerchantSortDropdown({ value, onChange }: Props) {
  return (
    <SortDropdown<MerchantSortType>
      value={value}
      onChange={onChange}
      options={MERCHANT_SORT_OPTIONS}
      prefixLabel="정렬:"
    />
  );
}

export default MerchantSortDropdown;
