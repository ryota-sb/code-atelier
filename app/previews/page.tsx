import type {
  GetServerSideProps,
  NextPage,
  GetServerSidePropsContext,
} from "next";
import { client } from "libs/client";

import { useEffect } from "react";

import type { Blog } from "types/blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const blog = await client.get({
    endpoint: "blog",
    contentId: context.query.id as string,
    // contentId: "c9e_wm5l0",
    queries: { draftKey: context.query.draftKey as string },
  });

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

const PreviewPage: NextPage<Props> = ({ blog, highlightedBody }: Props) => {
  useEffect(() => {
    console.log(blog);
  });

  return (
    <>
      <div className="flex-grow">
        <div className="flex items-center justify-center">
          <div className="m-4 flex w-32 justify-center rounded-lg bg-green-five p-2">
            <h3 className="text-cream-four">Preview mode</h3>
          </div>
        </div>
        <h1 className="p-10 text-center font-notoserif text-3xl text-gray-three">
          {blog.title}
        </h1>
        <div className="prose mx-auto mb-10 min-h-screen max-w-screen-lg bg-cream-four p-10 shadow-md">
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
    </>
  );
};

export default PreviewPage;
