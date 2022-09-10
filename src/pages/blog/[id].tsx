import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { client } from "libs/client";
import type { Blog } from "types/blog";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

// 動的パスの設定
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const id = ctx.params?.id;
  const blog = await client.get({ endpoint: "blog", contentId: id });

  const $ = cheerio.load(blog.body || "");
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog,
      highlightedBody: $.html(),
    },
  };
};

// 日付のフォーマット変更
const getFormattedDate = (date: Date): string =>
  new Date(date).toLocaleDateString();

type Props = {
  blog: Blog;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  return (
    <div className="h-screen w-screen bg-gray-100 py-10 px-10">
      <div className="container prose mx-auto h-full max-w-screen-lg rounded border bg-white p-10 shadow-md">
        <h1 className="font-notoserif">{blog.title}</h1>
        <p>{getFormattedDate(blog.publishedAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
      </div>
    </div>
  );
};

export default BlogId;
