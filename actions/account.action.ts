"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// Create a new account
export const createAccount = async (
  email: string,
  role: string,
  office: string
) => {
  try {
    await prisma.account.create({
      data: {
        email,
        role,
        office,
      },
    });
    revalidatePath(`/${office.toLowerCase()}`);
  } catch (error) {
    throw new Error("Failed Creating Account");
  }
};

// Get an account by email
export const getAccountByEmail = async (email: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        email,
      },
    });
    return account;
  } catch (error) {
    throw new Error("Failed Fetching Account");
  }
};

// Get an account by ID
export const getAccountById = async (id: string) => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id,
      },
    });
    return account;
  } catch (error) {
    throw new Error("Failed Fetching Account by ID");
  }
};

// Update an account
export const updateAccount = async (
  id: string,
  email?: string,
  role?: string,
  office?: string
) => {
  try {
    await prisma.account.update({
      where: { id },
      data: {
        email,
        role,
        office,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed Updating Account");
  }
};

// Delete an account
export const deleteAccount = async (id: string) => {
  try {
    await prisma.account.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed Deleting Account");
  }
};
