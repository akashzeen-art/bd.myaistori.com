export const COUNTRY_CODE = "+880";
// Bangladeshi mobile numbers: 1 followed by an operator digit (3-9) and 8 more digits
export const BD_MOBILE_PATTERN = /^1[3-9]\d{8}$/;

const VERIFIED_KEY = "verifiedMobile";
const PENDING_KEY = "pendingMobile";

export const normalizeNumber = (value) => {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("880")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
};

export const isValidMobile = (digits) => BD_MOBILE_PATTERN.test(digits);

export const toFullNumber = (digits) => `${COUNTRY_CODE}${digits}`;

const read = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const write = (storage, key, value) => {
  try {
    if (value == null) storage.removeItem(key);
    else storage.setItem(key, value);
  } catch {
    // storage not available
  }
};

export const getVerifiedMobile = () => read(localStorage, VERIFIED_KEY);
export const setVerifiedMobile = (fullNumber) => write(localStorage, VERIFIED_KEY, fullNumber);

export const getPendingMobile = () => read(sessionStorage, PENDING_KEY);
export const setPendingMobile = (fullNumber) => write(sessionStorage, PENDING_KEY, fullNumber);
