// import React, { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Mail, Phone, User, MapPin, Calendar, Clock, Car, MoveRight, ArrowRight, ShieldCheck } from 'lucide-react';
// import { toast } from 'react-hot-toast';
// import api from '../services/api';

// const BookingPage = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const [submitting, setSubmitting] = useState(false);

//     const [customer, setCustomer] = useState({
//         name: '',
//         mobile: '',
//         email: ''
//     });

//     const tripData = Object.fromEntries(searchParams);

//     const handleBooking = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);
//         try {
//             const bookingPayload = {
//                 customerName: customer.name,
//                 customerMobile: customer.mobile,
//                 customerEmail: customer.email,
//                 vehicleId: tripData.vehicleId,
//                 pickupLocation: tripData.pickup,
//                 dropLocation: tripData.drop,
//                 pickupDate: tripData.date,
//                 pickupTime: tripData.time,
//                 serviceType: tripData.serviceType,
//                 fare: parseFloat(tripData.fare)
//             };

//             const response = await api.post('/bookings', bookingPayload);
//             if (response.data.success) {
//                 toast.success('Wait! Booking confirmed!');
//                 navigate(`/success?refId=${response.data.data.bookingReferenceId}`);
//             }
//         } catch (error) {
//             console.error('Booking failed:', error);
//             const msg = error.response?.data?.errors?.[0]?.message || 'Failed to book. Please try again.';
//             toast.error(msg);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="container py-12 max-w-5xl">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//                 {/* Left: Trip Summary */}
//                 <div className="lg:col-span-2 space-y-8">
//                     <h2 className="text-3xl font-bold flex items-center gap-3">
//                         Trip <span className="text-primary">Summary</span>
//                     </h2>

//                     <div className="card bg-slate-900 text-white p-8 rounded-[32px] space-y-8 relative overflow-hidden">
//                         <div className="absolute top-0 right-0 p-8 opacity-10">
//                             <Car size={120} />
//                         </div>

//                         <div className="space-y-6 relative z-10">
//                             <div className="flex items-center gap-4">
//                                 <div className="bg-primary/20 p-3 rounded-2xl text-primary"><MapPin size={24} /></div>
//                                 <div>
//                                     <p className="text-[10px] uppercase font-bold text-slate-400">Route</p>
//                                     <p className="font-bold flex items-center gap-2">
//                                         {tripData.pickup} <MoveRight size={14} /> {tripData.drop}
//                                     </p>
//                                     {tripData.distanceText && (
//                                         <p className="text-xs text-primary font-bold mt-1">Distance: {tripData.distanceText}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="flex items-center gap-4 text-slate-200">
//                                     <Calendar size={18} /> <span className="text-sm">{tripData.date}</span>
//                                 </div>
//                                 <div className="flex items-center gap-4 text-slate-200">
//                                     <Clock size={18} /> <span className="text-sm">{tripData.time}</span>
//                                 </div>
//                             </div>

//                             <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
//                                 <p className="text-xs font-bold text-slate-400 uppercase">Selected Vehicle</p>
//                                 <div className="flex items-center justify-between font-bold">
//                                     <span>{tripData.vehicleName}</span>
//                                     <span className="text-primary">₹{tripData.fare}</span>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-2 text-secondary text-sm font-bold bg-emerald-500/10 p-3 rounded-xl">
//                                 <ShieldCheck size={18} /> No hidden charges included
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right: Customer Details Form */}
//                 <div className="lg:col-span-3 card p-10 rounded-[40px] shadow-2xl space-y-8">
//                     <div className="space-y-2">
//                         <h3 className="text-2xl font-bold">Complete Your Booking</h3>
//                         <p className="text-slate-500">Provide your contact details so we can coordinate your pickup.</p>
//                     </div>

//                     <form onSubmit={handleBooking} className="space-y-6">
//                         <div className="space-y-2">
//                             <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
//                                 <User size={16} /> Full Name <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 required
//                                 type="text"
//                                 placeholder="e.g. John Doe"
//                                 className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
//                                 value={customer.name}
//                                 onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
//                                 <Phone size={16} /> Mobile Number <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 required
//                                 type="tel"
//                                 placeholder="Your mobile number"
//                                 className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
//                                 value={customer.mobile}
//                                 onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
//                             />
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
//                                 <Mail size={16} /> Email Address (Optional)
//                             </label>
//                             <input
//                                 type="email"
//                                 placeholder="john@example.com"
//                                 className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl transition-all"
//                                 value={customer.email}
//                                 onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
//                             />
//                         </div>

//                         <div className="pt-6">
//                             <button
//                                 disabled={submitting}
//                                 type="submit"
//                                 className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white p-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/25"
//                             >
//                                 {submitting ? <Loader2 className="animate-spin" /> : <>Confirm Booking <ArrowRight /></>}
//                             </button>
//                             <p className="text-center text-xs text-slate-400 mt-4">
//                                 By clicking confirm, you agree to our terms of service and privacy policy.
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Loader2 = ({ className }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;

// export default BookingPage;



import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Mail,
    Phone,
    User,
    MapPin,
    Calendar,
    Clock,
    Car,
    MoveRight,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const BookingPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [customer, setCustomer] = useState({
        name: '',
        mobile: '',
        email: ''
    });

    const tripData = Object.fromEntries(searchParams);

    const handleBooking = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const bookingPayload = {
                customerName: customer.name,
                customerMobile: customer.mobile,
                customerEmail: customer.email,
                vehicleId: tripData.vehicleId,
                pickupLocation: tripData.pickup,
                dropLocation: tripData.drop,
                pickupDate: tripData.date,
                pickupTime: tripData.time,
                serviceType: tripData.serviceType,
                fare: parseFloat(tripData.fare)
            };

            const response = await api.post('/bookings', bookingPayload);

            if (response.data.success) {
                toast.success('Wait! Booking confirmed!');
                navigate(`/success?refId=${response.data.data.bookingReferenceId}`);
            }
        } catch (error) {
            console.error('Booking failed:', error);
            const msg =
                error.response?.data?.errors?.[0]?.message ||
                'Failed to book. Please try again.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container py-12 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* LEFT – TRIP SUMMARY */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        Trip <span className="text-primary">Summary</span>
                    </h2>

                    <div className="card bg-slate-900 text-white p-8 rounded-[32px] space-y-8 relative overflow-hidden">

                        {/* 🚗 CAR ICON – MOVED TO BOTTOM */}
                        <div className="absolute -bottom-6 right-0 p-8 opacity-10">
                            <Car size={120} />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">
                                        Route
                                    </p>
                                    <p className="font-bold flex items-center gap-2">
                                        {tripData.pickup}
                                        <MoveRight size={14} />
                                        {tripData.drop}
                                    </p>

                                    {tripData.distanceText && (
                                        <p className="text-xs text-primary font-bold mt-1">
                                            Distance: {tripData.distanceText}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 text-slate-200">
                                    <Calendar size={18} />
                                    <span className="text-sm">{tripData.date}</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-200">
                                    <Clock size={18} />
                                    <span className="text-sm">{tripData.time}</span>
                                </div>
                            </div>

                            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                                <p className="text-xs font-bold text-slate-400 uppercase">
                                    Selected Vehicle
                                </p>
                                <div className="flex items-center justify-between font-bold">
                                    <span>{tripData.vehicleName}</span>
                                    <span className="text-primary">
                                        ₹{tripData.fare}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-secondary text-sm font-bold bg-emerald-500/10 p-3 rounded-xl">
                                <ShieldCheck size={18} />
                                No hidden charges included
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT – CUSTOMER FORM */}
                <div className="lg:col-span-3 card p-10 rounded-[40px] shadow-2xl space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Complete Your Booking</h3>
                        <p className="text-slate-500">
                            Provide your contact details so we can coordinate your pickup.
                        </p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                                <User size={16} /> Full Name
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. John Doe"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl"
                                value={customer.name}
                                onChange={(e) =>
                                    setCustomer({ ...customer, name: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                                <Phone size={16} /> Mobile Number
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="tel"
                                placeholder="Your mobile number"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl"
                                value={customer.mobile}
                                onChange={(e) =>
                                    setCustomer({ ...customer, mobile: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 flex items-center gap-2">
                                <Mail size={16} /> Email Address (Optional)
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary p-4 rounded-2xl"
                                value={customer.email}
                                onChange={(e) =>
                                    setCustomer({ ...customer, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-hover disabled:bg-slate-400 text-white p-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3"
                            >
                                {submitting ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Confirm Booking <ArrowRight />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-400 mt-4">
                                By clicking confirm, you agree to our terms of service and privacy policy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Loader2 = ({ className }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default BookingPage;
