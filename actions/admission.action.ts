"use server";

import { AdmissionFormData } from "@/components/forms/AdmissionForm";
import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAdmissionWithRequirements(data: AdmissionFormData) {
  try {
    const admission = await prisma.admission.create({
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
    return admission.id;
  } catch (error) {
    console.error("Error creating admission:", error);
  }
}

export async function updateAdmissionWithRequirements(data: AdmissionFormData) {
  try {
    const admission = await prisma.admission.update({
      where: { id: data.id },
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
          deleteMany: {},
          create: data.requirements,
        },
      },
    });
    console.log("Admission updated");
  } catch (error) {
    console.error("Error updating admission:", error);
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

export async function deleteAdmission(id: string) {
  try {
    await prisma.admission.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function updateAdmissionStatus(id: string, status: Status) {
  try {
    await prisma.admission.update({ where: { id }, data: { status } });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
