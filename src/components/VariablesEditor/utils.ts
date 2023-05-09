export const validatorJSON = (value: string): boolean => {
  try {
    JSON.parse(value);
  } catch (error) {
    return false;
  }
  return true;
};
