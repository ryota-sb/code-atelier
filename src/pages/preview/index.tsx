import type { NextPage } from "next";
import { client } from "libs/client";

export const getServerSideProps = async (context: any) => {
  const data = await client.get({
    endpoint: "blog",
    contentId: context.query.id,
    queries: { draftKey: context.query.draftKey },
  });

  return {
    props: {
      data,
    },
  };
};

const PreviewPage: NextPage = ({ data }: any) => {
  return <div>{data}</div>;
};

export default PreviewPage;
