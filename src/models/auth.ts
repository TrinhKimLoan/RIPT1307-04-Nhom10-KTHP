import { login as loginService } from '@/services/Auth';

export default () => {
  const login = (email: string, password: string) => {
    return loginService(email, password);
  };

  return {
    login
  };
};