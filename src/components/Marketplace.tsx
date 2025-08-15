import React, { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';

const categories = [
  'All',
  'Aromatherapy',
  'Yoga',
  'Tea',
  'Meditation',
  'Diffusers',
  'Journals',
];

const products = [
  { name: 'Aromatherapy Candle', price: '$15', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', category: 'Aromatherapy' },
  { name: 'Yoga Mat', price: '$30', img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80', category: 'Yoga' },
  { name: 'Herbal Tea Set', price: '$22', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', category: 'Tea' },
  { name: 'Meditation Cushion', price: '$40', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', category: 'Meditation' },
  { name: 'Essential Oil Diffuser', price: '$35', img: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=400&q=80', category: 'Diffusers' },
  { name: 'Wellness Journal', price: '$18', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', category: 'Journals' },
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

type Product = {
  name: string;
  price: string;
  img: string;
  category: string;
};
type CartItem = Product & { quantity: number };
const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === 'All' || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );


  interface AddToCart {
    (product: Product): void;
  }


  const addToCart: AddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.name === product.name);
      if (found) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const incrementQty = (name: string) => {
    setCart((prev) => prev.map((item) => item.name === name ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQty = (name: string) => {
    setCart((prev) => prev
      .map((item) => item.name === name ? { ...item, quantity: item.quantity - 1 } : item)
      .filter((item) => item.quantity > 0)
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-3 sm:p-8 md:p-12 flex flex-col items-center relative overflow-hidden border border-teal-100 z-10 backdrop-blur-xl">
        {/* Header with cart icon */}
        <div className="flex w-full items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center flex-1">Wellness Marketplace</h1>
          <button className="relative ml-4" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <ShoppingCart className="h-7 w-7 text-teal-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{cart.length}</span>
            )}
          </button>
        </div>

        {/* Cart Drawer/Modal */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in flex flex-col">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl" onClick={() => setCartOpen(false)} aria-label="Close cart">&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-600 text-center">Your cart is empty.</p>
              ) : (
                <ul className="mb-4 divide-y divide-gray-200">
                  {cart.map((item, idx) => (
                    <li key={item.name + idx} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
                          onClick={() => decrementQty(item.name)}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >-</button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300"
                          onClick={() => incrementQty(item.name)}
                          aria-label={`Increase quantity of ${item.name}`}
                        >+</button>
                        <span className="text-teal-600 font-bold ml-2">{item.price}</span>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold"
                          onClick={() => removeFromCart(item.name)}
                          aria-label={`Remove ${item.name} from cart`}
                        >&times;</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="w-full bg-gradient-to-r from-teal-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-teal-700 hover:to-purple-700 transition-all duration-200 mt-2"
                onClick={() => {
                  window.open('https://www.instagram.com/_nirvaha_?igsh=amxrZXZ5emJuOHoz', '_blank');
                  setCartOpen(false);
                }}
                disabled={cart.length === 0}
              >
                Place Order via Instagram
              </button>
            </div>
          </div>
        )}
        {/* Search and categories */}
        <div className="flex flex-col sm:flex-row w-full gap-4 mb-8">
          <div className="flex-1 flex items-center bg-white rounded-xl shadow px-3 py-2 border border-gray-200">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-base"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium border transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-teal-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full">
          {filteredProducts.map((product) => (
            <div key={product.name} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100 hover:shadow-lg transition-all">
              <img src={product.img} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-4" />
              <h4 className="font-semibold mb-2 text-center">{product.name}</h4>
              <span className="text-teal-600 font-bold mb-2">{product.price}</span>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-4 py-2 rounded-full font-medium shadow hover:from-teal-600 hover:to-purple-600 transition"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-white border border-teal-500 text-teal-600 px-4 py-2 rounded-full font-medium hover:bg-teal-50 transition"
                  onClick={() => alert('View details coming soon!')}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;