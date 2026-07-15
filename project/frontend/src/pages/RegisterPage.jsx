import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Toast from '../components/Toast';

export default function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', organization: '', role: 'USER' });
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(formData.name, formData.email, formData.password, formData.organization, formData.role);
        if (res.ok) {
            setToast('Registration successful! Please login.');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setToast(res.data?.message || res.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-surface border border-line">
                <h2 className="text-2xl font-bold mb-6 text-paper text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-paper/70 mb-1">Name</label>
                        <input type="text" required
                            className="w-full p-2 rounded bg-void border border-line text-paper"
                            value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm text-paper/70 mb-1">Email</label>
                        <input type="email" required
                            className="w-full p-2 rounded bg-void border border-line text-paper"
                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm text-paper/70 mb-1">Password</label>
                        <input type="password" required
                            className="w-full p-2 rounded bg-void border border-line text-paper"
                            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm text-paper/70 mb-1">Organization (Optional)</label>
                        <input type="text"
                            className="w-full p-2 rounded bg-void border border-line text-paper"
                            value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm text-paper/70 mb-1">Role</label>
                        <select
                            className="w-full p-2 rounded bg-void border border-line text-paper"
                            value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                            <option value="USER">User (Standard)</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="RESEARCHER">Researcher</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                    </div>
                    <button type="submit"
                        className="w-full bg-amber text-void font-bold py-2 rounded hover:bg-amber-soft transition">
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-paper/60">
                    Already have an account? <Link to="/login" className="text-amber hover:underline">Login here</Link>
                </div>
            </div>
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
