import React from 'react';
import { Button } from '@/components/ui/button';

const OrderReview = ({ formData, items, prevStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
      
      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 py-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-600">
          {formData.firstName} {formData.lastName}<br />
          {formData.address}<br />
          {formData.city}, {formData.state} {formData.zipCode}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">
          Card ending in **** {formData.cardNumber.slice(-4)}
        </p>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={prevStep}
          variant="outline"
          className="px-8 py-2"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;