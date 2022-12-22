import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { Blog, Tag } from "types/blog";

// microCMSのクライアント取得
import { client } from "libs/client";

import Layout from "components/Layout";
import Main from "components/Main";

type Props = {
  blogs: Blog[];
  tags: Tag[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const tag = await client.get({ endpoint: "tag" });
  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  tags,
}: Props) => {
  return (
    <Layout>
      <Head>
        <title>Code Atelier</title>
        <meta
          name="discription"
          content="Code Atelier では、プログラミング関係の記事をメインに載せています。"
        />
      </Head>
      <Main blogs={blogs} tags={tags} />
    </Layout>
  );
};

export default Home;
