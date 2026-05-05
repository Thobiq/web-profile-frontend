import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchAPI, getStrapiMedia } from "@/lib/api";

export const metadata = {
  title: "Project Detail - Thobiq",
  description: "Detail of my project.",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch project data based on slug
  const projectRes = await fetchAPI('/projects', {
    'filters[slug][$eq]': slug,
    'populate': '*'
  }).catch(() => ({ data: [] }));
  
  const project = projectRes.data?.[0] || {
    title: "Project Not Found",
    category: "UNKNOWN",
    description: "The requested project could not be found.",
    image: null,
    link: "#",
    techStack: [],
  };

  return (
    <div className="py-12 md:py-16 pb-24 h-full flex flex-col">
      {/* Back Button */}
      <div className="mb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Header Section */}
      <div className="mb-12">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{project.category}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight">
          my <span className="text-primary italic">Project</span>
          <br />
          {project.title}
        </h1>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Column - Preview */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-6">Preview Project</h2>
          <div className="bg-bg-light p-6 md:p-8 rounded-3xl border border-gray-100 flex flex-col items-center">
            <div className="w-full relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm mb-8 border border-white">
              <Image
                src={getStrapiMedia(project.image) || "/temp_image.png"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-primary text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors shadow-md"
              >
                Lihat Website <ArrowRight size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Description & Tech Stack */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Deskripsi Project</h2>
            <p className="text-text-dark text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Tech Stack */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {(project.techStack || []).map((tech: string) => (
                <span
                  key={tech}
                  className="bg-bg-light text-primary font-bold px-4 py-2 rounded-full text-sm border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
