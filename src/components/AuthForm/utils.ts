export const hasLetterChecking = (value: string): boolean => {
  if (value.search(/[A-Za-zА-Яа-яЁё]/) === -1) return false;
  return true;
};

export const hasDigitChecking = (value: string): boolean => {
  if (value.search(/\d/) === -1) return false;
  return true;
};

export const hasSpecCharChecking = (value: string): boolean => {
  if (value.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) return false;
  return true;
};
