import { prisma } from "./lib/prisma";
import type { Patient, Prisma } from "../generated/prisma/client";

export async function createPatient(data: Prisma.PatientCreateInput): Promise<Patient> {
  return prisma.patient.create({ data });
}

export async function getPatient(id: number): Promise<Patient | null> {
  return prisma.patient.findUnique({ where: { id } });
}

export async function searchPatients(term: string): Promise<Patient[]> {
  return prisma.patient.findMany({
    where: {
      OR: [
        { firstName: { contains: term, mode: "insensitive" } },
        { lastName: { contains: term, mode: "insensitive" } },
      ],
    },
    orderBy: { lastName: "asc" },
  });
}

export async function updatePatientPhone(id: number, phone: string): Promise<Patient> {
  return prisma.patient.update({ where: { id }, data: { phone } });
}

export async function deletePatient(id: number): Promise<Patient> {
  return prisma.patient.delete({ where: { id } });
}