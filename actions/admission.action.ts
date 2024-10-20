"use server";

import { AdmissionFormData } from "@/components/forms/AdmissionForm";
import prisma from "@/lib/db";

export async function createAdmissionWithRequirements(data: AdmissionFormData) {
  try {
    await prisma.admission.create({
      data: {
        admissionNo: data.admissionNo,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        course: data.course,
        program: data.program,
        requirements: {
          create: data.requirements,
        },
      },
    });
    console.log("Admission created");
  } catch (error) {
    console.error("Error creating admission:", error);
  }
}

export async function getAdmissionById(id: string) {
  try {
    return await prisma.admission.findUnique({
      where: { id },
      include: {
        requirements: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAdmissionByNumber(number: string) {
  try {
    return await prisma.admission.findMany({
      where: { admissionNo: number },
      include: {
        requirements: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
