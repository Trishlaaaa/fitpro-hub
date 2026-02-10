import { useState } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Whey Protein Powder',
      category: 'protein',
      price: 1299,
      originalPrice: 1799,
      rating: 4.8,
      reviews: 342,
      image: '🥤',
      inStock: true,
      description: '2kg Gold Standard Whey Protein',
    },
    {
      id: 2,
      name: 'Creatine Monohydrate',
      category: 'protein',
      price: 499,
      originalPrice: 699,
      rating: 4.6,
      reviews: 218,
      image: '💊',
      inStock: true,
      description: '250g pure creatine powder',
    },
    {
      id: 3,
      name: 'Adjustable Dumbbells',
      category: 'equipment',
      price: 4999,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 156,
      image: '🏋️',
      inStock: true,
      description: '5-25kg adjustable dumbbell set',
    },
    {
      id: 4,
      name: 'Yoga Mat',
      category: 'accessories',
      price: 799,
      originalPrice: 1199,
      rating: 4.5,
      reviews: 428,
      image: '🧘',
      inStock: true,
      description: '6mm thick non-slip yoga mat',
    },
    {
      id: 5,
      name: 'Protein Shaker Bottle',
      category: 'accessories',
      price: 349,
      originalPrice: 499,
      rating: 4.3,
      reviews: 187,
      image: '🥛',
      inStock: true,
      description: 'BPA-free mixer bottle with blender ball',
    },
    {
      id: 6,
      name: 'Resistance Bands Set',
      category: 'equipment',
      price: 999,
      originalPrice: 1499,
      rating: 4.6,
      reviews: 305,
      image: '📌',
      inStock: true,
      description: '5-piece resistance loop band set',
    },
    {
      id: 7,
      name: 'BCAA Supplement',
      category: 'protein',
      price: 799,
      originalPrice: 1199,
      rating: 4.4,
      reviews: 192,
      image: '💉',
      inStock: true,
      description: '400g branched chain amino acids',
    },
    {
      id: 8,
      name: 'Gym Gloves',
      category: 'accessories',
      price: 449,
      originalPrice: 699,
      rating: 4.5,
      reviews: 271,
      image: '🧤',
      inStock: true,
      description: 'Premium leather weight lifting gloves',
    },
    {
      id: 9,
      name: 'Protein Bars (Box)',
      category: 'protein',
      price: 649,
      originalPrice: 899,
      rating: 4.7,
      reviews: 389,
      image: '🍫',
      inStock: true,
      description: '12 high-protein energy bars',
    },
    {
      id: 10,
      name: 'Pull-up Bar',
      category: 'equipment',
      price: 1499,
      originalPrice: 1999,
      rating: 4.6,
      reviews: 213,
      image: '🚪',
      inStock: true,
      description: 'Door mounted chin-up bar',
    },
    {
      id: 11,
      name: 'Foam Roller',
      category: 'accessories',
      price: 899,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 156,
      image: '🔄',
      inStock: true,
      description: '30cm muscle recovery foam roller',
    },
    {
      id: 12,
      name: 'Jump Rope',
      category: 'accessories',
      price: 299,
      originalPrice: 499,
      rating: 4.4,
      reviews: 324,
      image: '🪢',
      inStock: true,
      description: 'Speed jump rope with counter',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch =
      priceRange === 'all' ||
      (priceRange === 'under-1000' && product.price < 1000) ||
      (priceRange === '1000-5000' && product.price >= 1000 && product.price <= 5000) ||
      (priceRange === 'above-5000' && product.price > 5000);
    return categoryMatch && priceMatch;
  });

  const discount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      {/* Gradient decoration - black to green */}
      <div className="absolute inset-0 h-96 bg-gradient-to-br from-primary/20 via-primary/8 to-transparent pointer-events-none" />

      <div className="container-fitness py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 text-primary font-semibold text-xs uppercase tracking-wider backdrop-blur-md border border-primary/50 shadow-lg">
              🛍️ Premium Quality
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-khand text-foreground mb-3 leading-tight">
            Fitness <span className="text-gradient">Shop</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium supplements, equipment, and accessories
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="sticky top-32 rounded-2xl p-6 bg-gradient-to-br from-background/70 via-background/60 to-background/50 border border-primary/20 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-khand text-foreground">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {['all', 'protein', 'equipment', 'accessories'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-muted/50'
                        }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                  Price
                </h3>
                <div className="space-y-2">
                  {['all', 'under-1000', '1000-5000', 'above-5000'].map((price) => (
                    <button
                      key={price}
                      onClick={() => setPriceRange(price)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${priceRange === price
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:bg-muted/50'
                        }`}
                    >
                      {price === 'all' && 'All Prices'}
                      {price === 'under-1000' && 'Under ₹1,000'}
                      {price === '1000-5000' && '₹1,000 - ₹5,000'}
                      {price === 'above-5000' && 'Above ₹5,000'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="card-elevated hover:shadow-2xl transition-all group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative mb-4 h-32 bg-primary/5 rounded-lg flex items-center justify-center text-6xl group-hover:bg-primary/10 transition-colors">
                      {product.image}
                      {product.originalPrice > product.price && (
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          -{discount(product.originalPrice, product.price)}%
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <h3 className="text-lg font-bold font-khand text-foreground mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-khand text-primary">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock & CTA */}
                    <div className="space-y-3">
                      {product.inStock ? (
                        <>
                          <p className="text-xs text-green-600 font-semibold">
                            ✓ In Stock
                          </p>
                          <Link
                            to="/cart"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-xs tracking-wider hover:bg-primary/90 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Link>
                        </>
                      ) : (
                        <button className="w-full px-6 py-3 rounded-full bg-muted text-muted-foreground font-bold font-khand uppercase text-xs tracking-wider cursor-not-allowed opacity-50">
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No products found with the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
