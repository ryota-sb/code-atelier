import { getPreviewBlog } from "libs/client";

import { getFormattedDate } from "utils/date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

interface Props {
  params: { id: string };
  searchParams: { draftKey: string };
}

const PreviewPage = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const { draftKey } = searchParams;
  const { blog, highlightedBody } = await getPreviewBlog(id, draftKey);
  return (
    <>
      <div className="flex-grow">
        <div className="flex items-center justify-center">
          <div className="m-4 flex w-32 justify-center rounded-lg bg-green-five p-2">
            <h3 className="text-cream-four">Preview mode</h3>
          </div>
        </div>
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

export default PreviewPage;
