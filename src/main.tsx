import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { RouterProvider } from './context/RouterContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CartProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </CartProvider>
    </LanguageProvider>
  </StrictMode>
);
