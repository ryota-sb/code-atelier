import { createClient } from "microcms-js-sdk";

import type { Blog, Tag } from "types/blog";

// 記事のコードエリアのシンタックスハイライト
import * as cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.API_KEY || "",
});

// 記事一覧取得
export const getBlogs = async () => {
  try {
    const blog = await client.getList<Blog>({ endpoint: "blogs" });
    return blog.contents
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// タグ一覧取得
export const getTags = async () => {
  try {
    const tag = await client.getList<Tag>({ endpoint: "tags" });
    return tag.contents;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// 記事ごとの全てのパスを配列で取得
export const getAllBlogIds = async () => {
  const blogs = await getBlogs();
  return blogs.map((blog: Blog) => ({ BlogId: blog.id }));
};

// タグごとの全てのパスを配列で取得
export const getAllTagIds = async () => {
  const tags = await getTags();
  return tags.map((tag: Tag) => ({ TagId: tag.id }));
};

export const getBlog = async (blogId: string) => {
  const blog = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: blogId,
  });

  const $ = cheerio.load(blog.body || "");
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return { blog, highlightedBody: $.html() };
};

export const getPreviewBlog = async (blogId: string, draftKey: string) => {
  const blog = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: blogId,
    queries: { draftKey }
  });

  const $ = cheerio.load(blog.body || "");
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return { blog, highlightedBody: $.html() };
}

// TagIdで絞り込んだ記事取得
export const filterBlogsByTag = async (tagId: string) => {
  const filterBlog = await client.getList<Blog>({
    endpoint: "blogs",
    queries: { filters: `tags[contains]${tagId}` },
  });
  const tags = await getTags();

  return {
    blogs: filterBlog.contents,
    tags: tags
  };
};
