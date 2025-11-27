// import type { Payment, PaymentStatusType, PaymentMethodType } from '@/types/payments';
// export function parseAmount(amount: string): number {
//   const n = Number(amount);
//   return Number.isNaN(n) ? 0 : n;
// }

// /**
//  * yyyy-MM-dd 형식으로 자르기
//  */
// export function toDateKey(iso: string): string {
//   return iso.slice(0, 10); // "2025-11-01T00:10:00" -> "2025-11-01"
// }

// /**
//  * 전체 요약
//  */
// export function summarizePayments(payments: Payment[]) {
//   const result = {
//     totalCount: payments.length,
//     byCurrency: {} as Record<
//       string,
//       {
//         totalAmount: number;
//         byStatus: Record<PaymentStatusType, { count: number; amount: number }>;
//       }
//     >,
//   };

//   for (const p of payments) {
//     const currency = p.currency;
//     if (!result.byCurrency[currency]) {
//       result.byCurrency[currency] = {
//         totalAmount: 0,
//         byStatus: {
//           PENDING: { count: 0, amount: 0 },
//           SUCCESS: { count: 0, amount: 0 },
//           FAILED: { count: 0, amount: 0 },
//           CANCELLED: { count: 0, amount: 0 },
//         },
//       };
//     }
//     const bucket = result.byCurrency[currency];
//     const amt = parseAmount(p.amount);

//     bucket.totalAmount += amt;
//     bucket.byStatus[p.status].count += 1;
//     bucket.byStatus[p.status].amount += amt;
//   }

//   return result;
// }

// /**
//  * 결제수단별 요약
//  */
// export function summarizeByPayType(payments: Payment[]) {
//   const byPayType: Record<
//     PaymentMethodType,
//     {
//       count: number;
//       amount: number;
//       byStatus: Record<PaymentStatusType, { count: number; amount: number }>;
//     }
//   > = {
//     ONLINE: initPayTypeBucket(),
//     DEVICE: initPayTypeBucket(),
//     MOBILE: initPayTypeBucket(),
//     VACT: initPayTypeBucket(),
//     BILLING: initPayTypeBucket(),
//   };

//   for (const p of payments) {
//     const bucket = byPayType[p.payType];
//     const amt = parseAmount(p.amount);
//     bucket.count += 1;
//     bucket.amount += amt;
//     bucket.byStatus[p.status].count += 1;
//     bucket.byStatus[p.status].amount += amt;
//   }

//   return byPayType;
// }

// function initPayTypeBucket() {
//   return {
//     count: 0,
//     amount: 0,
//     byStatus: {
//       PENDING: { count: 0, amount: 0 },
//       SUCCESS: { count: 0, amount: 0 },
//       FAILED: { count: 0, amount: 0 },
//       CANCELLED: { count: 0, amount: 0 },
//     },
//   };
// }

// /**
//  * 가맹점별 요약 (정산/대시보드에서 사용)
//  */
// export function summarizeByMerchant(payments: Payment[]) {
//   const byMerchant: Record<
//     string,
//     {
//       mchtCode: string;
//       totalCount: number;
//       totalAmount: number;
//       successCount: number;
//       successAmount: number;
//       failedCount: number;
//       cancelledCount: number;
//     }
//   > = {};

//   for (const p of payments) {
//     if (!byMerchant[p.mchtCode]) {
//       byMerchant[p.mchtCode] = {
//         mchtCode: p.mchtCode,
//         totalCount: 0,
//         totalAmount: 0,
//         successCount: 0,
//         successAmount: 0,
//         failedCount: 0,
//         cancelledCount: 0,
//       };
//     }

//     const bucket = byMerchant[p.mchtCode];
//     const amt = parseAmount(p.amount);

//     bucket.totalCount += 1;
//     bucket.totalAmount += amt;

//     if (p.status === 'SUCCESS') {
//       bucket.successCount += 1;
//       bucket.successAmount += amt;
//     } else if (p.status === 'FAILED') {
//       bucket.failedCount += 1;
//     } else if (p.status === 'CANCELLED') {
//       bucket.cancelledCount += 1;
//     }
//   }

//   return byMerchant;
// }

// /**
//  * 일자별 요약 (그래프용)
//  */
// export function summarizeByDate(payments: Payment[]) {
//   const byDate: Record<
//     string,
//     {
//       date: string;
//       totalCount: number;
//       totalAmount: number;
//       successCount: number;
//       successAmount: number;
//       failedCount: number;
//       cancelledCount: number;
//     }
//   > = {};

//   for (const p of payments) {
//     const dateKey = toDateKey(p.paymentAt);
//     if (!byDate[dateKey]) {
//       byDate[dateKey] = {
//         date: dateKey,
//         totalCount: 0,
//         totalAmount: 0,
//         successCount: 0,
//         successAmount: 0,
//         failedCount: 0,
//         cancelledCount: 0,
//       };
//     }

//     const bucket = byDate[dateKey];
//     const amt = parseAmount(p.amount);

//     bucket.totalCount += 1;
//     bucket.totalAmount += amt;

//     if (p.status === 'SUCCESS') {
//       bucket.successCount += 1;
//       bucket.successAmount += amt;
//     } else if (p.status === 'FAILED') {
//       bucket.failedCount += 1;
//     } else if (p.status === 'CANCELLED') {
//       bucket.cancelledCount += 1;
//     }
//   }

//   return Object.values(byDate).sort((a, b) => (a.date < b.date ? -1 : 1));
// }
