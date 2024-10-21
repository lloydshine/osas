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
import { useState } from "react";
import { departments } from "@/lib/globals";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  createAdmissionWithRequirements,
  updateAdmissionWithRequirements,
} from "@/actions/admission.action";
import { useRouter } from "next/navigation";

const schema = z.object({
  id: z.string().optional(),
  admissionNo: z.string().min(1, "Admission Number required"),
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  course: z.string().min(1, "Course is required"),
  program: z.string().min(1, "Program is required"),
  requirements: z
    .array(
      z.object({
        name: z.string(),
        isSubmitted: z.boolean(),
      })
    )
    .refine(
      (requirements) => requirements.some((req) => req.isSubmitted),
      "You must submit at least one requirement"
    ),
});

export type AdmissionFormData = z.infer<typeof schema>;

interface AdmissionFormProps {
  defaultValues?: z.infer<typeof schema>;
  admissionNo: string;
}

export function AdmissionForm({
  defaultValues,
  admissionNo,
}: AdmissionFormProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(
    defaultValues?.course || null
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AdmissionFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      admissionNo: admissionNo,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      course: "",
      program: "",
      requirements: [
        { name: "Grade 12 Report Card / Form 138", isSubmitted: false },
        { name: "Original Diploma / Graduation proof", isSubmitted: false },
        { name: "Good Moral Certificate", isSubmitted: false },
        { name: "2x2 ID Picture (2 pcs)", isSubmitted: false },
        { name: "PSA Birth Certificate (photocopy)", isSubmitted: false },
      ],
    },
  });

  const handleCourseChange = (value: string) => {
    setSelectedCourse(value);
    form.setValue("program", ""); // Reset program when course changes
  };

  const handleCheck = (index: number, checked: boolean) => {
    const updated = [...form.getValues("requirements")];
    updated[index].isSubmitted = checked;
    form.setValue("requirements", updated);
  };

  const onSubmit = async (values: AdmissionFormData) => {
    try {
      setLoading(true);
      if (values.id) {
        await updateAdmissionWithRequirements(values);
      } else {
        const id = await createAdmissionWithRequirements(values);
        router.push(`/admission/${id}`);
      }
      toast({
        title: "Admission",
        description: defaultValues
          ? "Successfully Saved Admission"
          : "Successfully Submitted Admission",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description:
          "Error in submitting your submission. Please try again later.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const programsForSelectedCourse =
    departments.find((course) => course.name === selectedCourse)?.programs ||
    [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Middle Name */}
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
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
        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Course */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleCourseChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((course) => (
                    <SelectItem key={course.name} value={course.name}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Program */}
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedCourse}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programsForSelectedCourse.length > 0 ? (
                    programsForSelectedCourse.map((program) => (
                      <SelectItem key={program.shortname} value={program.name}>
                        {program.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value={"none"}>
                      No programs available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Requirements</FormLabel>
              <div className="flex flex-col gap-2">
                {field.value.map((requirement, index) => (
                  <FormControl key={index}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={requirement.isSubmitted}
                        onCheckedChange={(checked) =>
                          handleCheck(index, Boolean(checked))
                        }
                      />
                      <span>{requirement.name}</span>
                    </div>
                  </FormControl>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-20" disabled={loading}>
          {defaultValues ? "Save Admission" : "Submit Admission"}
        </Button>
      </form>
    </Form>
  );
}
