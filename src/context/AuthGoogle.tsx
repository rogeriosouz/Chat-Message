import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

type PropsAuthGoogle = {
  singIn: () => void;
  user: UserProsp;
  sigOut: () => void;
  isLogin: boolean;
};

export const AppContext = createContext({} as PropsAuthGoogle);

type UserProsp = {
  name: string;
  photoUrl: string;
  userId: string;
};

export function AuthGoogle({ children }: any) {
  const router = useNavigate();

  const [user, setUser] = useState<UserProsp>({
    name: '',
    photoUrl: '',
    userId: '',
  });

  function sigOut() {
    auth.signOut();
    router('/');
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser({
        name: user?.providerData[0].displayName as string,
        photoUrl: user?.providerData[0].photoURL as string,
        userId: user?.providerData[0].uid as string,
      });
    });
  }, []);

  const isLogin = !!user;

  function singIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({
          name: user?.providerData[0].displayName as string,
          photoUrl: user?.providerData[0].photoURL as string,
          userId: user?.providerData[0].uid as string,
        });

        router('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
  }

  return (
    <AppContext.Provider value={{ singIn, user, sigOut, isLogin }}>
      {children}
    </AppContext.Provider>
  );
}
