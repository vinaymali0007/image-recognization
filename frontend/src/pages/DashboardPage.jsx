import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="mx-auto max-w-4xl px-6 py-14">
            <h1 className="mb-8 font-display text-4xl font-semibold text-paper">Welcome, {user?.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg border border-line bg-surface hover:border-amber transition">
                    <h2 className="text-xl font-bold text-paper mb-2">New Prediction</h2>
                    <p className="text-paper/60 mb-4">Upload an MRI scan and let our AI model detect potential tumors.</p>
                    <Link to="/predict" className="inline-block bg-amber text-void font-bold py-2 px-4 rounded hover:bg-amber-soft">
                        Upload Scan
                    </Link>
                </div>
                
                <div className="p-6 rounded-lg border border-line bg-surface hover:border-amber transition">
                    <h2 className="text-xl font-bold text-paper mb-2">History & Reports</h2>
                    <p className="text-paper/60 mb-4">View your past predictions and download detailed PDF reports.</p>
                    <Link to="/history" className="inline-block border border-amber text-amber font-bold py-2 px-4 rounded hover:bg-amber/10">
                        View History
                    </Link>
                </div>
            </div>
            
            {user?.role === 'ADMIN' && (
                <div className="mt-8 p-6 rounded-lg border border-line bg-surface">
                    <h2 className="text-xl font-bold text-alert mb-2">Admin Panel</h2>
                    <p className="text-paper/60 mb-4">You have administrative privileges. Access the admin dashboard to manage users.</p>
                    <Link to="/admin" className="inline-block bg-alert text-void font-bold py-2 px-4 rounded opacity-80 hover:opacity-100">
                        Manage System
                    </Link>
                </div>
            )}
        </div>
    );
}
