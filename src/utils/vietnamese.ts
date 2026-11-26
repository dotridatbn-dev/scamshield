/**
 * Tiện ích chuẩn hóa tiếng Việt không phụ thuộc thư viện ngoài.
 * Hỗ trợ bỏ dấu, chuẩn hóa khoảng trắng và tìm kiếm không phân biệt dấu.
 */

export function normalizeWhitespace(input: string): string {
  return input
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripVietnameseAccents(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function normalizeVietnameseSearch(input: string): string {
  return stripVietnameseAccents(normalizeWhitespace(input)).toLowerCase();
}

export function containsNormalizedQuery(target: string, query: string): boolean {
  const cleanQuery = normalizeVietnameseSearch(query);
  if (!cleanQuery) return true;
  const cleanTarget = normalizeVietnameseSearch(target);
  const terms = cleanQuery.split(' ').filter(Boolean);
  return terms.every((term) => cleanTarget.includes(term));
}
