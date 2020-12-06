import * as React from 'react';

import { useAuth } from '../firebase';

const UserContext = React.createContext<any>(undefined);

export const UserProvider = ({ children }: any) => {
  const auth = useAuth();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    auth.onAuthStateChanged((userAuth: any) => {
      setUser(userAuth);
    });
  }, [auth, user]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
