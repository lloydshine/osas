import { SideBar } from "@/components/admin/SideBar";
import { Topbar } from "@/components/admin/TopBar";
import SessionProvider from "@/components/SessionProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <main className="h-screen flex">
        <Topbar />
        <SideBar />
        <ScrollArea className="bg-secondary flex-1 max-h-screen min-h-screen pt-24 px-5 pb-5">
          {children}
        </ScrollArea>
      </main>
    </SessionProvider>
  );
}
