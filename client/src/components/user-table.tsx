"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

const UserTable = ({ usersData }: { usersData: UserData }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const paginate = (type: "next" | "prev") => {
    if (!usersData) return;
    const currentPage = usersData.page;
    const totalPages = usersData.totalPages;
    switch (type) {
      case "next":
        currentPage < totalPages && router.push(`?page=${currentPage + 1}`);
        break;
      case "prev":
        currentPage > 1 && router.push(`?page=${currentPage - 1}`);
        break;
    }
  };

  const navigate = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const filteredUsers = useMemo(() => {
    if (!usersData?.users) return [];
    return usersData.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [usersData, query]);

  return (
    <div>
      <div className="p-1">
        <Input
          className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table className="border-t border-primary/50">
        <TableHeader>
          <TableRow className="border-primary/50">
            <TableHead className="font-semibold w-[100px]">ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold text-right">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow
                className="cursor-pointer border-primary/50 text-sky-900"
                key={user.id}
                onClick={() => navigate(user.id)}
              >
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">{user.address}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={5}
                className="h-80 text-center text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {usersData && (
        <Pagination className="border-t border-primary/50 p-2">
          <PaginationContent>
            <PaginationItem onClick={() => paginate("prev")}>
              <PaginationPrevious
                className={cn(
                  usersData.page !== 1
                    ? ""
                    : "text-muted-foreground pointer-events-none"
                )}
              />
            </PaginationItem>
            {Array.from({ length: usersData.totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="border-primary/50 text-sky-900"
                  onClick={() => router.push(`?page=${index + 1}`)}
                  isActive={index + 1 === usersData.page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem onClick={() => paginate("next")}>
              <PaginationNext
                className={cn(
                  usersData.page < usersData.totalPages
                    ? ""
                    : "text-muted-foreground pointer-events-none"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default UserTable;
