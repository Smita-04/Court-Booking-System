const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding data...");

  await prisma.court.createMany({
    data: [
      { name: "Court 1 (Indoor)", type: "INDOOR", basePrice: 150 },
      { name: "Court 2 (Indoor)", type: "INDOOR", basePrice: 150 },
      { name: "Court 3 (Outdoor)", type: "OUTDOOR", basePrice: 100 },
      { name: "Court 4 (Outdoor)", type: "OUTDOOR", basePrice: 100 },
    ]
  });

  await prisma.coach.createMany({
    data: [
      { name: "John Doe", level: "Expert", price: 100 },
      { name: "Jane Smith", level: "Pro", price: 120 },
      { name: "Mike Ross", level: "Beginner", price: 80 },
    ]
  });

  await prisma.equipment.createMany({
    data: [
      { name: "Badminton Racket", price: 50, stock: 10 },
      { name: "Shoes", price: 30, stock: 20 },
    ]
  });

  await prisma.pricingRule.createMany({
    data: [
      { name: "Weekend Surge", type: "MULTIPLIER", value: 1.2, condition: '{"isWeekend": true}' },
      { name: "Peak Hours (6-9 PM)", type: "MULTIPLIER", value: 1.1, condition: '{"startHour": 18, "endHour": 21}' },
    ]
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });