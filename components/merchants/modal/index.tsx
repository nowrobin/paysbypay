import MerchantStatusBadge from '@/components/merchants/badge/status';
import PaymentStatusBadge from '@/components/payments/badge';
import { useMerchantDetail } from '@/hooks/merchants/useMerchants';
import { formatDateToYMD } from '@/utils/date';
import { Store, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

type MerchantModal = {
  mchtCode: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

function MerchantModal({ mchtCode, setModalOpen }: MerchantModal) {
  const { data } = useMerchantDetail(mchtCode);
  if (!data?.merchant || !data?.payments) {
    return <div>로딩중...</div>;
  }
  const { mchtName, status, bizType, bizNo, address, phone, email, registeredAt, updatedAt } =
    data.merchant;
  const payments = data.payments;

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 바깥 오버레이 클릭과 구분
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 flex flex-col gap-4"
        onClick={handleModalContentClick}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <Store
              width={40}
              height={40}
              className="p-1 ring-2 ring-blue-300 text-blue-500 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold">{mchtName}</span>
              <span className="text-xs text-gray-500">{mchtCode}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1 hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </header>
        <section className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">상태</span>
            <MerchantStatusBadge status={status} />
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">업종</span>
            <span>{bizType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">사업자번호</span>
            <span>{bizNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">주소</span>
            <span className="text-right max-w-[60%] wrap-break-word">{address}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">연락처</span>
            <span>{phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">이메일</span>
            <a href={`mailto:${email ?? ''}`} className="text-blue-600 hover:underline">
              {email ?? 'nowrobin3@gmail.com'}
            </a>
          </div>
        </section>
        <div className="flex flex-col">
          <div className="mt-4">
            <div className="grid grid-cols-5 gap-3 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">
              <span>금액</span>
              <span>결제수단</span>
              <span>결제일시</span>
              <span>코드</span>
              <span>상태</span>
            </div>
            <div className="mt-1 flex flex-col divide-y divide-gray-200 border border-gray-100 rounded-md">
              {payments.map(p => (
                <div
                  key={p.paymentCode}
                  className="grid grid-cols-5 gap-3 px-3 py-2 text-sm items-center hover:bg-gray-50"
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

        <footer className="mt-2 border-t pt-3 text-xs text-gray-500 flex justify-between">
          <span>등록일: {formatDateToYMD(registeredAt)}</span>
          <span>수정일: {formatDateToYMD(updatedAt)}</span>
        </footer>
      </div>
    </div>
  );
}

export default MerchantModal;
