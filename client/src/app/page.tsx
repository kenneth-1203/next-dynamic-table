import UserTable from "@/components/user-table";
import { getUsers } from "@/lib/data";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const usersData = await getUsers(Number(searchParams.page));
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
      {usersData && <UserTable usersData={usersData} />}
    </main>
  );
}
