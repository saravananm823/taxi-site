import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.success) {
                login(response.data.token);
                toast.success('Welcome back, Admin!');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center container">
            <div className="card max-w-md w-full p-10 rounded-[40px] shadow-2xl space-y-8 animate-fade border-primary/10">
                <div className="text-center space-y-2">
                    <div className="inline-block bg-primary/10 p-4 rounded-3xl text-primary mb-2">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin <span className="text-primary">Login</span></h2>
                    <p className="text-slate-500 font-medium">Restricted access for authorized personnel only.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <User size={14} /> Username
                        </label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                placeholder="Enter admin username"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 pl-12 rounded-2xl transition-all"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <KeyRound size={14} /> Password
                        </label>
                        <div className="relative">
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 pl-12 rounded-2xl transition-all"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25"
                    >
                        {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>Sign In <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="pt-4 text-center border-t border-slate-100">
                    <p className="text-xs text-slate-400 italic">Trouble signing in? Contact systems administrator.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
