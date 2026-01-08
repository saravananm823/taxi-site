import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight, Shield, Clock4, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

const LandingPage = () => {
    const navigate = useNavigate();
    const [serviceType, setServiceType] = useState('ONE_WAY');
    const [search, setSearch] = useState({
        pickup: '',
        drop: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to fare estimation with search params
        const params = new URLSearchParams({
            ...search,
            serviceType
        }).toString();
        navigate(`/fare-estimation?${params}`);
    };

    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="container relative z-20">
                    <div className="max-w-2xl text-white space-y-6 animate-fade">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Reliable Rides for Your <span className="text-primary italic">Every Journey.</span>
                        </h1>
                        <p className="text-lg text-slate-200">
                            Book one-way or round-trip taxis at the best rates. Simple, fast, and transparent pricing for all your travel needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Form Card */}
            <section className="container -mt-32 relative z-30">
                <div className="card glass p-8 shadow-2xl rounded-[32px] border-white/20">
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setServiceType('ONE_WAY')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${serviceType === 'ONE_WAY' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            One Way
                        </button>
                        <button
                            onClick={() => setServiceType('ROUND_TRIP')}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${serviceType === 'ROUND_TRIP' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            Round Trip
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                <MapPin size={16} /> Pickup Location
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Enter City"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
                                value={search.pickup}
                                onChange={(e) => setSearch({ ...search, pickup: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                <MapPin size={16} /> Drop Location
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Enter Destination"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
                                value={search.drop}
                                onChange={(e) => setSearch({ ...search, drop: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Calendar size={16} /> Pickup Date
                            </label>
                            <input
                                required
                                type="date"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
                                value={search.date}
                                onChange={(e) => setSearch({ ...search, date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                <Clock size={16} /> Pickup Time
                            </label>
                            <input
                                required
                                type="time"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
                                value={search.time}
                                onChange={(e) => setSearch({ ...search, time: e.target.value })}
                            />
                        </div>

                        <div className="lg:col-span-4 mt-4">
                            <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white p-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25">
                                Search Best Fares <ArrowRight />
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Features */}
            <section className="container grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                        <Shield size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Verified Drivers</h3>
                    <p className="text-slate-500">All our pilots are strictly background checked for your safety.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-secondary">
                        <Clock4 size={32} />
                    </div>
                    <h3 className="text-xl font-bold">24/7 Support</h3>
                    <p className="text-slate-500">Dedicated assistance team available anytime for your support.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <CreditCard size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Transparent Pricing</h3>
                    <p className="text-slate-500">No hidden costs. See your fare upfront before you book.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
