import BlurImage from "./BlurImage";
import SideMenu from "./SideMenu";

import type { Blog, Tag } from "types/blog";

import { getFormattedDate, isWithinThreeDays } from "utils/date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

type Props = { blogs: Blog[]; tags: Tag[] };

export default function Main({ blogs, tags }: Props) {
  return (
    <div className="grid flex-grow p-6 lg:p-8 xl:grid-cols-6 xl:p-10">
      {/* 記事一覧 */}
      <div className="min-h-screen bg-cream-four lg:col-span-5">
        <div className="m-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative">
              {/* new state */}
              <div className="absolute -left-4 top-4 z-10 w-28 bg-cream-four">
                <div className="text-center font-raleway">
                  {isWithinThreeDays(blog.publishedAt) ? <p>New</p> : null}
                </div>
              </div>
              <BlurImage blog={blog} />

              <div className="mt-2 flex items-center">
                {/* <FontAwesomeIcon icon={faTag} className="text-gray-three" /> */}
                {blog.tags.map((tag) => (
                  <div className="flex pl-2" key={tag.id}>
                    <p className="font-raleway text-sm text-gray-three">
                      #{tag.tag}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-8 mt-4 flex items-center justify-between">
                <h3 className="truncate font-notoserif text-xl text-gray-three">
                  {blog.title}
                </h3>
                <div className="mt-1 flex items-center gap-1 font-notoserif text-sm font-medium text-gray-three">
                  <FontAwesomeIcon icon={faClock} />
                  <p>{getFormattedDate(blog.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SideMenu tags={tags} />
    </div>
  );
}
