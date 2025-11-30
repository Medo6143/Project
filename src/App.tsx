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
import { useRouter } from './context/RouterContext';
import LanguageToggle from './components/LanguageToggle';

function App() {
  const { currentPage } = useRouter();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      {currentPage === 'home' && (
        <>
          <Hero />
          <Categories />
          <Products />
          <About />
          <Contact />
          <OrderForm />
          <CarAnimation />
        </>
      )}

      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'admin' && <AdminDashboard />}

      <Footer />
      <LanguageToggle />
    </div>
  );
}

export default App;
