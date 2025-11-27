// app/payments/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { usePayments } from '@/hooks/payments/usePayments';
import { formatDateToYMD } from '@/utils/date'; // 아까 만든 유틸
import PaymentStatusBadge from '@/app/payments/components/badge';
import { SortDropdown, type DropdownOption } from '@/shared/ui/dropdown';
import type {
  PaymentFilterState,
  PaymentStatusFilter,
  PaymentMethodFilter,
  PaymentCurrencyFilter,
} from '@/utils/payments-filter';
import { filterPayments } from '@/utils/payments-filter';
import { sortPayments } from '@/utils/payments-sort';
import type { PaymentSortType } from '@/utils/payments-sort';
import { Search } from 'lucide-react';

const STATUS_OPTIONS: DropdownOption<PaymentStatusFilter>[] = [
  { value: 'ALL', label: '전체' },
  { value: 'SUCCESS', label: '성공' },
  { value: 'FAILED', label: '실패' },
  { value: 'CANCELLED', label: '취소' },
  { value: 'PENDING', label: '대기' },
];

const METHOD_OPTIONS: DropdownOption<PaymentMethodFilter>[] = [
  { value: 'ALL', label: '전체 수단' },
  { value: 'DEVICE', label: '단말기' },
  { value: 'MOBILE', label: '모바일' },
  { value: 'ONLINE', label: '온라인' },
  { value: 'VACT', label: '가상계좌' },
  { value: 'BILLING', label: '정기결제' },
];

const CURRENCY_OPTIONS: DropdownOption<PaymentCurrencyFilter>[] = [
  { value: 'ALL', label: '전체 통화' },
  { value: 'KRW', label: 'KRW' },
  { value: 'USD', label: 'USD' },
];

const SORT_OPTIONS: DropdownOption<PaymentSortType>[] = [
  { value: 'DATE_NEWEST', label: '결제일 최신순' },
  { value: 'DATE_OLDEST', label: '결제일 오래된순' },
  { value: 'AMOUNT_HIGH', label: '금액 높은순' },
  { value: 'AMOUNT_LOW', label: '금액 낮은순' },
];

export default function PaymentsPage() {
  const { data: payments, isLoading } = usePayments();

  const [sortType, setSortType] = useState<PaymentSortType>('DATE_NEWEST');

  const [filter, setFilter] = useState<PaymentFilterState>({
    search: '',
    status: 'ALL',
    method: 'ALL',
    currency: 'ALL',
    dateFrom: undefined,
    dateTo: undefined,
  });

  const filteredAndSorted = useMemo(() => {
    if (!payments) return [];
    const filtered = filterPayments(payments, filter);
    return sortPayments(filtered, sortType);
  }, [payments, filter, sortType]);

  const totalCount = payments?.length ?? 0;
  const successCount = payments?.filter(p => p.status === 'SUCCESS').length ?? 0;

  if (isLoading) return <div className="p-6">결제 내역 불러오는 중...</div>;

  return (
    <main className="flex h-screen w-full max-w-[1920px] flex-col gap-4 p-6">
      <header className="flex flex-col gap-3 border-b pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-row items-end gap-4">
            <h1 className="text-2xl font-medium">거래 내역</h1>
            <p className="text-base text-slate-500">
              총 {totalCount}건 · 성공 {successCount}건
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <SortDropdown<PaymentStatusFilter>
              value={filter.status}
              onChange={status =>
                setFilter(prev => ({
                  ...prev,
                  status,
                }))
              }
              options={STATUS_OPTIONS}
              prefixLabel="상태:"
            />

            {/* 수단 필터 */}
            <SortDropdown<PaymentMethodFilter>
              value={filter.method}
              onChange={method =>
                setFilter(prev => ({
                  ...prev,
                  method,
                }))
              }
              options={METHOD_OPTIONS}
              prefixLabel="수단:"
            />
            <SortDropdown<PaymentCurrencyFilter>
              value={filter.currency}
              onChange={currency =>
                setFilter(prev => ({
                  ...prev,
                  currency,
                }))
              }
              options={CURRENCY_OPTIONS}
              prefixLabel="통화:"
            />
            <SortDropdown<PaymentSortType>
              value={sortType}
              onChange={setSortType}
              options={SORT_OPTIONS}
              prefixLabel="정렬:"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-row gap-2 relative w-3/7 h-10">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 " />
            <input
              type="text"
              placeholder="결제코드 / 가맹점코드 검색"
              value={filter.search ?? ''}
              onChange={e => setFilter(prev => ({ ...prev, search: e.target.value }))}
              className="
                      w-full
                      rounded-lg
                      border border-slate-300
                      bg-white
                      px-3
                      py-2
                      text-sm
                      shadow-sm
                      placeholder:text-slate-400
                    "
            />
          </div>
          <div>
            <input
              type="date"
              value={filter.dateFrom ?? ''}
              onChange={e =>
                setFilter(prev => ({ ...prev, dateFrom: e.target.value || undefined }))
              }
              className="rounded-md border border-slate-300 bg-white px-2 py-1 h-10 text-base"
            />
            <span className="text-slate-400">~</span>
            <input
              type="date"
              value={filter.dateTo ?? ''}
              onChange={e => setFilter(prev => ({ ...prev, dateTo: e.target.value || undefined }))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 h-10 text-base "
            />
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-y-scroll max-h-4/5 scrollbar-hide rounded-2xl border bg-white">
        <div className="max-h-full overflow-y-auto scrollbar-hide">
          <table className="min-w-full text-xs">
            <thead className="sticky top-0 bg-slate-50">
              <tr className="border-b text-[11px] text-slate-500">
                <th className="px-4 py-2 text-left">결제일시</th>
                <th className="px-4 py-2 text-left">결제코드</th>
                <th className="px-4 py-2 text-left">가맹점코드</th>
                <th className="px-4 py-2 text-right">금액</th>
                <th className="px-4 py-2 text-left">통화</th>
                <th className="px-4 py-2 text-left">수단</th>
                <th className="px-4 py-2 text-left">상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map(p => (
                <tr key={p.paymentCode} className="border-b last:border-0">
                  <td className="px-4 py-2 align-middle">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">
                        {formatDateToYMD(p.paymentAt)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {p.paymentAt.slice(11, 16)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 align-middle font-mono text-[11px]">{p.paymentCode}</td>
                  <td className="px-4 py-2 align-middle font-mono text-[11px]">{p.mchtCode}</td>
                  <td className="px-4 py-2 align-middle text-right font-medium">
                    {Number(p.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 align-middle">{p.currency}</td>
                  <td className="px-4 py-2 align-middle">{p.payType}</td>
                  <td className="py-2 align-middle">
                    <PaymentStatusBadge status={p.status} />
                  </td>
                </tr>
              ))}

              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-slate-400">
                    조건에 맞는 결제 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
