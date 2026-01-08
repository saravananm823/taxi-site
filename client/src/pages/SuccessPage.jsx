import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, Calendar, PhoneCall, ArrowRight, Share2 } from 'lucide-react';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const refId = searchParams.get('refId');

    return (
        <div className="container py-20 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="max-w-xl w-full text-center space-y-10 animate-fade">
                {/* Success Icon */}
                <div className="relative inline-block">
                    <div className="bg-emerald-100 p-8 rounded-full text-emerald-600 animate-bounce">
                        <CheckCircle size={80} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Main Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                        Booking <span className="text-emerald-600">Successfully</span> Confirmed!
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Your taxi is scheduled. We have sent the trip details to your mobile/email.
                    </p>
                </div>

                {/* Ref ID Card */}
                <div className="card bg-white p-8 border-2 border-emerald-100 shadow-xl shadow-emerald-500/5 space-y-4">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Booking Reference ID</p>
                    <div className="text-3xl font-black text-emerald-700 tracking-tighter bg-emerald-50 py-4 rounded-2xl border border-emerald-200">
                        {refId || 'TX-ABC123XYZ'}
                    </div>
                    <p className="text-xs text-slate-400 italic">Please keep this ID for any future communication.</p>
                </div>

                {/* Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl group cursor-default">
                        <div className="text-primary group-hover:scale-110 transition-transform"><Calendar size={32} /></div>
                        <div className="text-left">
                            <p className="font-bold">Trip Scheduled</p>
                            <p className="text-xs text-slate-500">Wait for your driver to arrive.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl group cursor-default">
                        <div className="text-secondary group-hover:scale-110 transition-transform"><PhoneCall size={32} /></div>
                        <div className="text-left">
                            <p className="font-bold">Driver Duty</p>
                            <p className="text-xs text-slate-500">Contact details shared shortly.</p>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="pt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
                    <Link to="/" className="btn-primary flex items-center gap-2 px-10">
                        <Home size={20} /> Back to Home
                    </Link>
                    <button className="flex items-center gap-2 font-bold text-slate-600 hover:text-primary transition-colors">
                        <Share2 size={20} /> Share Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
