import { prisma } from "./lib/prisma";
import type { Appointment, Prisma } from "../generated/prisma/client";

export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no_show";

type AppointmentFull = Prisma.AppointmentGetPayload<{
  include: { Patient: true; Doctor: true };
}>;

type AppointmentWithPatient = Prisma.AppointmentGetPayload<{
  include: { Patient: true };
}>;

export async function bookAppointment(
  patientId: number,
  doctorId: number,
  appointmentAt: Date,
  notes?: string
): Promise<AppointmentFull> {
  return prisma.appointment.create({
    data: {
      appointmentAt,
      notes: notes ?? null,
      Patient: { connect: { id: patientId } },
      Doctor: { connect: { id: doctorId } },
    },
    include: { Patient: true, Doctor: true },
  });
}

export async function getAppointmentFull(id: number): Promise<AppointmentFull | null> {
  return prisma.appointment.findUnique({
    where: { id },
    include: { Patient: true, Doctor: true },
  });
}

export async function getDoctorUpcomingAppointments(
  doctorId: number
): Promise<AppointmentWithPatient[]> {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      status: "scheduled",
      appointmentAt: { gte: new Date() },
    },
    include: { Patient: true },
    orderBy: { appointmentAt: "asc" },
  });
}

export async function setAppointmentStatus(
  id: number,
  status: AppointmentStatus
): Promise<Appointment> {
  return prisma.appointment.update({ where: { id }, data: { status } });
}

export async function cancelAllPatientAppointments(
  patientId: number
): Promise<Prisma.BatchPayload> {
  return prisma.appointment.updateMany({
    where: { patientId, status: "scheduled" },
    data: { status: "cancelled" },
  });
}

export async function deleteAppointment(id: number): Promise<Appointment> {
  return prisma.appointment.delete({ where: { id } });
}