import { NextPage, InferGetStaticPropsType, GetStaticProps } from "next";
import { Blog } from "types/blog";
import { client } from "libs/client";

import Link from "next/link";
import Image from "next/image";

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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Ryota Code .
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {blogs.map((blog) => (
            <div className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <Image
                  src={blog.image.url}
                  alt="Front of men&#039;s Basic Tee in black."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {blog.title}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {getFormattedDate(blog.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
