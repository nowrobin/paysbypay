import type { MerchantDetail, MerchantStatusType } from '@/types/merchants';

export type MerchantStatusFilter = 'ALL' | MerchantStatusType;

export interface MerchantFilterState {
  search: string;
  statusFilter: MerchantStatusFilter;
  bizTypes: string[];
}

function normalize(value: string | undefined | null): string {
  if (!value) return '';
  return value.toLowerCase().trim();
}

export function filterMerchantList(
  merchants: MerchantDetail[],
  filter: MerchantFilterState,
): MerchantDetail[] {
  const { search, statusFilter, bizTypes } = filter;
  const searchNorm = normalize(search);
  const hasBizFilter = bizTypes.length > 0;

  return merchants.filter(m => {
    if (statusFilter !== 'ALL' && m.status !== statusFilter) {
      return false;
    }

    if (hasBizFilter && !bizTypes.includes(m.bizType)) {
      return false;
    }

    if (searchNorm) {
      const codeNorm = normalize(m.mchtCode);
      const nameNorm = normalize(m.mchtName);
      if (!codeNorm.includes(searchNorm) && !nameNorm.includes(searchNorm)) {
        return false;
      }
    }

    return true;
  });
}

export function filterMerchantDetails(
  merchants: MerchantDetail[],
  filter: MerchantFilterState,
): MerchantDetail[] {
  const { search, statusFilter, bizTypes } = filter;
  const searchNorm = normalize(search);
  const hasBizFilter = bizTypes.length > 0;

  return merchants.filter(m => {
    if (statusFilter !== 'ALL' && m.status !== statusFilter) {
      return false;
    }

    if (hasBizFilter && !bizTypes.includes(m.bizType)) {
      return false;
    }

    if (searchNorm) {
      const codeNorm = normalize(m.mchtCode);
      const nameNorm = normalize(m.mchtName);
      if (!codeNorm.includes(searchNorm) && !nameNorm.includes(searchNorm)) {
        return false;
      }
    }

    return true;
  });
}
