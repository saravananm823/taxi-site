import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Car, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <nav className="glass sticky top-0 z-50">
            <div className="container py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <Car className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Taxi<span className="text-primary">Booking</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {!isAdmin ? (
                        <>
                            <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
                            <Link to="/#services" className="font-medium hover:text-primary transition-colors">Services</Link>
                            <Link to="/#about" className="font-medium hover:text-primary transition-colors">About</Link>
                            <Link to="/admin/login" className="btn-primary flex items-center gap-2">
                                <User size={18} /> Admin Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin/dashboard" className="font-medium hover:text-primary transition-colors">Dashboard</Link>
                            <Link to="/admin/vehicles" className="font-medium hover:text-primary transition-colors">Vehicles</Link>
                            <Link to="/admin/bookings" className="font-medium hover:text-primary transition-colors">Bookings</Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-semibold hover:opacity-80">
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b animate-fade p-4 space-y-4 shadow-lg">
                    {!isAdmin ? (
                        <>
                            <Link to="/" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/#services" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Services</Link>
                            <Link to="/admin/login" className="block py-2 text-primary font-bold" onClick={() => setIsOpen(false)}>Admin Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/admin/dashboard" className="block py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link to="/admin/vehicles" className="block py-2" onClick={() => setIsOpen(false)}>Vehicles</Link>
                            <Link to="/admin/bookings" className="block py-2" onClick={() => setIsOpen(false)}>Bookings</Link>
                            <button onClick={handleLogout} className="w-full text-left py-2 text-red-500 font-bold">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
