import HeadMeta from "components/HeadMeta";
import Main from "components/Main";

import { getBlogs, getTags } from "libs/client";

const Home = async () => {
  const blogs = await getBlogs();
  const tags = await getTags();

  return (
   <>
      <HeadMeta
        title="Code Atelier"
        description="Code Atelierでは、プログラミング関係の記事をメインに載せています。"
        url="https://code-atelier.vercel.app"
        type="website"
        imageUrl="https://code-atelier.vercel.app/imgs/code-atelier.png"
      />
      <Main blogs={blogs} tags={tags} />
    </>
  );
};

export default Home;
