import { IsoDateString } from '../common';

export type PaymentMethodType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING';

export interface PaymentMethod {
  type: PaymentMethodType;
  description: string;
}

export type PaymentStatusType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface PaymentStatus {
  code: PaymentStatusType;
  description: string;
}

export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: PaymentMethodType;
  status: PaymentStatusType;
  paymentAt: IsoDateString;
}

export interface CancelPaymentRequest {
  reason: string;
}

export interface CancelPaymentResponse {
  success: boolean;
  payment: Payment;
}
