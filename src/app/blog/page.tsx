import Image from "next/image";
import Link from "next/link";
import { Search, Heart } from "lucide-react";
import { fetchAPI, getStrapiMedia } from "@/lib/api";
import BlogSlider from "@/components/BlogSlider";

export const metadata = {
  title: "Blog - Thobiq",
  description: "My place to share everything I learn.",
};

export default async function BlogPage() {
  const categoriesRes = await fetchAPI('/categories').catch(() => ({ data: [] }));
  const categories = categoriesRes.data?.map((cat: any) => cat.name) || [
    "#Server", "#Networking", "#UI/UX", "#Design", "#IoT", 
    "#Frontend", "#Backend", "#Artificial Intelligence", 
    "#Data Science", "#Machine Learning"
  ];

  const blogsRes = await fetchAPI('/blogs', { 'populate': '*', 'sort[0]': 'createdAt:desc' }).catch(() => ({ data: [] }));
  const blogs = blogsRes.data || [];
  
  const featuredBlogs = blogs.slice(0, 3); // Get top 3 latest blogs

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="py-12 md:py-16">
        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">ARTICLE</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight mb-12">
          my Place to <span className="text-primary italic">Share</span>
          <br />
          Everythings what i Learn
        </h1>

        {/* Featured Banner Slider */}
        <BlogSlider featuredBlogs={featuredBlogs} />

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari Artikel"
              className="w-full border-2 border-gray-200 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors">
            Cari
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button className="bg-primary text-white px-6 py-2 rounded-full font-bold">Terbaru</button>
          <button className="bg-white text-primary border-2 border-primary px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">Terpopuler</button>
        </div>
      </div>

      {/* Main Content Area (Background Light) */}
      <div className="bg-bg-light -mx-4 md:-mx-8 px-4 md:px-8 py-16 flex-grow rounded-t-3xl border-t border-gray-100 mb-[-1px] pb-32">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar - Categories */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-28">
              <h3 className="font-bold text-text-dark mb-4">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat: string) => (
                  <span
                    key={cat}
                    className="bg-bg-light text-primary text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Area - Blog Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.map((blog: any) => (
              <div key={blog.documentId || blog.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-50">
                  <Image
                    src={getStrapiMedia(blog.image) || "/blog.png"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-2 pb-2 flex-grow flex flex-col">
                  <h3 className="font-bold text-text-dark text-lg mb-2 line-clamp-2">{blog.title}</h3>
                  <div className="flex items-center gap-1 bg-red-50 text-red-500 text-xs font-bold w-max px-2 py-1 rounded-full mb-4">
                    <Heart size={12} fill="currentColor" /> {blog.likes || 0} Suka
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-auto block w-full py-2.5 bg-primary text-white text-center font-bold rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Baca
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
