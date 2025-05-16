import { createContext, useState } from "react";


interface AuthContextType {
  isLoggedIn: boolean,
  token: string | null,
  login: (jwtToken: string) => void,
  logout: () => void
}


// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode
}

// Provider
const AuthProvider: React.FC<AuthProviderProps> = ({ children } : { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const login = (jwtToken: string) => {
    setIsLoggedIn(true);
    setToken(jwtToken)
  }

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null)
  }

  const value: AuthContextType = {
    isLoggedIn,
    token,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
