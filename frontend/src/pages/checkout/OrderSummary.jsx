import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Truck, Check } from 'lucide-react';

const OrderSummary = ({ subtotal, shipping, tax, total, checkoutPath, isCartPage = false, items = [] }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      {!isCartPage && items.length > 0 && (
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
              <span className="text-gray-600 truncate pr-2">
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span className="font-medium whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 mb-6 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span className="font-medium">₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {isCartPage && subtotal < 4000 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-800">
            Add ₹{(4000 - subtotal).toLocaleString('en-IN')} more for free shipping!
          </p>
        </div>
      )}

      {isCartPage && (
        <>
          <Link to={checkoutPath} className="w-full">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}

      <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Secure SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="h-4 w-4 text-blue-600" />
          <span>Free shipping on orders over ₹4,000</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-purple-600" />
          <span>30-day return guarantee</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;