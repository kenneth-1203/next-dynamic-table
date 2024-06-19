import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/lib/data";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUser(Number(params.id));
  return {
    title: `${user?.id} - ${user?.name}`,
    description: `This is ${user?.name}'s profile details.`,
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default async function Page({ params }: Props) {
  const user = await getUser(Number(params.id));

  if (!user) return notFound();

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center gap-4">
      <Avatar className="w-52 h-52 m-4 rounded-3xl">
        <AvatarFallback className="font-semibold text-6xl rounded-3xl bg-primary/10 text-sky-900">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="grid grid-cols-5 border-b border-primary/50 last:border-0">
          <p className="col-span-1 border-r border-primary/50 last:border-0 p-2">ID:</p>
          <p className="col-span-4 p-2">{user.id}</p>
        </div>
        <div className="grid grid-cols-5 border-b border-primary/50 last:border-0">
          <p className="col-span-1 border-r border-primary/50 last:border-0 p-2">Name:</p>
          <p className="col-span-4 p-2">{user.name}</p>
        </div>
        <div className="grid grid-cols-5 border-b border-primary/50 last:border-0">
          <p className="col-span-1 border-r border-primary/50 last:border-0 p-2">Email:</p>
          <p className="col-span-4 p-2">{user.email}</p>
        </div>
        <div className="grid grid-cols-5 border-b border-primary/50 last:border-0">
          <p className="col-span-1 border-r border-primary/50 last:border-0 p-2">Phone:</p>
          <p className="col-span-4 p-2">{user.phone}</p>
        </div>
        <div className="grid grid-cols-5 border-b border-primary/50 last:border-0">
          <p className="col-span-1 border-r border-primary/50 last:border-0 p-2">Address:</p>
          <p className="col-span-4 p-2">{user.address}</p>
        </div>
      </div>
    </main>
  );
}
