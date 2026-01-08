import React, { useEffect, useState } from 'react';
import { CalendarCheck, Search, Filter, Mail, Phone, MapPin, Clock, Calendar, ArrowUpRight, Loader2, MoreVertical } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/bookings');
            setBookings(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/bookings/${id}/status`, { status });
            toast.success(`Booking ${status.toLowerCase()}`);
            fetchBookings();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const filteredBookings = bookings.filter(b =>
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bookingReferenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerMobile.includes(searchTerm)
    );

    return (
        <div className="container py-10 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <CalendarCheck className="text-primary" /> Booking <span className="text-slate-400 font-medium">Dashboard</span>
                    </h2>
                    <p className="text-slate-500">Track and manage all customer trip enquiries.</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border w-full md:w-96">
                    <Search className="text-slate-400 ml-2" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Name, ID or Mobile..."
                        className="w-full p-2 outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : (
                <div className="card overflow-hidden border-none shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <th className="px-6 py-5">Customer Details</th>
                                    <th className="px-6 py-5">Trip Information</th>
                                    <th className="px-6 py-5">Fare & Vehicle</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center text-slate-400 italic">No bookings found matching your search.</td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((b) => (
                                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-6 space-y-1">
                                                <p className="font-bold text-slate-900">{b.customerName}</p>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-slate-500 flex items-center gap-1.5"><Phone size={12} /> {b.customerMobile}</span>
                                                    {b.customerEmail && <span className="text-xs text-slate-500 flex items-center gap-1.5"><Mail size={12} /> {b.customerEmail}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-semibold">
                                                    <span className="text-primary">{b.pickupLocation}</span>
                                                    <ArrowUpRight size={14} className="text-slate-400" />
                                                    <span className="text-secondary">{b.dropLocation}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                                    <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1"><Calendar size={10} /> {b.pickupDate}</span>
                                                    <span className="bg-slate-100 px-2 py-1 rounded flex items-center gap-1"><Clock size={10} /> {b.pickupTime}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 space-y-1">
                                                <p className="font-bold text-slate-900">₹{b.fare}</p>
                                                <p className="text-xs text-slate-500">{b.Vehicle?.name || 'Standard'}</p>
                                                <p className="text-[10px] items-center gap-1 inline-flex bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest">{b.serviceType.replace('_', ' ')}</p>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                                                        b.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                            b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex gap-2">
                                                    <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors border border-transparent hover:border-emerald-100" title="Confirm">
                                                        <CalendarCheck size={18} />
                                                    </button>
                                                    <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Cancel">
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const XCircle = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;

export default AdminBookings;
