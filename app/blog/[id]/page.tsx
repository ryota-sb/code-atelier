import { getAllBlogIds, getBlog } from "libs/client";

import HeadMeta from "components/HeadMeta";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

export const generateStaticParams = async () => {
  return getAllBlogIds();
};

// 日付のフォーマット変更
const getFormattedDate = (date: Date): string =>
  new Date(date).toLocaleDateString();

interface Props {
  params: { id: string };
}

const BlogId = async ({ params }: Props) => {
  const { id } = params;
  const { blog, highlightedBody } = await getBlog(id);
  return (
    <>
      <HeadMeta
        title={blog.title}
        description={blog.description}
        url={`https://code-atelier.vercel.app/blog/${blog.id}`}
        type="article"
        imageUrl={blog.image.url}
      />
      <div className="flex-grow">
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

export default BlogId;
