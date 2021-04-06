/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
import { apiAuth } from '../services/api';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@selfmenu:token');
    const user = localStorage.getItem('@selfmenu:user');

    if (token && user) {
      apiAuth.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await apiAuth.post('/login', {
      email,
      password,
    });

    const { accessToken } = response.data;
    const decoded: any = jwt.decode(accessToken);
    const user = {
      id: decoded.sub,
      email: decoded.email,
    };

    const token = accessToken;
    localStorage.setItem('@selfmenu:token', token);
    localStorage.setItem('@selfmenu:user', JSON.stringify(user));

    apiAuth.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@selfmenu:token');
    localStorage.removeItem('@selfmenu:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@selfmenu:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
