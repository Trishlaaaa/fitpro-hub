import { useState } from 'react';
import { Lock, Check, Zap } from 'lucide-react';
import Header from '@/components/Header';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState('shipping');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: '123 Fitness Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    // Payment
    cardName: 'John Doe',
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvv: '123',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cartTotal = 8097;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container-fitness py-16 md:py-32 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center max-w-lg">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-4">
              Order Placed!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your order has been confirmed. Check your email for order details and tracking information.
            </p>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-2xl font-bold font-khand text-primary">FIT-2024-001547</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Checkout
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            {/* Steps */}
            <div className="flex gap-4 mb-12">
              {['shipping', 'payment', 'confirmation'].map((step, index) => {
                const steps = ['shipping', 'payment', 'confirmation'];
                const stepIndex = steps.indexOf(step);
                const currentStepIndex = steps.indexOf(currentStep);
                const isCompleted = stepIndex < currentStepIndex;
                const isCurrent = stepIndex === currentStepIndex;

                return (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        isCompleted ? 'bg-green-500' : 'bg-muted'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="card-elevated p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
                  Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep('payment')}
                  className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="card-elevated p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold font-khand text-foreground">
                    Payment Details
                  </h2>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="4111 1111 1111 1111"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('shipping')}
                    className="flex-1 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('confirmation')}
                    className="flex-1 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Order Confirmation */}
            {currentStep === 'confirmation' && (
              <div className="card-elevated p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      Shipping To
                    </p>
                    <p className="text-foreground font-semibold">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{formData.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="flex-1 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    <Zap className="w-5 h-5" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="card-elevated sticky top-32 p-6">
              <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3 items</span>
                  <span className="font-semibold">₹7,097</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span className="font-semibold">₹1,278</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold font-khand text-primary">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Secure Payment by</p>
                <p className="font-bold text-foreground">Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
