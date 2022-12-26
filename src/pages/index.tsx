import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import HeadMeta from "components/HeadMeta";

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
      <HeadMeta
        title="Code Atelier"
        description="Code Atelierでは、プログラミング関係の記事をメインに載せています。"
        url="https://code-atelier.vercel.app"
        type="website"
        imageUrl="/imgs/code-atelier.png"
      />
      <Main blogs={blogs} tags={tags} />
    </Layout>
  );
};

export default Home;
