import Image from "next/image";
import Link from "next/link";
import { fetchAPI, getStrapiMedia } from "@/lib/api";

export const metadata = {
  title: "Projects - Thobiq",
  description: "My project experiences on IT.",
};

export default async function ProjectsPage() {
  const categories = ["All", "Website", "Server", "IoT", "Networking"];
  const activeCategory = "All"; // Still mock for server-component, filtering can be client-side later

  const projectsRes = await fetchAPI('/projects', { 'populate': '*' });
  const projects = (projectsRes && projectsRes.data) || [];

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="py-12 md:py-16">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">PROJECT GALLERY</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight mb-8">
          my <span className="text-primary italic">Project</span>
          <br />
          Experiences on IT
        </h1>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors border-2 border-primary ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Section with Light Background extending to bottom */}
      <div className="bg-bg-light -mx-4 md:-mx-8 px-4 md:px-8 py-16 flex-grow rounded-t-3xl border-t border-gray-100 mb-[-1px] pb-32">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <div key={project.documentId || project.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full">
              <p className="text-xs font-semibold text-text-gray mb-2 uppercase">{project.category}</p>
              <h3 className="text-xl font-bold text-text-dark mb-4">{project.title}</h3>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gray-50 flex-grow">
                <Image
                  src={getStrapiMedia(project.image) || "/temp_image.png"}
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
      </div>
    </div>
  );
}
