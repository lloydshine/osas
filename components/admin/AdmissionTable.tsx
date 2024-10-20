"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { StatusBadge } from "../StatusBadge";
import { Trash2Icon } from "lucide-react";

// Dummy data for status filter (assuming an enum or predefined statuses)
const statuses = ["Pending", "Approved", "Declined"];

export function AdmissionTable({ data }: { data: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter data based on search term and selected status
  const filteredData = data
    .filter((admission) => {
      const fullName = `${admission.firstName} ${admission.middleName || ""} ${
        admission.lastName
      }`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((admission) => {
      return filterStatus ? admission.status === filterStatus : true;
    });

  // Calculate pagination data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Search and Filter Inputs */}
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-1/2"
        />
        <Select onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-1/4">
            <span>{filterStatus || "Filter by status"}</span>
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((admission) => (
              <TableRow key={admission.id}>
                <TableCell className="font-medium">
                  {admission.firstName} {admission.middleName}{" "}
                  {admission.lastName}
                </TableCell>
                <TableCell>
                  <StatusBadge status={admission.status} />
                </TableCell>
                <TableCell>
                  {new Date(admission.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex items-center gap-4">
                  <Button>View</Button>
                  <Button size="icon" variant="destructive">
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No admissions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
