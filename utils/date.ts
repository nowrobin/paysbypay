export function formatDateToYMD(iso: string | Date | null | undefined) {
  if (!iso) return '-';

  const date = typeof iso === 'string' ? new Date(iso) : iso;

  if (isNaN(date.getTime())) return '-';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
