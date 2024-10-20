import Footer from "@/components/landing/Footer";
import { Topnav } from "@/components/landing/TopNav";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Topnav />
      {children}
      <Footer />
    </main>
  );
}
