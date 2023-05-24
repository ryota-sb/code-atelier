import BlurImage from "components/BlurImage";
import SideMenu from "components/SideMenu";

import type { Blog, Tag } from "types/blog";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";

// 日付のフォーマット変更
const getFormattedDate = (date: Date): string =>
  new Date(date).toLocaleDateString();

type Props = { blogs: Blog[]; tags: Tag[] };

// 今日の日付 - 記事投稿日
function getDateDifference(date: Date) {
  const getToday = new Date().getTime();
  const createAt = new Date(date).getTime();
  return getToday - createAt;
}

// 記事投稿から３日以内ならtrue
function isWithinThreeDays(date: Date) {
  const CONVERT_3_DAYS_TO_MILLISECONDS = 259200000;
  return getDateDifference(date) <= CONVERT_3_DAYS_TO_MILLISECONDS;
}

export default function Post({ blogs, tags }: Props) {
  return (
    <div className="grid flex-grow p-6 lg:p-8 xl:grid-cols-6 xl:p-10">
      {/* 記事一覧 */}
      <div className="min-h-screen bg-cream-four lg:col-span-5">
        <div className="m-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative">
              {/* new state */}
              <div className="absolute top-4 -left-4 z-10 w-28 bg-cream-four">
                <div className="text-center font-raleway">
                  {isWithinThreeDays(blog.publishedAt) ? <p>New</p> : null}
                </div>
              </div>
              <BlurImage blog={blog} />

              <div className="mt-2 flex items-center">
                <FontAwesomeIcon icon={faTag} className="text-gray-three" />
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
