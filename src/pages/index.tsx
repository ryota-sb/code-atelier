import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Blog } from "types/blog";

// microCMSのクライアント取得
import { client } from "libs/client";

import Footer from "components/Footer";

type Props = {
  blogs: Blog[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blog = await client.get({ endpoint: "blog" });
  return {
    props: {
      blogs: blog.contents,
    },
  };
};

// 日付のフォーマット変更
const getFormattedDate = (date: Date): string =>
  new Date(date).toLocaleDateString();

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
}: Props) => {
  return (
    <div className="min-h-screen bg-blue-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:max-w-7xl lg:px-8">
        <h1 className="px-10 py-16 font-raleway text-4xl lg:text-5xl">
          Ryota Code .
        </h1>
        <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2">
          {blogs.map((blog) => (
            <BlurImage key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const BlurImage = ({ blog }: { blog: Blog }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="group cursor-pointer">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded bg-gray-200">
          <Image
            src={blog.image.url}
            alt=""
            layout="fill"
            objectFit="cover"
            className={cn(
              "duration-700 ease-in-out group-hover:opacity-40",
              isLoading
                ? "scale-100 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <h3 className="mt-4 font-notoserif text-2xl text-gray-900">
          {blog.title}
        </h3>
        <p className="mt-1 font-notoserif text-lg font-medium text-gray-900">
          {getFormattedDate(blog.createdAt)}
        </p>
      </div>
    </Link>
  );
};

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default Home;
