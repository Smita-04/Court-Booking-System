import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, BadgeCheck } from 'lucide-react';

const RENDER_API_URL = "https://court-booking-system-qthg.onrender.com"; // Your live API

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Definitive Fix: Hardcoded URL
    axios.get(`${RENDER_API_URL}/api/bookings`)
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error("Error fetching booking history:", err);
        // Show an error if the server is unreachable
        setBookings([{ 
          id: -1, 
          errorMessage: "Could not load history. The API server is currently unreachable." 
        }]);
      });
  }, []);

  const validBookings = bookings.filter(b => b.id !== -1);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>
      
      <div className="space-y-4">
        {validBookings.length === 0 && bookings.length > 0 && bookings[0].errorMessage ? (
            <p className="bg-red-100 p-4 rounded text-red-700 font-medium">{bookings[0].errorMessage}</p>
        ) : validBookings.length === 0 ? (
             <p className="text-gray-500">No bookings found.</p>
        ) : null}

        {validBookings.map(booking => (
          <div key={booking.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex gap-4 items-center">
              <div className="bg-green-100 p-3 rounded-lg text-green-700">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Court Booking #{booking.id}</h3>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Clock size={14}/> {booking.startTime}:00 - {booking.endTime}:00</span>
                  <span className="flex items-center gap-1"><MapPin size={14}/> Court {booking.courtId}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-bold text-lg">${booking.totalPrice}</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <BadgeCheck size={12} /> Confirmed
                </span>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                View Receipt
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;