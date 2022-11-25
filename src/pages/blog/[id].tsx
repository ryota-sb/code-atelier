import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import { client } from "libs/client";

import type { Blog } from "types/blog";

import Layout from "components/Layout";

// ブログ記事のコード部分にシンタックスハイライトをつけるためのモジュール
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  const id = params?.id;
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
  highlightedBody: string;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
  highlightedBody,
}: Props) => {
  return (
    <Layout>
      <h1 className="p-10 text-center font-notoserif text-3xl">{blog.title}</h1>
      <div className="container prose mx-auto h-full max-w-screen-lg border bg-white p-10 shadow-md">
        <p>{getFormattedDate(blog.publishedAt)}</p>
        <div dangerouslySetInnerHTML={{ __html: highlightedBody }}></div>
      </div>
    </Layout>
  );
};

export default BlogId;
