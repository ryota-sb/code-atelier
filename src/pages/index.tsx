import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Blog } from "types/blog";

// microCMSのクライアント取得
import { client } from "libs/client";

import Footer from "components/Footer";
import Header from "components/Header";

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
    <div className="flex h-screen flex-col bg-blue-100">
      <Header />
      <div className="grid flex-grow grid-cols-6 p-14">
        {/* 記事一覧 */}
        <div className="col-span-5 bg-white">
          <div className="m-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlurImage key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        <div className="col-span-1 ml-14">
          {/* About Me */}
          <div className="mb-14 bg-white p-4">
            <div className="grid grid-cols-6">
              <div className="aspect-w-1 aspect-h-1 col-span-3">
                <Image
                  src="/imgs/ryota.jpg"
                  layout="fill"
                  objectFit="contain"
                  className=""
                />
              </div>
              <div className="col-span-3">
                <h1>Matsui Ryota</h1>
              </div>
            </div>
          </div>

          {/* タグ一覧 */}
          <div className="bg-white">Tags Field</div>
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
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden border border-gray-200 bg-gray-200">
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
        <p className="mt-1 font-notoserif text-sm font-medium text-gray-900">
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
