import { Payment } from '@/types/payments';

function PaymentStatusBadge({ status }: { status: Payment['status'] }) {
  const map: Record<Payment['status'], { label: string; cls: string }> = {
    SUCCESS: { label: '성공', cls: 'bg-emerald-50 text-emerald-700' },
    FAILED: { label: '실패', cls: 'bg-red-50 text-red-700' },
    CANCELLED: { label: '취소', cls: 'bg-slate-100 text-slate-600' },
    PENDING: { label: '대기', cls: 'bg-amber-50 text-amber-700' },
  };

  const v = map[status];

  return (
    <span
      className={`w-full items-center text-center px-4 rounded-full py-1 text-sm font-medium ${v.cls}`}
    >
      {v.label}
    </span>
  );
}

export default PaymentStatusBadge;
