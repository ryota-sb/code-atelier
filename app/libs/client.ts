import { createClient } from "microcms-js-sdk";

import type { Blog, Tag } from "types/blog";

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
