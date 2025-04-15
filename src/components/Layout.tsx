
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SimpleToast } from "./SimpleToast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SimpleToast />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
