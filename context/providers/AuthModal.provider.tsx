// create react context and provider for auth modal
import React, { createContext, ReactNode, useState } from 'react';

export const AuthModalContext = createContext<ReturnType<typeof useAuthModal>>({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {}
});

export const useAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return {
    isOpen,
    toggle
  };
};

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const authModal = useAuthModal();
  return (
    <AuthModalContext.Provider value={authModal}>
      {children}
    </AuthModalContext.Provider>
  );
};
