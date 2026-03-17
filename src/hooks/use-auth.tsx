'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { demoUser } from '@/lib/data';
import type { User } from '@/lib/types';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you might check for a token in localStorage here.
    // For this demo, we are explicitly setting a demo user on the client side
    // to prevent hydration issues where server renders null and client renders user.
    setUser(demoUser);
    setIsLoading(false);
  }, []);


  const login = () => {
    // In a real app, you'd handle authentication here
    setIsLoading(true);
    setUser(demoUser);
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    setIsLoading(false);
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
