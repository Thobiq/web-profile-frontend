import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Monitor, Server, Layers } from "lucide-react";

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const metadata = {
  title: "Contact - Thobiq",
  description: "Call me to collaborate.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 pb-24 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Contact</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight">
          Call me to <br />
          <span className="text-primary">collaborate</span>
        </h1>
      </div>

      {/* Main Card */}
      <div className="bg-[#f0f4f9] rounded-[2rem] p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-sm border border-white">
        
        {/* Left Column - Image & Floating Icons */}
        <div className="w-full md:w-5/12 relative flex justify-center mt-8 md:mt-0">
          
          {/* Main Photo */}
          <div className="relative w-full max-w-[280px] aspect-[3/4] z-10">
            <Image
              src="/profile.png"
              alt="Thobiq Profile"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Floating Icons Background */}
          {/* Top Left */}
          <div className="absolute top-[10%] left-[5%] bg-white p-2.5 rounded-xl shadow-md z-20 animate-bounce" style={{ animationDuration: '3s' }}>
            <Monitor size={24} className="text-blue-500" />
          </div>
          {/* Bottom Left */}
          <div className="absolute bottom-[20%] left-[0%] bg-black p-3 rounded-2xl shadow-lg z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <Server size={28} className="text-white" />
          </div>
          {/* Top Right */}
          <div className="absolute top-[30%] right-[5%] bg-white p-3 rounded-full shadow-md z-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
            <div className="font-bold text-xl text-orange-500">X</div>
          </div>
          {/* Bottom Right */}
          <div className="absolute bottom-[35%] right-[-5%] bg-white p-2 rounded-full shadow-md z-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1.5s' }}>
            <Layers size={20} className="text-pink-500" />
          </div>
          {/* Far Top Left */}
          <div className="absolute top-[-5%] left-[20%] bg-white p-1.5 rounded-full shadow-sm z-0">
            <div className="w-4 h-4 bg-blue-400 rounded-sm transform rotate-45"></div>
          </div>
        </div>

        {/* Right Column - Contact Buttons */}
        <div className="w-full md:w-7/12 flex flex-col gap-4 md:gap-5 z-10">
          <Link
            href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp asli
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary text-white py-4 px-6 rounded-full flex items-center justify-center gap-3 font-bold text-lg md:text-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <MessageCircle size={24} />
            Whatsapp
          </Link>
          
          <Link
            href="mailto:email@example.com" // Ganti dengan email asli
            className="w-full bg-primary text-white py-4 px-6 rounded-full flex items-center justify-center gap-3 font-bold text-lg md:text-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <Mail size={24} />
            Email
          </Link>

          <Link
            href="https://linkedin.com/in/username" // Ganti dengan LinkedIn asli
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary text-white py-4 px-6 rounded-full flex items-center justify-center gap-3 font-bold text-lg md:text-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <LinkedinIcon size={24} />
            LinkedIn
          </Link>
        </div>

      </div>
    </div>
  );
}
