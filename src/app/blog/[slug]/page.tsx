import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Heart } from "lucide-react";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export const metadata = {
  title: "Blog Detail - Thobiq",
  description: "Read my latest blog post.",
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch blog data based on slug
  const blogRes = await fetchAPI('/blogs', {
    'filters[slug][$eq]': slug,
    'populate': '*'
  });
  
  const blog = (blogRes && blogRes.data)?.[0] || {
    title: "Blog Not Found",
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    likes: 0,
    image: null,
    categories: [],
    content: []
  };

  const categories = blog.categories?.map((c: any) => c.name) || [];
  const dateStr = new Date(blog.publishedAt || blog.createdAt || new Date()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="py-12 md:py-16 pb-24 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary font-bold hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Artikel
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat: string) => (
            <span key={cat} className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-text-gray font-medium">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {dateStr}
          </div>
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-full">
            <Heart size={14} fill="currentColor" />
            {blog.likes || 0} Suka
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-100 bg-gray-50">
        <Image
          src={getStrapiMedia(blog.image) || "/temp_image.png"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <article className="prose prose-lg text-justify max-w-none text-text-gray leading-relaxed prose-headings:text-text-dark prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        {blog.content && blog.content.length > 0 ? (
          <BlocksRenderer content={blog.content} />
        ) : (
          <p>Belum ada konten untuk artikel ini.</p>
        )}
      </article>
      
    </div>
  );
}
