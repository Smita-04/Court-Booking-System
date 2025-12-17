const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(express.json());

// 1. Get all Resources (Courts, Coaches, Equipment)
app.get('/api/resources', async (req, res) => {
  try {
    const courts = await prisma.court.findMany();
    const coaches = await prisma.coach.findMany();
    const equipment = await prisma.equipment.findMany();
    res.json({ courts, coaches, equipment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Existing Bookings (For availability view)
// 2. Get Existing Bookings (History)
app.get('/api/bookings', async (req, res) => {
  const { date } = req.query;
  
  // If a date is provided, filter by it. Otherwise, get ALL bookings.
  const whereClause = date ? { date: new Date(date) } : {};

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    orderBy: {
      date: 'desc' // Show newest bookings first
    }
  });
  res.json(bookings);
});

// 3. Calculate Price (Dynamic Pricing Engine)
app.post('/api/calculate', async (req, res) => {
  const { courtId, date, startTime, endTime, coachId, equipmentList } = req.body;
  
  try {
    // A. Base Price
    const court = await prisma.court.findUnique({ where: { id: parseInt(courtId) } });
    let price = court.basePrice * (endTime - startTime);

    // B. Apply Rules
    const rules = await prisma.pricingRule.findMany();
    const day = new Date(date).getDay(); // 0 is Sunday
    const isWeekend = day === 0 || day === 6;

    for (let rule of rules) {
      const condition = JSON.parse(rule.condition);
      let apply = false;

      if (condition.isWeekend && isWeekend) apply = true;
      if (condition.startHour && startTime >= condition.startHour && startTime < condition.endHour) apply = true;

      if (apply) {
        if (rule.type === 'MULTIPLIER') price *= rule.value;
        if (rule.type === 'FIXED') price += rule.value;
      }
    }

    // C. Add Coach
    if (coachId) {
      const coach = await prisma.coach.findUnique({ where: { id: parseInt(coachId) } });
      price += (coach.price * (endTime - startTime));
    }

    // D. Add Equipment
    if (equipmentList && equipmentList.length > 0) {
      for (let item of equipmentList) {
         const eq = await prisma.equipment.findUnique({ where: { id: item.id }});
         price += (eq.price * item.qty);
      }
    }

    res.json({ price: Math.round(price) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Create Booking (Atomic Transaction)
app.post('/api/book', async (req, res) => {
  const { courtId, date, startTime, endTime, coachId, equipmentList, totalPrice } = req.body;
  
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Check Availability again inside transaction
      const conflict = await tx.booking.findFirst({
        where: {
          courtId: parseInt(courtId),
          date: new Date(date),
          OR: [
            { startTime: { lt: endTime, gte: startTime } },
            { endTime: { gt: startTime, lte: endTime } }
          ]
        }
      });

      if (conflict) throw new Error("Slot already taken!");

      return await tx.booking.create({
        data: {
          courtId: parseInt(courtId),
          date: new Date(date),
          startTime,
          endTime,
          coachId: coachId ? parseInt(coachId) : null,
          equipments: equipmentList,
          totalPrice
        }
      });
    });
    res.json({ success: true, booking: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const RENDER_PORT = process.env.PORT; 
app.listen(RENDER_PORT, () => console.log(`Server running on port ${RENDER_PORT}`));