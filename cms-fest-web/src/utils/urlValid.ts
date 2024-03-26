export const isValidUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocolo http ou https
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // nome de domínio
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OU endereço IP
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragmento

  return !!pattern.test(url);
};
