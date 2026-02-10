import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import Header from '@/components/Header';

export default function AdminProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Whey Protein Powder', category: 'Protein', price: 1299, stock: 45, image: '🥤' },
    { id: 2, name: 'Creatine Monohydrate', category: 'Protein', price: 499, stock: 78, image: '💊' },
    { id: 3, name: 'Adjustable Dumbbells', category: 'Equipment', price: 4999, stock: 12, image: '🏋️' },
    { id: 4, name: 'Yoga Mat', category: 'Accessories', price: 799, stock: 56, image: '🧘' },
    { id: 5, name: 'Resistance Bands Set', category: 'Equipment', price: 999, stock: 34, image: '📌' },
  ]);

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
              Product Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Total products: {products.length}
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors h-fit">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.image}</span>
                        <span className="text-foreground font-semibold">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                    <td className="py-4 px-6 text-primary font-bold">₹{product.price}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${product.stock > 20
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-orange-500/20 text-orange-600'
                          }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
