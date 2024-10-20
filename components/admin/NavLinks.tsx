"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ links }: { links: any[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, i) => {
        const isActive = pathname == link.href;
        return (
          <Link
            href={link.href}
            className={`p-4 hover:bg-secondary transition-all flex gap-4 cursor-pointer ${
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary text-foreground/60"
            }`}
            key={i}
          >
            {link.icon}
            {link.tag}
          </Link>
        );
      })}
    </>
  );
}
