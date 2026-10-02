import { prisma } from "./lib/prisma";

async function main(): Promise<void> {
  // Clear old data so the seed can be run again safely
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  // Doctors
  const drMehta = await prisma.doctor.create({
    data: { fullName: "Dr. Anil Mehta", specialty: "Cardiology", email: "anil.mehta@hospital.com" },
  });
  const drRao = await prisma.doctor.create({
    data: { fullName: "Dr. Kavya Rao", specialty: "Dermatology", email: "kavya.rao@hospital.com" },
  });
  await prisma.doctor.create({
    data: { fullName: "Dr. Suresh Iyer", specialty: "Cardiology", email: "suresh.iyer@hospital.com" },
  });

  // Patients
  const ravi = await prisma.patient.create({
    data: { firstName: "Ravi", lastName: "Kumar", dateOfBirth: new Date("1990-05-14"), phone: "9876500001", email: "ravi@example.com" },
  });
  const priya = await prisma.patient.create({
    data: { firstName: "Priya", lastName: "Sharma", dateOfBirth: new Date("1985-11-02"), phone: "9876500002", email: "priya@example.com" },
  });
  const meena = await prisma.patient.create({
    data: { firstName: "Meena", lastName: "Das", dateOfBirth: new Date("1998-02-20"), phone: "9876500003" },
  });

  // Appointments
  await prisma.appointment.createMany({
    data: [
      { patientId: ravi.id, doctorId: drMehta.id, appointmentAt: new Date("2026-11-10T10:00:00"), notes: "Chest pain follow-up" },
      { patientId: priya.id, doctorId: drMehta.id, appointmentAt: new Date("2026-11-12T11:30:00") },
      { patientId: meena.id, doctorId: drRao.id, appointmentAt: new Date("2026-11-15T09:00:00"), notes: "Skin rash" },
      { patientId: ravi.id, doctorId: drRao.id, appointmentAt: new Date("2026-09-01T14:00:00"), status: "completed" },
    ],
  });

  console.log("Seed complete:");
  console.log("Doctors:", await prisma.doctor.count());
  console.log("Patients:", await prisma.patient.count());
  console.log("Appointments:", await prisma.appointment.count());
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });