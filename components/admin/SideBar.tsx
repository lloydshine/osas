import { auth } from "@/lib/auth";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { MenuIcon, ChevronLeftCircle } from "lucide-react";
import { Button } from "../ui/button";
import { NavLinks } from "./NavLinks";
import { guidanceLinks, osasLinks } from "@/lib/globals";
import { LogoutButton } from "../LogoutButton";

export async function SideBar() {
  const session = await auth();

  return (
    <ScrollArea className="md:flex flex-col w-[300px] border-r-2 max-h-screen pt-24 hidden">
      <div className="p-2 border-2 mx-2 mb-2 rounded-md text-center bg-primary text-primary-foreground">
        <h1 className="font-bold">{session?.user.office}</h1>
      </div>
      <div className="flex flex-col">
        {session?.user.office == "OSAS" ? (
          <NavLinks links={osasLinks} />
        ) : (
          <NavLinks links={guidanceLinks} />
        )}
      </div>
      <LogoutButton />
    </ScrollArea>
  );
}

export async function SideNav() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-0">
        <SheetHeader className="flex-row p-5 items-center justify-between">
          <SheetTitle>OIMS</SheetTitle>
          <SheetClose asChild>
            <Button size="icon" variant="outline">
              <ChevronLeftCircle />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex flex-col w-full max-h-screen">
          <div className="flex flex-col">
            {session?.user.office == "OSAS" ? (
              <NavLinks links={osasLinks} />
            ) : (
              <NavLinks links={guidanceLinks} />
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
