import { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import Header from '@/components/Header';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', joined: '2024-01-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', joined: '2023-12-10', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', joined: '2024-02-01', status: 'Inactive' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', joined: '2024-01-25', status: 'Active' },
  ]);

  const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
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
              User Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Total users: {users.length}
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold font-khand uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors h-fit">
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-foreground font-semibold">{user.name}</td>
                    <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{user.joined}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.status === 'Active'
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-orange-500/20 text-orange-600'
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
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
