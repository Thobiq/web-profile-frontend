import Image from "next/image";
import Link from "next/link";
import { Code2, Monitor, Server, Cpu, Cloud, Brain, Palette, Network } from "lucide-react";
import { fetchAPI, getStrapiMedia } from "@/lib/api";

// Helper to map category to icon
const getIconForCategory = (category: string) => {
  switch (category) {
    case "Frontend":
    case "Development": return <Monitor size={20} className="text-primary" />;
    case "Backend": return <Server size={20} className="text-primary" />;
    case "Networking": return <Network size={20} className="text-primary" />;
    case "Infrastructure": return <Server size={20} className="text-primary" />;
    case "Hardware": return <Cpu size={20} className="text-primary" />;
    case "Design": return <Palette size={20} className="text-primary" />;
    case "Cloud": return <Cloud size={20} className="text-primary" />;
    case "AI": return <Brain size={20} className="text-primary" />;
    default: return <Code2 size={20} className="text-primary" />;
  }
};

export default async function Home() {
  // Fetch data concurrently
  const [profileRes, projectsRes, skillsRes] = await Promise.all([
    fetchAPI('/profile').catch(err => { console.error('Profile fetch error:', err); return { data: null }; }),
    fetchAPI('/projects', { 'pagination[limit]': '2', 'sort[0]': 'createdAt:desc', 'populate': '*' }).catch(err => { console.error('Projects fetch error:', err); return { data: [] }; }),
    fetchAPI('/skills', { 'sort[0]': 'createdAt:asc' }).catch(err => { console.error('Skills fetch error:', err); return { data: [] }; })
  ]);

  const profile = profileRes.data || {
    intro: "an IT Infrastructure Enthusiast",
    aboutMe: "Membangun ekosistem digital dengan presisi teknis. Spesialis dalam infrastruktur cloud berperforma tinggi dan antarmuka pengguna yang elegan.",
  };
  
  const projects = projectsRes.data || [];
  const skills = skillsRes.data || [];

  return (
    <div className="flex flex-col pb-20">
      {/* Hero Section */}
      <section className="py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 order-2 md:order-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight tracking-tight">
            Halo, I'm Thobiq
            <span className="block text-2xl md:text-3xl font-medium text-primary italic mt-2">
              {profile.intro}
            </span>
          </h1>
          <p className="text-text-gray text-lg max-w-lg leading-relaxed">
            {profile.aboutMe}
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/projects"
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
            >
              Lihat Project
            </Link>
            <Link
              href="/contact"
              className="bg-gray-100 text-text-dark px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center order-1 md:order-2 relative">
          <div className="w-full max-w-[400px] aspect-square relative">
            <Image
              src="/profile.png"
              alt="Thobiq"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Decorative floating elements can be added here with absolute positioning */}
        </div>
      </section>

      {/* Marquee Section */}
      <section className="w-full bg-primary py-4 -mx-4 md:-mx-8 px-4 md:px-8 mb-20 overflow-hidden relative">
        <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite]">
          {/* Repeat content for smooth infinite scroll */}
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex gap-8 text-white font-semibold text-lg md:text-xl px-4">
              <span>Frontend</span>
              <span>•</span>
              <span>Backend</span>
              <span>•</span>
              <span>IoT Engineer</span>
              <span>•</span>
              <span>UI/UX Designer</span>
              <span>•</span>
              <span>Server Administrator</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Portofolio</p>
            <h2 className="text-3xl font-extrabold text-text-dark">Latest Project</h2>
          </div>
          <Link
            href="/projects"
            className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors"
          >
            Lihat Semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <div key={project.documentId || project.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
              <p className="text-xs font-semibold text-text-gray mb-2 uppercase">{project.category}</p>
              <h3 className="text-xl font-bold text-text-dark mb-4">{project.title}</h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gray-50 flex-grow">
                <Image
                  src={getStrapiMedia(project.image) || "/project1.png"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="block w-full py-3 text-center border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Lihat Project
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Stack Section */}
      <section>
        <div className="mb-10">
          <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Keahlian</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark max-w-md leading-tight">
            Technical <span className="text-primary italic">Stack</span> & Core Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill: any, idx: number) => (
            <div key={skill.documentId || idx} className="bg-bg-light rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                {getIconForCategory(skill.category)}
                <h3 className="font-bold text-text-dark text-lg">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(skill.items || []).map((item: string, i: number) => (
                  <span
                    key={i}
                    className="bg-white px-3 py-1.5 rounded-md text-sm font-medium text-text-gray shadow-sm border border-gray-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
