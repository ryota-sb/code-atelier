import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import { client } from "libs/client";

import type { Blog } from "types/blog";

import HeadMeta from "components/HeadMeta";
import Layout from "components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

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
      <HeadMeta
        title={blog.title}
        description={blog.description}
        url={`https://code-atelier.vercel.app/blog/${blog.id}`}
        type="article"
        imageUrl={blog.image.url}
      />
      <div className="flex-grow">
        <h1 className="p-10 text-center font-notoserif text-3xl">
          {blog.title}
        </h1>
        <div className="prose mx-auto mb-10 min-h-screen max-w-screen-lg bg-white p-10 shadow-md">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} />
              <p className="m-0">{getFormattedDate(blog.publishedAt)}</p>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faRotate} />
              <p className="m-0">{getFormattedDate(blog.updatedAt)}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: highlightedBody }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogId;
