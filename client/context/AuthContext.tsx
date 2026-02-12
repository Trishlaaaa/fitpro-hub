
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface AuthContextType {
    user: any;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await api.get('/me/');
                setUser(res.data);
            } catch (err) {
                console.error('Auth check failed:', err);
                localStorage.removeItem('token');
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        checkAuth();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Optionally call backend logout endpoint
        api.post('/auth/logout/').catch(console.error);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, checkAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
