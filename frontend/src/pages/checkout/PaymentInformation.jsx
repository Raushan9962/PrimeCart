import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentInformation = ({ formData, handleInputChange, nextStep, prevStep }) => {
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your connection.');
      return;
    }

    // Normally, you'd fetch this data from your server.
    const options = {
      key: 'RAZORPAY_KEY_ID', // Replace with your Razorpay key
      amount: 50000, // Amount in paise (e.g., 50000 = ₹500)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: '/logo.png', // Optional: your logo
      order_id: 'order_9A33XWu170gUtm', // Replace with actual order ID from server
      handler: function (response) {
        alert('Payment Successful!');
        console.log('Razorpay Response:', response);
        // You can proceed to next step or save data to backend here
        nextStep();
      },
      prefill: {
        name: formData.cardName,
        email: formData.email || '',
        contact: formData.phone || '',
      },
      theme: {
        color: '#7C3AED', // Tailwind purple-600
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          💳 You can now pay securely with Razorpay! Test mode enabled.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="123"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="sameAsShipping"
          checked={formData.sameAsShipping}
          onChange={handleInputChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">
          Billing address same as shipping address
        </label>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={prevStep} variant="outline" className="px-8 py-2">
          Back
        </Button>
        <Button
          type="button"
          onClick={handleRazorpayPayment}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentInformation;
