import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Info, CheckCircle2, Navigation, IndianRupee, Loader2 } from 'lucide-react';
import api from '../services/api';

const FareEstimation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [distanceData, setDistanceData] = useState({ text: '', value: 0 });
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pickup = searchParams.get('pickup');
    const drop = searchParams.get('drop');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const serviceType = searchParams.get('serviceType');

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                setLoading(true);
                setError(null);

                // Call unified estimation API with route and service type
                const response = await api.post('/bookings/estimate', {
                    pickup,
                    drop,
                    serviceType
                });

                if (response.data.success) {
                    const { distanceKm, vehicles } = response.data.data;
                    setDistanceData({ text: `${distanceKm} km`, value: distanceKm });
                    setVehicles(vehicles);
                }
            } catch (error) {
                console.error('Error fetching estimates:', error);
                const msg = error.response?.data?.message || 'Failed to fetch estimates. Please try again.';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        if (pickup && drop) {
            fetchEstimates();
        }
    }, [pickup, drop, serviceType]);

    const handleSelectVehicle = (vehicle) => {
        const params = new URLSearchParams({
            ...Object.fromEntries(searchParams),
            vehicleId: vehicle.vehicleId,
            vehicleName: vehicle.vehicleName,
            fare: vehicle.totalAmount,
            distanceText: distanceData.text,
            distanceValue: distanceData.value
        }).toString();
        navigate(`/booking-verification?${params}`);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="text-xl font-medium text-slate-500">Calculating your best fares...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="bg-red-50 p-6 rounded-full text-red-500">
                    <Info size={64} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Route Not Found</h2>
                    <p className="text-slate-500 max-w-md mx-auto">{error}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="btn-primary px-8"
                >
                    Change Route
                </button>
            </div>
        );
    }

    return (
        <div className="container py-12 space-y-10">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Navigation className="text-primary" /> Available Vehicles
                    </h2>
                    <p className="text-slate-500 mt-2">
                        {serviceType === 'ONE_WAY' ? 'One Way Trip' : 'Round Trip'} from <span className="font-bold text-slate-800">{pickup}</span> to <span className="font-bold text-slate-800">{drop}</span>
                        {distanceData.text && <span className="ml-2 inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Distance: {distanceData.text}</span>}
                    </p>
                </div>
                <div className="flex gap-2 text-sm">
                    <span className="bg-slate-100 px-4 py-2 rounded-full font-medium">{date}</span>
                    <span className="bg-slate-100 px-4 py-2 rounded-full font-medium">{time}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {vehicles.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                            <p className="text-slate-400">No vehicles available for this service type currently.</p>
                        </div>
                    ) : (
                        vehicles.map((v) => (
                            <div key={v.vehicleId} className="card p-6 flex flex-col md:flex-row gap-8 items-center group">
                                <div className="w-full md:w-48 h-32 bg-slate-100 rounded-2xl overflow-hidden">
                                    <img
                                        src={v.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'}
                                        alt={v.vehicleName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold">{v.vehicleName}</h3>
                                        <div className="flex items-center gap-1 text-primary bg-blue-50 px-3 py-1 rounded-full text-sm font-bold">
                                            <CheckCircle2 size={16} /> Available
                                        </div>
                                    </div>
                                    <p className="text-slate-500 flex items-center gap-2">
                                        <Info size={16} /> Professional & Sanitized
                                    </p>
                                    <div className="flex gap-4 pt-4 border-t mt-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Rate/KM</p>
                                            <p className="font-bold text-slate-700">₹{v.ratePerKm}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Base Fare</p>
                                            <p className="font-bold text-slate-700">₹{v.baseFare}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto text-center md:text-right space-y-4">
                                    <div className="text-3xl font-extrabold text-slate-900">
                                        <span className="text-lg font-bold">₹</span>{v.totalAmount}
                                    </div>
                                    <button
                                        onClick={() => handleSelectVehicle(v)}
                                        className="w-full md:w-auto btn-primary px-8"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <aside className="space-y-6">
                    <div className="card bg-slate-900 text-white p-8 rounded-[32px] sticky top-24">
                        <h4 className="text-xl font-bold mb-6">Inclusions & Policy</h4>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3">
                                <div className="bg-white/10 p-1 rounded-full text-secondary"><CheckCircle2 size={16} /></div>
                                Fuel & Driver Charges included
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-white/10 p-1 rounded-full text-secondary"><CheckCircle2 size={16} /></div>
                                Reliable 24/7 Pickup
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="bg-white/10 p-1 rounded-full text-secondary"><CheckCircle2 size={16} /></div>
                                Doorstep Pickup & Drop
                            </li>
                        </ul>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-slate-400 text-sm">Exclusions:</p>
                            <p className="text-slate-200 text-xs mt-2 italic">Tolls, Parking, and State Taxes are extra as per actual receipts.</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default FareEstimation;
