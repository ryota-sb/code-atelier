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
    <div className="container mx-auto w-full">
      <h1 className="px-10 font-raleway text-5xl">Ryota Code .</h1>
      <div className="container grid w-full grid-cols-3 items-center gap-10 px-10">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className="cursor-pointer rounded-lg px-6 shadow-md hover:scale-110 hover:duration-300">
              <Image
                src={blog.image.url}
                alt={blog.title}
                width={350}
                height={150}
                objectFit="contain"
              />
              <h3 className="truncate text-center">{blog.title}</h3>
              <p className="flex justify-end">
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
