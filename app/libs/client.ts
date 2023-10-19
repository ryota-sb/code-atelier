import { createClient } from "microcms-js-sdk";

import type { Blog, Tag } from "types/blog";

// 記事のコードエリアのシンタックスハイライト
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
});

// Blog記事 すべて取得
export const getBlogs = async () => {
  const blogData = await client.get({
    endpoint: "blog",
  });
  return blogData.contents as Blog[];
};

// Tag すべて取得
export const getTags = async () => {
  const tagData = await client.get({
    endpoint: "tag",
  });
  return tagData.contents as Tag[];
};

// Blogのパスを配列で取得
export const getAllBlogIds = async () => {
  const blogs = await getBlogs();
  const paths = blogs.map((blog: Blog) => {
    id: `/blog/${blog.id}`;
  });
  return paths;
};

// Tagのパスを配列で取得
export const getAllTagIds = async () => {
  const tags = await getTags();
  const paths = tags.map((tag: Tag) => {
    id: `/tagsBlog/${tag.id}`;
  });
  return paths;
};

export const getBlog = async (blogId: string) => {
  const blogData = await client.get({
    endpoint: "blog",
    contentId: blogId,
  });

  const $ = cheerio.load(blogData.body || "");
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    blog: blogData,
    highlightedBody: $.html(),
  };
};

// TagIdで絞り込んだBlog記事取得
export const filterBlogsByTag = async (tagId: string) => {
  const filterBlogData = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]${tagId}` },
  });
  const tags = await getTags();
  return {
    blogs: filterBlogData.contents as Blog[],
    tags: tags,
  };
};
