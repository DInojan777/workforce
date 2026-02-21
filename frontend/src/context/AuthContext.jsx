import { createContext, useContext, useState, useEffect } from 'react';
import { getDashboard } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchDashboard();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            if (res.success && res.details) {
                setUser(res.details.user_details);
                setPermissions(res.details.permission_details);
            } else {
                logout();
            }
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = (authToken) => {
        localStorage.setItem('auth_token', authToken);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
        setPermissions(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, permissions, loading, isAuthenticated, login, logout, fetchDashboard }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
