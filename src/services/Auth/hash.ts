import SHA256 from 'crypto-js/sha256';

const SALT = 'LoanTrangLinh';

export const hashPassword = (password: string): string => {
  return SHA256(password + SALT).toString();
};
