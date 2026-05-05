import Image from "next/image";
import { fetchAPI } from "@/lib/api";

export const metadata = {
  title: "About - Thobiq",
  description: "Let me introduce myself.",
};

export default async function AboutPage() {
  const profileRes = await fetchAPI('/profile').catch(() => ({ data: null }));
  const profile = profileRes.data || {
    currentStatus: "Server Administrator Internship at mascitra.com",
    aboutMe: "Mahasiswa Teknologi Informasi Universitas Jember yang adaptif dan berdedikasi tinggi, dengan keahlian komprehensif di bidang Infrastruktur TI dan Jaringan Komputer",
    passion: "Membangun ekosistem digital dengan presisi teknis. Spesialis dalam infrastruktur cloud berperforma tinggi dan antarmuka pengguna yang elegan.",
    vision: "Membangun ekosistem digital dengan presisi teknis. Spesialis dalam infrastruktur cloud berperforma tinggi dan antarmuka pengguna yang elegan."
  };

  return (
    <div className="py-12 md:py-20 pb-24">
      {/* Header Section */}
      <div className="mb-16">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">ABOUT</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight">
          Let me <span className="text-primary italic">Introduce</span>
          <br />
          my Self
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12 bg-bg-light p-8 md:p-12 rounded-3xl relative overflow-hidden">
        
        {/* Left Column - Image & Status */}
        <div className="flex-1 relative flex flex-col items-center">
          {/* Decorative circle */}
          <div className="absolute top-10 left-0 w-12 h-12 bg-blue-300 rounded-full opacity-60"></div>
          
          {/* Blue semi-circle background */}
          <div className="w-full max-w-[320px] aspect-square bg-blue-300 rounded-t-[160px] relative mt-16 overflow-visible flex justify-center">
            <Image
              src="/profile.png"
              alt="Thobiq Profile"
              width={350}
              height={450}
              className="absolute bottom-0 object-cover z-10"
              priority
            />
          </div>

          {/* Current Status Box */}
          <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-[340px] z-20 -mt-6 border border-gray-100 relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Current Status</p>
            </div>
            <p className="text-sm font-bold text-text-dark">{profile.currentStatus}</p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col gap-8">
          
          {/* About Me */}
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-3">About Me</h2>
            <p className="text-text-gray leading-relaxed text-sm">
              {profile.aboutMe}
            </p>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>

          {/* My Passion */}
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-3">My Passion</h2>
            <p className="text-text-gray leading-relaxed text-sm">
              {profile.passion}
            </p>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* My Vision */}
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-3">My Vision</h2>
            <p className="text-text-gray leading-relaxed text-sm">
              {profile.vision}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
