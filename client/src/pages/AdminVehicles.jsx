import React, { useEffect, useState } from 'react';
import { Car, Plus, Pencil, Trash2, CheckCircle2, XCircle, Info, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        serviceType: 'ONE_WAY',
        ratePerKm: '',
        baseFare: '',
        status: 'ACTIVE',
        info: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await api.get('/vehicles');
            setVehicles(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch vehicles');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setFormData({
            name: vehicle.name,
            serviceType: vehicle.serviceType,
            ratePerKm: vehicle.ratePerKm,
            baseFare: vehicle.baseFare,
            status: vehicle.status,
            info: vehicle.info || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            await api.delete(`/vehicles/${id}`);
            toast.success('Vehicle deleted');
            fetchVehicles();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                ratePerKm: parseFloat(formData.ratePerKm),
                baseFare: parseFloat(formData.baseFare)
            };

            if (currentVehicle) {
                await api.put(`/vehicles/${currentVehicle.id}`, data);
                toast.success('Vehicle updated');
            } else {
                await api.post('/vehicles', data);
                toast.success('Vehicle added');
            }
            setIsModalOpen(false);
            setCurrentVehicle(null);
            setFormData({ name: '', serviceType: 'ONE_WAY', ratePerKm: '', baseFare: '', status: 'ACTIVE', info: '' });
            fetchVehicles();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    return (
        <div className="container py-10 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Car className="text-primary" /> Vehicle <span className="text-slate-400 font-medium">Management</span>
                    </h2>
                    <p className="text-slate-500">Add and manage vehicles, rates, and availability status.</p>
                </div>
                <button
                    onClick={() => { setCurrentVehicle(null); setIsModalOpen(true); }}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> Add Vehicle
                </button>
            </header>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((v) => (
                        <div key={v.id} className="card p-6 flex flex-col justify-between group hover:border-primary/30">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold">{v.name}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{v.serviceType.replace('_', ' ')}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${v.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {v.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400">RATE/KM</p>
                                        <p className="font-bold">₹{v.ratePerKm}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400">BASE FARE</p>
                                        <p className="font-bold">₹{v.baseFare}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-6">
                                <button
                                    onClick={() => handleEdit(v)}
                                    className="flex-1 bg-slate-100 hover:bg-primary hover:text-white p-3 rounded-xl transition-all flex items-center justify-center gap-2 text-slate-600 font-bold"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="p-3 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade">
                    <div className="card max-w-lg w-full p-8 rounded-[32px] shadow-2xl space-y-6 relative">
                        <h3 className="text-2xl font-bold">{currentVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1">
                                    <label className="text-xs font-bold text-slate-400">Vehicle Name</label>
                                    <input required type="text" className="w-full bg-slate-50 p-3 rounded-xl border" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400">Service Type</label>
                                    <select className="w-full bg-slate-50 p-3 rounded-xl border appearance-none" value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}>
                                        <option value="ONE_WAY">One Way</option>
                                        <option value="ROUND_TRIP">Round Trip</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400">Status</label>
                                    <select className="w-full bg-slate-50 p-3 rounded-xl border appearance-none" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400">Rate per KM</label>
                                    <input required type="number" step="0.1" className="w-full bg-slate-50 p-3 rounded-xl border" value={formData.ratePerKm} onChange={(e) => setFormData({ ...formData, ratePerKm: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400">Base Fare (Driver Bata)</label>
                                    <input required type="number" className="w-full bg-slate-50 p-3 rounded-xl border" value={formData.baseFare} onChange={(e) => setFormData({ ...formData, baseFare: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 p-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                                <button type="submit" className="flex-2 bg-primary text-white px-8 p-4 rounded-xl font-bold shadow-lg shadow-primary/20">Save Vehicle</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVehicles;
