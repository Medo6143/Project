import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import CarAnimation from './components/CarAnimation';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import { Routes, Route } from 'react-router-dom';
import LanguageToggle from './components/LanguageToggle';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories />
              <Products />
              <About />
              <Contact />
              <OrderForm />
              <CarAnimation />
            </>
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
      <LanguageToggle />
    </div>
  );
}

export default App;
