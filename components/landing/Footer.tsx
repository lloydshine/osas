import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-red-950 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 mb-2 mx-auto md:mx-0"
            />
            <p className="text-lg font-semibold text-center md:text-left">
              OSAS
            </p>
            <p className="text-gray-400 text-center md:text-left">
              Your one-stop solution for student management.
            </p>
          </div>
          <div className="flex w-full md:w-max items-center flex-col md:flex-row md:gap-8 text-center md:text-left">
            <Link href="/about" className="hover:underline mb-2 md:mb-0">
              About Us
            </Link>
            <Link href="/services" className="hover:underline mb-2 md:mb-0">
              Services
            </Link>
            <Link href="/contact" className="hover:underline mb-2 md:mb-0">
              Contact
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} OSAS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
