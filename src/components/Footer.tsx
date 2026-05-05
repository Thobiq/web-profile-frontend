import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white mt-auto">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-t border-gray-100">
        <div className="flex-1">
          <Link href="/" className="font-bold text-3xl text-primary italic tracking-tighter">
            <Image
              src="/logo-color.png"
              alt="Logo Thobiq"
              width={200}
              height={200}
              className="object-contain"
            />
          </Link>
        </div>
        
        <div className="flex flex-col gap-3 font-medium text-text-dark text-sm">
          <a href="https://linkedin.comhttps://www.linkedin.com/in/mukhamad-alyasyi-thobiq" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
            <div className="bg-text-dark text-white p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">in</div> Linkedin
          </a>
          <a href="mailto:malyasythobiq@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
            <div className="bg-text-dark text-white p-1 rounded-full"><Mail size={16} /></div> malyasythobiq@gmail.com
          </a>
          <a href="https://github.com/Thobiq" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
            <div className="bg-text-dark text-white p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">GH</div> Github
          </a>
          <a href="https://instagram.com/m.alyasyi_tbq" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
            <div className="bg-text-dark text-white p-1 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">IG</div> Instagram
          </a>
        </div>
      </div>
      <div className="w-full border-t-4 border-primary py-4 text-center text-sm font-semibold text-text-dark">
        made with ❤️ by Thobiq for you
      </div>
    </footer>
  );
}
