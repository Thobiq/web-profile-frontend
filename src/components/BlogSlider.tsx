"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/api";

export default function BlogSlider({ featuredBlogs }: { featuredBlogs: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredBlogs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredBlogs.length);
    }, 2500); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredBlogs.length]);

  if (!featuredBlogs || featuredBlogs.length === 0) return null;

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-md bg-gray-900 group">
      {featuredBlogs.map((blog, index) => (
        <div
          key={blog.documentId || blog.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={getStrapiMedia(blog.image) || "/blog.png"}
            alt={blog.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-lg transform translate-y-0 transition-transform duration-700">
              {blog.title}
            </h2>
            <Link
              href={`/blog/${blog.slug}`}
              className="bg-primary text-white w-max px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg"
            >
              Selengkapnya
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Indicators */}
      {featuredBlogs.length > 1 && (
        <div className="absolute bottom-6 left-8 md:left-12 flex gap-2 z-20">
          {featuredBlogs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
