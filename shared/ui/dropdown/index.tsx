'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type SortDropdownProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  prefixLabel?: string;
  className?: string;
};

export function SortDropdown<T extends string>({
  value,
  onChange,
  options,
  prefixLabel = '정렬:',
  className,
}: SortDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.value === value);

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="
          inline-flex items-center justify-between
          min-w-[140px]
          rounded-lg border border-slate-300 bg-white
          px-3 py-2
          text-xs sm:text-sm
          shadow-sm
          hover:bg-slate-50
          focus:outline-none focus:ring-2 focus:ring-blue-200
        "
      >
        <span className="text-slate-700 truncate">
          {prefixLabel} {current?.label ?? ''}
        </span>
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
          <ul className="py-1 text-xs sm:text-sm">
            {options.map(option => (
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
