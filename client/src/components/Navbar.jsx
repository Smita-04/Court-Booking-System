import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarPlus, History, UserCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600";
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-green-600 text-white p-1.5 rounded-lg">
          <LayoutDashboard size={20} />
        </div>
        <span className="text-xl font-bold text-gray-800">CourtBooker<span className="text-green-600">Pro</span></span>
      </div>

      <div className="flex gap-6">
        <Link to="/" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/')}`}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/book" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/book')}`}>
          <CalendarPlus size={18} /> Book Courts
        </Link>
        <Link to="/my-bookings" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/my-bookings')}`}>
          <History size={18} /> My Bookings
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button className="text-gray-500 hover:text-gray-700">
           <UserCircle size={24} />
        </button>
        <div className="text-sm text-right hidden md:block">
           <div className="font-bold text-gray-700">Mob</div>
           <div className="text-xs text-gray-500">mob@sushi.com</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;