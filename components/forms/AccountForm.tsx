"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { createAccount, updateAccount } from "@/actions/account.action"; // Import both create and update actions

// Define validation schema using Zod
export const userFormSchema = z.object({
  id: z.string().optional(), // id is optional for creating a new account
  email: z.string().min(2, "Email is required").max(50, "Email is too long"),
  role: z.string().min(2, "Role is required"),
  office: z.string().min(2, "Office is required"),
});

interface AccountFormProps {
  defaultValues?: z.infer<typeof userFormSchema>; // For editing, pass in default values
  office: string;
}

export function AccountForm({ defaultValues, office }: AccountFormProps) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      email: "",
      role: "",
      office: office,
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      if (values.id) {
        // If an ID exists, update the account
        await updateAccount(
          values.id,
          values.email,
          values.role,
          values.office
        );
      } else {
        // Otherwise, create a new account
        await createAccount(values.email, values.role, values.office);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Office Field */}
        <FormField
          control={form.control}
          name="office"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select office" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OSAS">OSAS</SelectItem>
                  <SelectItem value="GUIDANCE">GUIDANCE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="ASSISTANT">ASSISTANT</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {defaultValues?.id ? "Update Account" : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
