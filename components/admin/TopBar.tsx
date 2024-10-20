import { Button } from "../ui/button";
import { FileIcon, MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SideNav } from "./SideBar";
import Notifications from "./Notifications";

export async function Topbar() {
  const session = await auth();

  return (
    <nav className="z-50 bg-white fixed w-full top-0 left-0 px-5 py-5 border-b-2 flex items-center gap-4 justify-between">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" height={40} width={40} alt="Logo" />
          <h1 className="font-black text-primary">OIMS</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="md:flex items-center gap-1 hidden">
          <Button variant="link" className="space-x-1">
            <MessageCircleQuestion />
            <p>Support</p>
          </Button>
          <Button variant="link" className="space-x-1">
            <FileIcon />
            <p>Documentation</p>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Notifications />
          <Avatar>
            <AvatarImage src={session?.user.image || ""} />
            <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="hidden md:block text-sm font-bold">
            {session?.user.name}
          </p>
          <SideNav />
        </div>
      </div>
    </nav>
  );
}
