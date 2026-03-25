import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  profileImage?: string;
}

interface MockAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const mockUser: User = {
  id: '1',
  name: 'Ololade Tosin',
  profileImage: undefined,
};

export function useAuth() {
  const [state, setState] = useState<MockAuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate loading - check for existing session
    const timer = setTimeout(() => {
      const savedAuth = localStorage.getItem('mockAuth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        // Force update if old user data exists
        if (parsed.user?.name === 'Demo User') {
          // Update to new user name
          const updatedAuth = {
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          };
          setState(updatedAuth);
          localStorage.setItem('mockAuth', JSON.stringify({ user: mockUser }));
        } else {
          setState({
            user: parsed.user,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = () => {
    const newState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    };
    setState(newState);
    localStorage.setItem('mockAuth', JSON.stringify({ user: mockUser }));
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('mockAuth');
  };

  return {
    ...state,
    login,
    logout,
  };
}
