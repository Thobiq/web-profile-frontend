"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-primary flex items-center gap-1 italic" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="tracking-tighter">
            <Image
              src="/logo-color.png"
              alt="Logo Thobiq"
              width={100}
              height={100}
              className="object-contain"
            />
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-text-dark"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-text-dark hover:text-primary transition-colors focus:outline-none relative z-[60] cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} className="pointer-events-none" /> : <Menu size={28} className="pointer-events-none" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg flex flex-col px-4 py-6 gap-6 font-semibold text-lg text-center animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors py-2 hover:text-primary ${
                  isActive ? "text-primary" : "text-text-dark"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
