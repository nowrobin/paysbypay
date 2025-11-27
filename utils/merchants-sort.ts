import type { MerchantDetail } from '@/types/merchants';

export type MerchantSortType =
  | 'REGISTERED_NEWEST'
  | 'REGISTERED_OLDEST'
  | 'UPDATED_NEWEST'
  | 'UPDATED_OLDEST'
  | 'NAME_ASC';

function toDate(value?: string) {
  const d = new Date(value ?? '');
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export function sortMerchants<T extends MerchantDetail>(
  merchants: T[],
  sortType: MerchantSortType,
): T[] {
  const sorted = [...merchants];

  switch (sortType) {
    case 'REGISTERED_NEWEST':
      sorted.sort((a, b) => toDate(b.registeredAt) - toDate(a.registeredAt));
      break;

    case 'REGISTERED_OLDEST':
      sorted.sort((a, b) => toDate(a.registeredAt) - toDate(b.registeredAt));
      break;

    case 'UPDATED_NEWEST':
      sorted.sort((a, b) => toDate(b.updatedAt) - toDate(a.updatedAt));
      break;

    case 'UPDATED_OLDEST':
      sorted.sort((a, b) => toDate(a.updatedAt) - toDate(b.updatedAt));
      break;

    case 'NAME_ASC':
      sorted.sort((a, b) => a.mchtName.localeCompare(b.mchtName, 'ko'));
      break;
  }

  return sorted;
}
