import apiFetch from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const data = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(payload: LoginPayload): Promise<{ id: string; email: string }> {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  logout() {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('token'));
  },
};