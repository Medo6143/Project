import { createContext, useContext, useState } from 'react';

type Page = 'home' | 'products' | 'cart' | 'admin';

interface RouterContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  navigate: (page: Page) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPage, setCurrentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}
