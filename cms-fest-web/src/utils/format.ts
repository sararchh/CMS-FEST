import { sanitizeNumber } from "./string";

export const formatPhoneNumber = (phoneNumber: string) => {
  let cleaned = sanitizeNumber(phoneNumber ? phoneNumber.replace("+55", "") : "");

  if (cleaned.length > 10) {
    cleaned = cleaned.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (cleaned.length > 6) {
    cleaned = cleaned.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (cleaned.length > 2) {
    cleaned = cleaned.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    cleaned = cleaned.replace(/^(\d*)/, "$1");
  }
  return cleaned.substr(0, 15);
};

export const formatCPF = (cpfNumber: string) => {
  let cleaned = sanitizeNumber(cpfNumber);

  if (cleaned.length > 9) {
    cleaned = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  } else if (cleaned.length > 6) {
    cleaned = cleaned.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  } else if (cleaned.length > 3) {
    cleaned = cleaned.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  } else {
    cleaned = cleaned.replace(/^(\d*)/, "$1");
  }

  return cleaned.substring(0, 14);
};

export const formatCNPJ = (cnpjNumber: string) => {
  let cleaned = sanitizeNumber(cnpjNumber);

  cleaned = cleaned.replace(/(\d{2})(\d)/, "$1.$2");
  cleaned = cleaned.replace(/(\d{3})(\d)/, "$1.$2");
  cleaned = cleaned.replace(/(\d{3})(\d)/, "$1/$2");
  cleaned = cleaned.replace(/(\d{4})(\d{2})$/, "$1-$2");

  return cleaned.substring(0, 18);
};

export const formatZipcode = (cep: string) => {
  cep = cep.replace(/\D/g, "");
  cep = cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  return cep;
};

