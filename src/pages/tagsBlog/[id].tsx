import {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import { Blog, Tag } from "types/blog";

import { client } from "libs/client";

import Layout from "components/Layout";
import Main from "components/Main";

const TagPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  tags,
}: Props) => {
  return (
    <Layout>
      <Main blogs={blogs} tags={tags} />
    </Layout>
  );
};

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  const id = params?.id;
  const tag = await client.get({ endpoint: "tag" });
  const blog = await client.get({
    endpoint: "blog",
    queries: { filters: `tags[contains]${id}` },
  });
  return {
    props: { blogs: blog.contents, tags: tag.contents },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "tag" });
  const paths = data.contents.map((content: Tag) => `/tagsBlog/${content.id}`);
  console.log(paths);
  return { paths, fallback: false };
};

export default TagPage;
