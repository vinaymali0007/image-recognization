import React, { useEffect, useState } from 'react';
import { getHistory, downloadReport } from '../services/api';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        getHistory().then(res => {
            if (res.ok) setHistory(res.data.history);
            setLoading(false);
        });
    }, []);

    const handleDownload = async (id) => {
        const res = await downloadReport(id);
        if (!res.ok) {
            setToast(res.data?.error || 'Failed to download report');
        }
    };

    if (loading) return <div className="p-10 text-center text-paper">Loading history...</div>;

    return (
        <div className="mx-auto max-w-4xl px-6 py-14">
            <h1 className="mb-8 font-display text-3xl font-semibold text-paper">Prediction History</h1>
            {history.length === 0 ? (
                <div className="text-paper/50">No predictions found. <Link to="/predict" className="text-amber underline">Make one now.</Link></div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    <table className="w-full text-left text-sm text-paper">
                        <thead className="bg-void text-paper/70 font-mono text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Prediction</th>
                                <th className="px-4 py-3">Confidence</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line/60">
                            {history.map(item => (
                                <tr key={item.id} className="hover:bg-void/50 transition">
                                    <td className="px-4 py-3">{new Date(item.created_at).toLocaleString()}</td>
                                    <td className={`px-4 py-3 font-medium ${item.prediction === 'No Tumor' ? 'text-clear' : 'text-alert'}`}>
                                        {item.prediction}
                                    </td>
                                    <td className="px-4 py-3">{item.confidence.toFixed(2)}%</td>
                                    <td className="px-4 py-3 text-right">
                                        <button onClick={() => handleDownload(item.id)} className="text-amber hover:underline mr-3">
                                            PDF Report
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
