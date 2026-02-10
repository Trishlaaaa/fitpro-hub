import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Whey Protein Powder',
      price: 1299,
      quantity: 2,
      image: '🥤',
    },
    {
      id: 3,
      name: 'Adjustable Dumbbells',
      price: 4999,
      quantity: 1,
      image: '🏋️',
    },
    {
      id: 4,
      name: 'Yoga Mat',
      price: 799,
      quantity: 1,
      image: '🧘',
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Shopping Cart
          </h1>
          <p className="text-lg text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="card-elevated p-6 flex items-center gap-6"
                  >
                    <div className="text-5xl flex-shrink-0">{item.image}</div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-khand text-foreground mb-1">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        ₹{item.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 px-2 py-1 rounded-lg border border-border bg-input text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        Subtotal
                      </p>
                      <p className="text-2xl font-bold text-primary mb-4">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="card-elevated sticky top-32">
                <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span className="font-semibold text-foreground">
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Shipping {shipping === 0 && <span className="text-green-600">(Free)</span>}
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹{shipping.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 pb-6 border-b border-border">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold font-khand text-primary">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/5 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-6" />
            <h2 className="text-2xl font-bold font-khand text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start adding items to your cart
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              Browse Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
