import React, { createContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation'
import api from '@/services/api';
import AuthService from '@/services/api/auth';
import { IAuthContextData } from '@/contexts/auth/interfaces';
import { IUser } from '@/interfaces/user';

const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // The access token for the authenticated user.
  const [accessToken, setAccessToken] = useState('');

  // The authenticated user.
  const [user, setUser] = useState({} as IUser);

  // router used to redirect the user.
  const router = useRouter();

  async function signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn({ email, password });
      const { plain_text_token, user } = response.data.data;
      saveSignIn(plain_text_token, user);
    } catch (error) {
      throw error;
    }
  }

  function saveSignIn(accessToken: string, user: IUser, withRedirect = true) {
    if(accessToken && user) {
      setAccessToken(accessToken);
      setUser(user);

      // Save access token in local storage.
      localStorage.setItem('@logzz:accessToken', accessToken);

      // Set authorization header.
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      if(withRedirect) {
        router.push('/');
      }
    } else {
      throw new Error('Not provided access token or user');
    }
  }

  async function checkAuthentication() {
    const accessToken = localStorage.getItem('@logzz:accessToken');
    if(accessToken) {
      const response = await AuthService.getMyData(accessToken);
      const user = response.data.data;
      saveSignIn(accessToken, user, false);
    }
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const response = await AuthService.signUp({ name, email, password });
      const { plain_text_token, user } = response.data.data;
      saveSignIn(plain_text_token, user);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await AuthService.signOut();

      localStorage.removeItem('@logzz:accessToken');

      setAccessToken('');
      setUser({} as IUser);
      delete api.defaults.headers.common['Authorization'];

      router.push('/sign-in');
    } catch (error) {
      throw error;
    }
  }

  async function updateUserProfile(name: string, email: string, password?: string|null) {
    try {
      const response = await AuthService.update({ name, email, password });
      setUser(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!accessToken, 
        accessToken, 
        user, 
        signIn,
        signUp,
        signOut,
        checkAuthentication,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };