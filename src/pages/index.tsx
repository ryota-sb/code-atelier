import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Blog } from "types/blog";
import { client } from "libs/client";

import Image from "next/image";
import Link from "next/link";

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
  console.log(blogs);
  return (
    <div className="container mx-auto w-full max-w-7xl px-10">
      <h1 className="px-10 py-10 font-raleway text-4xl lg:text-5xl">
        Ryota Code .
      </h1>
      <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 lg:grid-cols-2">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className="cursor-pointer rounded-lg px-6 shadow-md hover:scale-110 hover:duration-300">
              <Image
                src={blog.image.url}
                alt={blog.title}
                width={500}
                height={250}
                objectFit="contain"
              />
              <h3 className="truncate text-center font-notoserif text-2xl">
                {blog.title}
              </h3>
              <p className="flex justify-end py-4">
                {getFormattedDate(blog.createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
