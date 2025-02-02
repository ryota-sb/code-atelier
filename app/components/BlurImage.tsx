'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import type { Blog } from "types/blog";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function BlurImage({ blog }: { blog: Blog }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="group cursor-pointer">
        <div className="border-gray-200 bg-gray-200 aspect-w-16 aspect-h-9 w-full overflow-hidden border">
          <Image
            src={blog.image.url}
            alt={blog.title}
            style={{ objectFit: "cover" }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "duration-700 ease-in-out group-hover:opacity-40",
              isLoading
                ? "scale-100 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            priority={true}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </Link>
  );
}
