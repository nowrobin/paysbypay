'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { MerchantSortType } from '@/utils/merchants-sort';

type Props = {
  value: MerchantSortType;
  onChange: (value: MerchantSortType) => void;
};

const SORT_LABEL_MAP: Record<MerchantSortType, string> = {
  REGISTERED_NEWEST: '등록일 최신순',
  REGISTERED_OLDEST: '등록일 오래된순',
  UPDATED_NEWEST: '업데이트 최신순',
  UPDATED_OLDEST: '업데이트 오래된순',
  NAME_ASC: '가나다 순',
};

const OPTIONS: { value: MerchantSortType; label: string }[] = [
  { value: 'REGISTERED_NEWEST', label: '등록일 최신순' },
  { value: 'REGISTERED_OLDEST', label: '등록일 오래된순' },
  { value: 'UPDATED_NEWEST', label: '업데이트 최신순' },
  { value: 'UPDATED_OLDEST', label: '업데이트 오래된순' },
  { value: 'NAME_ASC', label: '가나다 순' },
];

function MerchantSortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="
          inline-flex items-center justify-between
          rounded-lg border border-slate-300 bg-white
          px-3 py-2
          shadow-sm
          hover:bg-slate-50
          focus:outline-none focus:ring-2 focus:ring-blue-200
        "
      >
        <span className="text-slate-700">정렬: {SORT_LABEL_MAP[value]}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          className="
            absolute right-0 z-20 mt-1
            w-full
            rounded-lg border border-slate-200 bg-white
            shadow-lg
          "
        >
          <ul className="py-1">
            {OPTIONS.map(option => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`
                    flex w-full items-center justify-between
                    px-3 py-2
                    hover:bg-slate-50
                    ${value === option.value ? 'text-blue-600 font-medium' : 'text-slate-700'}
                  `}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <span className="text-[10px] text-blue-500">선택됨</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MerchantSortDropdown;
