import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, spent: 0, hours: 0 });

  useEffect(() => {
    // Fetch ALL bookings to calculate accurate stats
    axios.get('/api/bookings')
      .then(res => {
        const bookings = res.data;
        const total = bookings.length;
        const spent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
        
        // Calculate hours based on start/end time
        const hours = bookings.reduce((sum, b) => sum + (b.endTime - b.startTime), 0);
        
        setStats({ total, spent, hours });
      });
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
      <p className="text-gray-500 mb-8">Manage your bookings and explore available courts.</p>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-4">
               <Calendar size={20} />
            </div>
            <h3 className="font-bold text-lg">Book Courts</h3>
            <p className="text-gray-500 text-sm mt-1">Reserve your preferred court and time slot.</p>
          </div>
          <Link to="/book" className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold text-center hover:bg-green-700 transition">
            Start Booking
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mb-4">
               <Clock size={20} />
            </div>
            <h3 className="font-bold text-lg">View History</h3>
            <p className="text-gray-500 text-sm mt-1">Check your past and upcoming bookings.</p>
          </div>
          <Link to="/my-bookings" className="mt-4 w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold text-center hover:bg-gray-50 transition">
            View Bookings
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
               <h4 className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</h4>
             </div>
             <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded">+12%</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-500 text-sm font-medium">Total Spent</p>
               <h4 className="text-3xl font-bold text-gray-800 mt-2">${stats.spent}</h4>
             </div>
             <DollarSign className="text-gray-300" />
           </div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-500 text-sm font-medium">Hours Played</p>
               <h4 className="text-3xl font-bold text-gray-800 mt-2">{stats.hours}</h4>
             </div>
             <TrendingUp className="text-gray-300" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;