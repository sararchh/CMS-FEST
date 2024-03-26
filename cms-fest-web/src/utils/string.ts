export const sanitizeNumber = (val: string) => String(val).replace(/\D/g, '');

export function normalizeString(string: string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function normalizeStringWithSpecialCaracteres(string: string) {
  const normalizedString = string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();


  return normalizedString.replace(/[^a-z0-9 ]/g, '');
}
