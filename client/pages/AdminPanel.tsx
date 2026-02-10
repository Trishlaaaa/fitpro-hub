import { Users, ShoppingCart, Dumbbell, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function AdminPanel() {
  const stats = [
    {
      label: 'Total Users',
      value: '2,453',
      change: '+12% this month',
      icon: Users,
      color: 'text-blue-500',
      href: '/admin/users',
    },
    {
      label: 'Total Orders',
      value: '1,847',
      change: '+8% this month',
      icon: ShoppingCart,
      color: 'text-primary',
      href: '/admin/products',
    },
    {
      label: 'Workouts Created',
      value: '156',
      change: '+5 this week',
      icon: Dumbbell,
      color: 'text-green-500',
      href: '/admin/workouts',
    },
    {
      label: 'Revenue',
      value: '₹15,42,000',
      change: '+18% this month',
      icon: TrendingUp,
      color: 'text-orange-500',
      href: '/admin',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', user: 'John Doe', amount: '₹8,097', status: 'Completed' },
    { id: 'ORD-002', user: 'Jane Smith', amount: '₹3,499', status: 'Processing' },
    { id: 'ORD-003', user: 'Mike Johnson', amount: '₹5,699', status: 'Pending' },
    { id: 'ORD-004', user: 'Sarah Williams', amount: '₹2,299', status: 'Completed' },
    { id: 'ORD-005', user: 'Tom Brown', amount: '₹4,199', status: 'Shipped' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-background">
      <Header />

      <div className="container-fitness py-8 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-khand text-foreground mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage users, products, and content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.href}
                className="card-elevated hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className={`p-3 rounded-lg bg-primary/10 inline-block mb-4 group-hover:bg-primary/20 transition-colors`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold font-khand text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Management Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/admin/users"
            className="card-elevated hover:shadow-2xl transition-all p-8 text-center group"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold font-khand text-foreground mb-2">
              Manage Users
            </h3>
            <p className="text-muted-foreground mb-4">
              View and manage user accounts and permissions
            </p>
            <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Go to Users →
            </button>
          </Link>

          <Link
            to="/admin/products"
            className="card-elevated hover:shadow-2xl transition-all p-8 text-center group"
          >
            <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold font-khand text-foreground mb-2">
              Manage Products
            </h3>
            <p className="text-muted-foreground mb-4">
              Add, edit, and remove products from your shop
            </p>
            <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Go to Products →
            </button>
          </Link>

          <Link
            to="/admin/workouts"
            className="card-elevated hover:shadow-2xl transition-all p-8 text-center group"
          >
            <Dumbbell className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold font-khand text-foreground mb-2">
              Manage Workouts
            </h3>
            <p className="text-muted-foreground mb-4">
              Create and manage workout programs
            </p>
            <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Go to Workouts →
            </button>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="card-elevated">
          <h2 className="text-2xl font-bold font-khand text-foreground mb-6">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-foreground font-semibold">{order.id}</td>
                    <td className="py-3 px-4 text-foreground">{order.user}</td>
                    <td className="py-3 px-4 text-primary font-bold">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Completed'
                            ? 'bg-green-500/20 text-green-600'
                            : order.status === 'Shipped'
                              ? 'bg-blue-500/20 text-blue-600'
                              : order.status === 'Processing'
                                ? 'bg-yellow-500/20 text-yellow-600'
                                : 'bg-orange-500/20 text-orange-600'
                          }`}
                      >
                        {order.status}
                      </span>
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
