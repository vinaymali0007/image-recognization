import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            getMe()
                .then(res => {
                    if (res.ok) {
                        if (res.data.role === 'USER') {
                            logout();
                        } else {
                            setUser(res.data);
                        }
                    } else {
                        logout();
                    }
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password, role) => {
        const res = await apiLogin(email, password, role);
        if (res.ok) {
            if (res.data.user.role === 'USER') {
                return { ok: false, data: { message: 'Account pending administrator approval.' } };
            }
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            setUser(res.data.user);
        }
        return res;
    };

    const register = async (name, email, password, organization, role) => {
        return await apiRegister(name, email, password, organization, role);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
