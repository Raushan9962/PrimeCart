import React from 'react';
import { CreditCard, Truck, Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: Check }
];

const CheckoutSteps = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center space-x-4 sm:space-x-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step.id
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-gray-300 text-gray-400'
            }`}
          >
            <step.icon className="h-5 w-5" />
          </div>
          <span className={`ml-2 text-sm font-medium hidden sm:inline ${
            currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
          }`}>
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 ml-2 sm:ml-4 transition-all duration-300 ${
              currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;