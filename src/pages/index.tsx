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
      <h1 className="text-5xl px-10 font-raleway">Ryota Code .</h1>
      <div className="container grid grid-cols-3 gap-10 items-center w-full px-10">
        {blogs.map((blog) => (
          <div className="shadow-md rounded-lg px-6" key={blog.id}>
            <Image
              src={blog.image.url}
              alt={blog.title}
              width={350}
              height={150}
              objectFit="contain"
            />
            <h3 className="text-center truncate">{blog.title}</h3>
            <p className="flex justify-end">
              {getFormattedDate(blog.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
