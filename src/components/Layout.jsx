import Navbar from "./navbar";
import Footer from "./footer";
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
       <WhatsAppButton />
    </div>
  );
}

