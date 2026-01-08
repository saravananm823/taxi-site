import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Car, CalendarCheck, Users, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalEnquiries: 0,
        todayEnquiries: 0,
        activeVehiclesCount: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/stats');
                setStats(response.data.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Today's Enquiries", value: stats.todayEnquiries, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Bookings", value: stats.totalEnquiries, icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Active Vehicles", value: stats.activeVehiclesCount, icon: Car, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Total Revenue", value: `₹ ${stats.totalRevenue || 0}`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" }
    ];

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent animate-spin rounded-full" />
                <p className="text-xl font-medium text-slate-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="container py-10 space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <LayoutDashboard className="text-primary" /> Dashboard <span className="text-slate-400 font-medium">Overview</span>
                    </h2>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/admin/vehicles" className="btn-primary flex items-center gap-2">
                        <Car size={18} /> Manage Vehicles
                    </Link>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="card p-6 border-none shadow-lg hover:translate-y-[-4px] transition-all">
                        <div className="flex items-start justify-between">
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                <ArrowUpRight size={14} /> +12%
                            </span>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</h3>
                            <div className="text-4xl font-extrabold mt-1">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Bookings Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Recent Enquiries</h3>
                        <Link to="/admin/bookings" className="text-primary font-bold text-sm hover:underline">View All</Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b">
                                    <th className="pb-4">Customer</th>
                                    <th className="pb-4">Route</th>
                                    <th className="pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="group">
                                    <td className="py-4">
                                        <p className="font-bold">Latest Entry</p>
                                        <p className="text-xs text-slate-500">Checking data...</p>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-sm">Click 'View All' to see bookings</span>
                                    </td>
                                    <td className="py-4">
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card glass p-8 gradient-bg text-white rounded-[32px] space-y-4">
                        <h3 className="text-xl font-bold">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span>API Server</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Online</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span>Database</span>
                                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Connected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
