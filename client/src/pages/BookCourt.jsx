import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, ArrowRight, User, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --------------------------------------------------------------------------------
// RENDER URL: Using a constant for the deployment URL
// --------------------------------------------------------------------------------
const RENDER_API_URL = "https://court-booking-system-qthg.onrender.com";

const BookCourt = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resources, setResources] = useState({ courts: [], coaches: [], equipment: [] });
  const [price, setPrice] = useState(0);
  
  // Selection State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [startTime, setStartTime] = useState(18);
  const [endTime, setEndTime] = useState(19);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    // FIX: Use the direct Render URL for fetching resources
    axios.get(`/api/resources`).then(res => setResources(res.data));
  }, []);

  // Live Price Calculation
  useEffect(() => {
    if (selectedCourt) {
      // FIX: Use the direct Render URL for price calculation
      axios.post(`/api/calculate`, {
        date, courtId: selectedCourt.id, startTime, endTime, 
        coachId: selectedCoach?.id, equipmentList: selectedEquipment
      }).then(res => setPrice(res.data.price));
    }
  }, [selectedCourt, startTime, endTime, selectedEquipment, selectedCoach]);

  const handleBooking = async () => {
    try {
      // FIX: Use the direct Render URL for booking
      await axios.post(`/api/book`, {
        date, courtId: selectedCourt.id, startTime, endTime,
        coachId: selectedCoach?.id, equipmentList: selectedEquipment, totalPrice: price
      });
      alert("Booking Confirmed! Please refresh My Bookings to view.");
      navigate('/my-bookings');
    } catch (err) {
      alert("Booking Failed: " + (err.response?.data?.error || "Server or Network Error"));
    }
  };

  // Helper to toggle equipment
  const updateEquipment = (item, qty) => {
    let list = [...selectedEquipment];
    const idx = list.findIndex(x => x.id === item.id);
    if(qty > 0) {
      if(idx > -1) list[idx].qty = qty;
      else list.push({ id: item.id, qty });
    } else {
      if(idx > -1) list.splice(idx, 1);
    }
    setSelectedEquipment(list);
  };

  // --- RENDERING STEPS ---

  // STEP 1: Court Selection
  const renderStep1 = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">1. Select Date & Time</h2>
      <div className="flex gap-4 mb-6">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded-lg" />
        <select value={startTime} onChange={e => setStartTime(parseInt(e.target.value))} className="border p-2 rounded-lg">
          {[...Array(24).keys()].map(h => <option key={h} value={h}>{h}:00</option>)}
        </select>
        <span className="self-center">to</span>
        <select value={endTime} onChange={e => setEndTime(parseInt(e.target.value))} className="border p-2 rounded-lg">
          {[...Array(24).keys()].map(h => <option key={h} value={h}>{h}:00</option>)}
        </select>
      </div>

      <h2 className="text-xl font-bold mb-4">2. Choose a Court</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.courts.map(court => (
          <div key={court.id} onClick={() => setSelectedCourt(court)}
            className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all ${selectedCourt?.id === court.id ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200 hover:border-green-300'}`}>
            <img 
              src={court.type === 'INDOOR' 
                ? "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=600" 
                : "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=600"
              } 
              alt="Court" 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{court.name}</h3>
                <span className="bg-gray-100 text-xs px-2 py-1 rounded-full uppercase">{court.type}</span>
              </div>
              <p className="text-green-600 font-bold mt-2">${court.basePrice}/hr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // STEP 2: Add-ons
  const renderStep2 = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Equipment (Optional)</h2>
      <div className="space-y-4">
        {resources.equipment.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg bg-white">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-2 rounded-full text-orange-600"><ShoppingBag size={20}/></div>
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price} / item</p>
              </div>
            </div>
            <input type="number" min="0" className="border p-2 w-16 rounded" placeholder="0" 
              onChange={(e) => updateEquipment(item, parseInt(e.target.value))} 
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold my-4">Add a Coach (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.coaches.map(coach => (
          <div key={coach.id} onClick={() => setSelectedCoach(selectedCoach?.id === coach.id ? null : coach)}
            className={`cursor-pointer p-4 border-2 rounded-xl text-center transition ${selectedCoach?.id === coach.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
               <User size={64} className="text-gray-400 mt-2 mx-auto" />
            </div>
            <h3 className="font-bold">{coach.name}</h3>
            <p className="text-xs text-gray-500">{coach.level}</p>
            <p className="text-green-600 font-bold mt-1">+${coach.price}/hr</p>
          </div>
        ))}
      </div>
    </div>
  );

  // STEP 3: Confirmation
  const renderStep3 = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CheckCircle className="text-green-600" /> Confirm Booking
      </h2>
      
      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span>Court</span>
          <span className="font-bold">{selectedCourt?.name} ({date})</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Time</span>
          <span className="font-bold">{startTime}:00 - {endTime}:00</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Coach</span>
          <span className="font-bold">{selectedCoach ? selectedCoach.name : 'None'}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>Equipment</span>
          <span className="font-bold">{selectedEquipment.length > 0 ? `${selectedEquipment.length} items` : 'None'}</span>
        </div>
        <div className="flex justify-between pt-2 text-xl font-bold text-green-700">
          <span>Total Price</span>
          <span>${price}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Progress Bar */}
      <div className="flex justify-between mb-8 max-w-xl mx-auto">
        {[1, 2, 3].map(i => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= i ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {i}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Summary Card */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="font-bold text-gray-500 uppercase text-xs mb-2">Estimated Total</h3>
            <p className="text-4xl font-bold text-gray-800 mb-6">${price}</p>
            
            {step < 3 ? (
               <button onClick={() => selectedCourt && setStep(step + 1)} disabled={!selectedCourt}
                 className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-gray-900 disabled:bg-gray-300">
                 Next Step <ArrowRight size={18} />
               </button>
            ) : (
               <button onClick={handleBooking}
                 className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 shadow-lg shadow-green-200">
                 Pay & Confirm
               </button>
            )}
            
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="w-full mt-2 text-gray-500 py-2 hover:text-gray-800">
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCourt;