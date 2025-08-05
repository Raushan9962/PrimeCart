import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Men from '@/pages/Men';
import Women from '@/pages/Women';
import Kids from '@/pages/Kids';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import SearchResults from '@/pages/SearchResults';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext'; // ✅ IMPORT AUTH PROVIDER

function App() {
  return (
    <AuthProvider> {/* ✅ WRAP IN AUTH CONTEXT */}
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Helmet>
              <title>PrimeCart - Premium Shopping Experience</title>
              <meta
                name="description"
                content="Discover premium fashion and lifestyle products at PrimeCart. Shop the latest trends in men's, women's, and kids' fashion with exceptional quality and style."
              />
            </Helmet>

            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
