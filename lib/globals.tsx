import { Requirement, Status } from "@prisma/client";
import {
  PieChartIcon,
  BookIcon,
  CalendarCheck,
  BaggageClaimIcon,
  HardHatIcon,
  Users2Icon,
} from "lucide-react"; // Ensure you import all icons

export const osasLinks = [
  { tag: "Dashboard", href: "/osas", icon: <PieChartIcon /> },
  { tag: "Admission", href: "/osas/admission", icon: <BookIcon /> },
  { tag: "Events", href: "/osas/events", icon: <CalendarCheck /> },
  { tag: "Equipments", href: "/osas/equipments", icon: <BaggageClaimIcon /> },
  { tag: "Career", href: "/osas/career", icon: <HardHatIcon /> },
  { tag: "Certificates", href: "/osas/certificates", icon: <BookIcon /> },
];

export const guidanceLinks = [
  { tag: "Dashboard", href: "/guidance", icon: <PieChartIcon /> },
  { tag: "Admission", href: "/guidance/admission", icon: <BookIcon /> },
  { tag: "Students", href: "/guidance/students", icon: <Users2Icon /> },
];

export interface Admission {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  phoneNumber: string;
  course: string;
  program: string;
  admissionNo: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  requirements: Requirement[];
}

export interface Event {
  id: string; // Unique identifier for the event
  colorId: string; // Color identifier (corresponding to your color list)
  summary: string; // Summary or description of the event
  location: string | null;
  start: {
    dateTime: string | null; // Start date and time in ISO 8601 format
  };
  end: {
    dateTime: string | null; // End date and time in ISO 8601 format
  };
}

export const departments = [
  {
    name: "College Of Computer Studies",
    shortname: "CCS",
    programs: [
      {
        name: "Bachelor of Science in Information Technology",
        shortname: "BSIT",
      },
    ],
  },
  {
    name: "College of Criminology",
    shortname: "CC",
    programs: [
      {
        name: "Bachelor of Science in Criminology",
        shortname: "BSCrim",
      },
    ],
  },
  {
    name: "College of Business Administration",
    shortname: "CBA",
    programs: [
      {
        name: "Bachelor of Science in Business Administration",
        shortname: "BSBA",
      },
    ],
  },
  {
    name: "Basic Education Department",
    shortname: "BED",
    programs: [
      {
        name: "Elementary Education",
        shortname: "ElemEd",
      },
      {
        name: "Secondary Education",
        shortname: "SecEd",
      },
    ],
  },
  {
    name: "College of Engineering",
    shortname: "COE",
    programs: [
      {
        name: "Bachelor of Science in Civil Engineering",
        shortname: "BSCE",
      },
      {
        name: "Bachelor of Science in Electrical Engineering",
        shortname: "BSEE",
      },
    ],
  },
];
