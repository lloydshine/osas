import Link from "next/link";

export function Topnav() {
  return (
    <nav className="sticky top-0 flex px-6 py-4 items-center text-white bg-red-950 justify-between z-50">
      <Link href="/" className="flex items-center gap-4 flex-1">
        <img src="/logo.png" alt="logo" className="w-10 animate-spin" />
        <h1 className="font-bold">OIMS</h1>
      </Link>
      <div className="md:flex items-center gap-12 flex-1 justify-center hidden">
        <Link href={"/admission"}>Admission</Link>
        <Link href={"/events"}>Events</Link>
        <Link href={"/career"}>Career</Link>
        <Link href={"/equipments"}>Equipments</Link>
        <Link href={"/certificates"}>Certificates</Link>
      </div>
      <div className="flex-1 flex justify-end">
        <button className="px-6 py-2 rounded-md bg-white text-red-950">
          <Link href="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
}
