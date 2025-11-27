'use client';

import MerchantStatusBadge from '@/app/merchants/components/badge/status';
import PaymentStatusBadge from '@/app/payments/components/badge';
import { useMerchantDetails, useMerchants } from '@/hooks/merchants/useMerchants';
import { usePayments } from '@/hooks/payments/usePayments';
import { formatDateToYMD } from '@/utils/date';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

function Dashboard() {
  const { data: merchants } = useMerchants();
  const { data: merchantsDetailList } = useMerchantDetails();
  const { data: payments } = usePayments();

  if (!merchants || !payments || !merchantsDetailList) return <div> Loading.....</div>;

  const totalsByCurrency = payments.reduce((acc, p) => {
    const amount = Number(p.amount);
    acc[p.currency] = (acc[p.currency] ?? 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const formatNumber = (value: number) =>
    value.toLocaleString('ko-KR', {
      maximumFractionDigits: 0,
    });

  const totalKRW = formatNumber(totalsByCurrency['KRW']) ?? 0;
  const totalUSD = formatNumber(totalsByCurrency['USD']) ?? 0;
  const totalAmount = totalsByCurrency['KRW'] + totalsByCurrency['USD'] * 1400;
  const avgAmount = formatNumber(totalAmount / merchants.length);

  const latestPayments = [...payments]
    .sort((a, b) => new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime())
    .slice(0, 10);

  const latestRegistered = [...merchantsDetailList]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, 10);

  return (
    <div className="flex flex-col w-full max-w-[1920px] bg-blue-100 p-6 h-fit gap-4">
      <header>
        <h1 className="text-3xl font-medium">대시보드</h1>
        <span>결제 및 가맹점 현황을 한눈에 확인하세요</span>
      </header>
      <main>
        <article className="grid grid-cols-5 w-full justify-items-stretch gap-4">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">원화 총 거래액</div>
            <div className="mt-1 text-xl font-semibold">{`₩${totalKRW}`}</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">달러 총 거래액</div>
            <div className="mt-1 text-xl font-semibold">{`$${totalUSD}`}</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">거래 건수</div>
            <div className="mt-1 text-xl font-semibold">{`${payments.length}건`}</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">가맹점 수</div>
            <div className="mt-1 text-xl font-semibold">{`${merchants.length}`}</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs text-gray-500">평균 거래액</div>
            <div className="mt-1 text-xl font-semibold">{`₩${avgAmount}원`}</div>
          </div>
        </article>
        <section className="flex flex-row justify-between gap-4">
          <div className="flex flex-col w-1/2 mt-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">최근 등록된 가맹점</h1>
              <Link
                href="/merchants"
                className="flex flex-row gap-2 justify-center items-center text-base font-normal hover:bg-blue-400 p-2 rounded-lg hover:text-white bg-white text-blue-400"
              >
                전체 가맹점 보러가기
                <MoveRight />
              </Link>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-5 gap-3 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">
                <span>가맹점</span>
                <span>매장유형</span>
                <span>등록일시</span>
                <span>매장코드</span>
                <span>상태</span>
              </div>
              <div className="mt-1 flex flex-col divide-y bg-white divide-gray-200 border border-gray-100 rounded-md">
                {latestRegistered.map(m => (
                  <div
                    key={m.mchtCode}
                    className="grid grid-cols-5 gap-3 px-3 py-2 text-sm items-center hover:bg-gray-50 h-12"
                  >
                    <div className="font-medium">{m.mchtName}</div>
                    <div className="text-gray-700">{m.bizType}</div>
                    <div className="text-gray-500 text-xs">{formatDateToYMD(m.registeredAt)}</div>
                    <div className="text-[11px] text-gray-600 truncate">{m.mchtCode}</div>
                    <MerchantStatusBadge status={m.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2  mt-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">최근 결제된 내역</h1>
              <Link
                href={'/payment'}
                className="flex flex-row gap-2 justify-center items-center text-base font-normal hover:bg-blue-400 p-2 rounded-lg hover:text-white bg-white text-blue-400"
              >
                전체 결제내역
                <MoveRight />
              </Link>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-5 gap-3 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">
                <span>금액</span>
                <span>결제수단</span>
                <span>결제일시</span>
                <span>코드</span>
                <span>상태</span>
              </div>
              <div className="mt-1 flex flex-col divide-y bg-white divide-gray-200 border border-gray-100 rounded-md">
                {latestPayments.map(p => (
                  <div
                    key={p.paymentCode}
                    className="grid grid-cols-5 gap-3 px-3 py-2 text-sm items-center hover:bg-gray-50 h-12"
                  >
                    <div className="font-medium">
                      {p.currency} {p.amount.toLocaleString()}
                    </div>
                    <div className="text-gray-700">{p.payType}</div>
                    <div className="text-gray-500 text-xs">{formatDateToYMD(p.paymentAt)}</div>
                    <div className="text-[11px] text-gray-600 truncate">{p.paymentCode}</div>
                    <PaymentStatusBadge status={p.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
