import { prisma } from "./lib/prisma";
import type { Doctor, Prisma } from "../generated/prisma/client";

export async function createDoctor(data: Prisma.DoctorCreateInput): Promise<Doctor> {
  return prisma.doctor.create({ data });
}

export async function getDoctor(id: number): Promise<Doctor | null> {
  return prisma.doctor.findUnique({ where: { id } });
}

export async function listDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
  return prisma.doctor.findMany({
    where: { specialty },
    orderBy: { fullName: "asc" },
  });
}

export async function deleteDoctor(id: number): Promise<Doctor> {
  return prisma.doctor.delete({ where: { id } });
}