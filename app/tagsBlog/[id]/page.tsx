import { getAllTagIds, filterBlogsByTag } from "libs/client";

import Main from "components/Main";

const TagPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { blogs, tags } = await filterBlogsByTag(id);

  return (
    <>
      <Main blogs={blogs} tags={tags} />
    </>
  );
};

export const generateStaticParams = async () => {
  return getAllTagIds();
};

export default TagPage;
