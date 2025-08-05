import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import CheckoutSteps from '@/pages/checkout/CheckoutSteps';
import ShippingInformation from '@/pages/checkout/ShippingInformation';
import PaymentInformation from '@/pages/checkout/PaymentInformation';
import OrderReview from '@/pages/checkout/OrderReview';
import OrderSummary from '@/pages/checkout/OrderSummary';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 4000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🎉 Order Placed Successfully!",
      description: "Thank you for your purchase! You'll receive a confirmation email shortly."
    });
    
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - PrimeCart</title>
          <meta name="description" content="Complete your purchase securely at PrimeCart. Fast checkout with multiple payment options." />
        </Helmet>
        <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              to="/"
              className="btn-primary text-white px-8 py-3 rounded-full font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - PrimeCart</title>
        <meta name="description" content="Complete your purchase securely at PrimeCart. Fast checkout with multiple payment options." />
      </Helmet>

      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/cart"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CheckoutSteps currentStep={currentStep} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-lg shadow-sm p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && (
                    <ShippingInformation formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} />
                  )}
                  {currentStep === 2 && (
                    <PaymentInformation formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />
                  )}
                  {currentStep === 3 && (
                    <OrderReview formData={formData} items={items} prevStep={prevStep} />
                  )}
                </form>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;